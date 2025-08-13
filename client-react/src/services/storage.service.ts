import supabaseClient from "@/lib/supabase-client";

export const storageService = {
  uploadFile: async (file: File, bucket: string, path: string) => {
    const { data, error } = await supabaseClient.storage
      .from(bucket)
      .upload(path, file, { upsert: true });
    return { data, error };
  },

  getFileUrl: (bucketName: string, filePath: string) => {
    return supabaseClient.storage.from(bucketName).getPublicUrl(filePath).data
      .publicUrl;
  },
};
