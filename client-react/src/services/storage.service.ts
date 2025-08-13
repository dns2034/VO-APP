import supabaseClient from "@/lib/supabase-client";

export const storageService = {
  uploadFile: async (file: File) => {
    const { data, error } = await supabaseClient.storage
      .from("uploads")
      .upload(`public/${file.name}`, file);
    return { data, error };
  },

  getFileUrl: (bucketName: string, filePath: string) => {
    return supabaseClient.storage.from(bucketName).getPublicUrl(filePath).data
      .publicUrl;
  },
};
