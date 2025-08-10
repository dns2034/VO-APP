import { useMutation } from "@tanstack/react-query";
import { Loader, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import supabase from "@/config/supabase-client";
import { cn } from "@/lib/utils";

type TUploadedImage = { file: File; preview: string };

type TChangeAvatarDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const getAvatarUrl = (avatarPath: string) => {
  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(avatarPath);

  if (!data) throw new Error("Error fetching avatar URL");

  return data;
};

const uploadAvatar = async ({
  path,
  file,
  upsert = true,
}: {
  path: string;
  file: File;
  upsert?: boolean;
}) => {
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(path, file, {
      upsert,
    });

  if (error) throw new Error(error.message);

  return data;
};

const updateAvatar = async ({ avatarPath }: { avatarPath: string | null }) => {
  const { error } = await supabase.auth.updateUser({
    data: { avatar_url: avatarPath },
  });

  if (error) throw new Error(error.message);
};

export default function ChangeAvatarDialog({
  open,
  onOpenChange,
}: TChangeAvatarDialogProps) {
  const [uploadedImage, setUploadedImage] = useState<null | TUploadedImage>(
    null
  );

  const {
    mutateAsync: updateAvatarMutateAsync,
    isPending: updateAvatarIsPending,
  } = useMutation({
    mutationFn: updateAvatar,
  });

  const {
    mutateAsync: uploadAvatarMutateAsync,
    isPending: uploadAvatarIsPending,
  } = useMutation({
    mutationFn: uploadAvatar,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const uploadedImage: TUploadedImage = {
        file,
        preview: URL.createObjectURL(file),
      };
      setUploadedImage(uploadedImage);
    }
    return;
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: { "image/png": [], "image/jpeg": [], "image/jpg": [] },
      maxFiles: 1,
      maxSize: 3 * 1024 * 1024,
    });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onOpenChange(false);
      if (uploadedImage) setUploadedImage(null);
    }
  };

  const handleUpload = async () => {
    if (!uploadedImage) return;

    // same name for all avatar uploads to overwrite the existing one [just pass the id of the user]
    const avatarPath = `ID-HERE`;

    await uploadAvatarMutateAsync(
      { path: avatarPath, file: uploadedImage.file },
      {
        onSuccess: async (data) => {
          const { publicUrl } = getAvatarUrl(data.path);

          // Append timestamp to force refresh
          const freshUrl = `${publicUrl}?t=${Date.now()}`;

          await updateAvatarMutateAsync(
            {
              avatarPath: freshUrl,
            },
            {
              onSuccess: () => {
                // update the user globally...

                // close the dialog
                toast.success("Success", {
                  description: "Avatar uploaded successfully!",
                });
                handleOpenChange(false);
              },
              onError: (error) => {
                console.error("Error updating avatar:", error);
              },
            }
          );
        },
        onError: (error) => {
          console.error("Error updating avatar:", error);
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) =>
        !updateAvatarIsPending &&
        !uploadAvatarIsPending &&
        handleOpenChange(open)
      }
    >
      <DialogContent className="w-[90%] sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Avatar</DialogTitle>
          <DialogDescription>
            Drag and drop your file here or click to browse.
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex flex-col gap-2 overflow-hidden">
          {uploadedImage && (
            <div className="flex justify-between items-center border-gray-300 bg-gray-50 p-3 border-dashed rounded-lg border">
              <div className="flex gap-3 w-3/4">
                <img
                  src={uploadedImage.preview}
                  alt="Uploaded Preview"
                  className="size-14 object-cover rounded-md"
                />
                <div className="flex flex-col justify-center w-1/2">
                  <h3 className="truncate">{uploadedImage.file.name}</h3>
                  <small>
                    {(uploadedImage.file.size / 1024 / 1024).toFixed(2)} MB
                  </small>
                </div>
              </div>

              <Button
                onClick={() => setUploadedImage(null)}
                className="h-fit p-1"
                variant={"outline"}
              >
                <X />
              </Button>
            </div>
          )}
          <div
            {...getRootProps()}
            className={cn(
              "flex items-center justify-center flex-col gap-3 w-full h-full border border-violet-300 py-8 border-dashed rounded-md cursor-pointer transition-all hover:bg-violet-50",
              isDragActive && "bg-violet-100"
            )}
          >
            <input {...getInputProps()} />
            <div className="size-14 border rounded-full border-violet-300 border-dotted flex items-center justify-center border-spacing-96">
              <Upload className="size-8 text-violet-500" />
            </div>

            <p className="mt-3 mb-0 text-gray-700 text-center hidden md:block">
              <span className="">Drag & drop your avatar here or</span> {""}
              <span className="text-primary font-bold">Browse</span>
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            {fileRejections.length === 0 ? (
              <div className="w-full flex flex-col gap-1 items-center md:flex-row md:justify-between">
                <small className="text-gray-800">
                  Supported formats: PNG, JPEG, JPG
                </small>
                <small className="text-gray-800">Maximum size: 3 MB</small>
              </div>
            ) : (
              <small className="text-red-500">
                {fileRejections[0].errors[0].message}
              </small>
            )}
          </div>
        </div>

        <DialogFooter className="flex items-center justify-end">
          <Button
            disabled={
              !uploadedImage || updateAvatarIsPending || uploadAvatarIsPending
            }
            onClick={handleUpload}
            className="bg-primary hover:bg-violet-700 w-full"
          >
            {updateAvatarIsPending || uploadAvatarIsPending ? (
              <>
                <Loader className="animate-spin size-4" />
                <span>Uploading</span>
              </>
            ) : (
              <span>Upload</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
