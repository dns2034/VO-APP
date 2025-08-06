import { Building2 } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import * as z from "zod";

const organizationSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  description: z.string().min(1, "Description is required"),
  owner: z.string().min(1, "Company owner is required"),
});

export type OrganizationFormValues = z.infer<typeof organizationSchema>;

interface OrganizationFormPlaceholders {
  owner?: string;
  name?: string;
  description?: string;
}

interface EditOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: OrganizationFormValues) => Promise<void> | void;
  organization?: OrganizationFormValues | null;
  placeholders?: OrganizationFormPlaceholders;
}

export const EditOrganizationDialog = ({
  open,
  onOpenChange,
  onSubmit,
  organization,
  placeholders = {
    owner: "Enter company owner name",
    name: "Enter organization name",
    description: "Enter organization description"
  }
}: EditOrganizationDialogProps) => {
  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      description: "",
      owner: "",
    },
  });

  useEffect(() => {
    if (organization) {
      form.reset({
        name: organization.name,
        description: organization.description,
        owner: organization.owner,
      });
    }
  }, [organization, form]);

  const handleSubmit: SubmitHandler<OrganizationFormValues> = async (data) => {
    try {
      await onSubmit(data);
      toast.success("Organization updated successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update organization");
      console.error("Error updating organization:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-800">
            <Building2 className="text-purple-700" />
            Edit Organization
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Update the details of this organization.
          </p>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="owner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Owner</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholders.owner} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholders.name} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={placeholders.description}
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={form.formState.isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};