import toast from "@/components/sonner/toast";

// Specialized document upload toasts
export const documentToast = {
    uploadStart: (filename: string) => {
        return toast.loading("Uploading document", {
            description: `Uploading ${filename}...`,
        });
    },

    uploadSuccess: (filename: string) => {
        return toast.success("Document uploaded successfully", {
            description: `${filename} has been uploaded and saved.`,
            duration: 5000,
        });
    },

    uploadError: (filename: string, error?: string) => {
        return toast.error("Upload failed", {
            description: `Failed to upload ${filename}. ${error || "Please try again."}`,
            duration: 6000,
        });
    },

    saveStart: (documentTitle: string) => {
        return toast.loading("Saving document", {
            description: `Saving ${documentTitle}...`,
        });
    },

    saveSuccess: (documentTitle: string) => {
        return toast.success("Document saved", {
            description: `${documentTitle} has been saved successfully.`,
            duration: 4000,
        });
    },

    saveError: (documentTitle: string, error?: string) => {
        return toast.error("Save failed", {
            description: `Failed to save ${documentTitle}. ${error || "Please try again."}`,
            duration: 6000,
        });
    },

    deleteSuccess: (documentTitle: string) => {
        return toast.success("Document deleted", {
            description: `${documentTitle} has been deleted successfully.`,
            duration: 4000,
        });
    },

    deleteError: (documentTitle: string) => {
        return toast.error("Delete failed", {
            description: `Failed to delete ${documentTitle}. Please try again.`,
            duration: 5000,
        });
    },
};

export const validationToast = {
    invalidFileType: (allowedTypes: string[]) => {
        return toast.error("Invalid file type", {
            description: `Please upload a file with one of these types: ${allowedTypes.join(", ")}`,
            duration: 5000,
        });
    },

    fileTooLarge: (maxSize: string) => {
        return toast.error("File too large", {
            description: `File size must be less than ${maxSize}`,
            duration: 5000,
        });
    },

    requiredField: (fieldName: string) => {
        return toast.warning("Required field missing", {
            description: `Please fill in the ${fieldName} field.`,
            duration: 4000,
        });
    },
};