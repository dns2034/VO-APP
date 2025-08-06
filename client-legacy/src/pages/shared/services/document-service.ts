import supabase from "@/config/supabase-client";


export async function uploadDocument({
    path,
    file
}: {
    path: string;
    file: File
}) {
    const { data, error } = await supabase.storage
        .from("documents")
        .upload(`${path}/${file.name}`, file)
    
    if (error) {
        throw error;
    }

    console.log('why? ', data)

    return data;
}

export async function getDocuments(folder: string, page: number, pageSize: number) {
    const { data, error } = await supabase.storage
        .from("documents")
        .list(folder, {
            limit: pageSize,
            offset: (page - 1) * pageSize,
            sortBy: {
                column: 'created_at',
                order: 'desc'
            }
        });
    
    if (error) {
        throw error;
    }

    return data;
}

export async function deleteDocument(path: string) {
    const { data, error } = await supabase.storage
        .from("documents")
        .remove([path]);
    
    if (error) {
        throw error;
    }

    return data;
}