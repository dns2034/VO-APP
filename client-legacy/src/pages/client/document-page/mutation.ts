import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadDocument } from "../../shared/services/document-service";

export function useDocumentMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: uploadDocument,
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['documents'] }),
    })
}