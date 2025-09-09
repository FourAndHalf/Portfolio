"use client";

import { useCallback } from "react";
import { toast, ToastOptions } from "@/components/sonner/toast";
import { documentToast, validationToast } from '../_components/certificate-toast';

export function useToast() {
    const showToast = useCallback((type: "success" | "error" | "warning" | "info" | "loading", message: string, options?: ToastOptions) => {
        return toast[type](message, options);
    }, []);

    const showDocumentToast = useCallback(
        <T extends keyof typeof documentToast>(
            action: T,
            ...args: Parameters<(typeof documentToast)[T]>) => {
            const fn = documentToast[action] as (...fnArgs: any[]) => unknown;
            return fn(...args);
        }, []);

    const showValidationToast = useCallback(
        <T extends keyof typeof validationToast>(
            action: T,
            ...args: Parameters<(typeof validationToast)[T]>) => {
            const fn = validationToast[action] as (...fnArgs: any[]) => unknown;
            return fn(...args);
        }, []);

    return {
        toast: showToast,
        documentToast: showDocumentToast,
        validationToast: showValidationToast,
        dismiss: toast.dismiss,
    };
}

export function useDocumentToast() {
    const handleUpload = useCallback(async (
        file: File,
        onUpload: (file: File) => Promise<void>
    ) => {
        const toastId = documentToast.uploadStart(file.name);

        try {
            await onUpload(file);
            toast.dismiss(toastId);
            documentToast.uploadSuccess(file.name);
        } catch (error) {
            toast.dismiss(toastId);
            documentToast.uploadError(file.name, error instanceof Error ? error.message : undefined);
            throw error;
        }
    }, []);

    const handleSave = useCallback(async (
        documentTitle: string,
        onSave: () => Promise<void>
    ) => {
        const toastId = documentToast.saveStart(documentTitle);

        try {
            await onSave();
            toast.dismiss(toastId);
            documentToast.saveSuccess(documentTitle);
        } catch (error) {
            toast.dismiss(toastId);
            documentToast.saveError(documentTitle, error instanceof Error ? error.message : undefined);
            throw error;
        }
    }, []);

    const handleDelete = useCallback(async (
        documentTitle: string,
        onDelete: () => Promise<void>
    ) => {
        try {
            await onDelete();
            documentToast.deleteSuccess(documentTitle);
        } catch (error) {
            documentToast.deleteError(documentTitle);
            throw error;
        }
    }, []);

    return {
        handleUpload,
        handleSave,
        handleDelete,
    };
}
