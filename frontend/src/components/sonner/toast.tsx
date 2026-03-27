"use client";

import { toast as sonnerToast } from "sonner";
import { CheckCircle, XCircle, AlertTriangle, Info, Upload, FileText, Loader2 } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info" | "loading";

export interface ToastOptions {
    title?: string;
    description?: string;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}

const ToastIcon = ({ type }: { type: ToastType }) => {
    const iconClass = "h-4 w-4";

    switch (type) {
        case "success":
            return <CheckCircle className={`${iconClass} text-green-500`} />;
        case "error":
            return <XCircle className={`${iconClass} text-red-500`} />;
        case "warning":
            return <AlertTriangle className={`${iconClass} text-yellow-500`} />;
        case "info":
            return <Info className={`${iconClass} text-blue-500`} />;
        case "loading":
            return <Loader2 className={`${iconClass} text-blue-500 animate-spin`} />;
        default:
            return null;
    }
};

export const toast = {
    success: (message: string, options?: ToastOptions) => {
        return sonnerToast.success(message, {
            description: options?.description,
            duration: options?.duration || 4000,
            action: options?.action,
            icon: <ToastIcon type="success" />,
            className: "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950",
        });
    },

    error: (message: string, options?: ToastOptions) => {
        return sonnerToast.error(message, {
            description: options?.description,
            duration: options?.duration || 5000,
            action: options?.action,
            icon: <ToastIcon type="error" />,
            className: "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950",
        });
    },

    warning: (message: string, options?: ToastOptions) => {
        return sonnerToast.warning(message, {
            description: options?.description,
            duration: options?.duration || 4000,
            action: options?.action,
            icon: <ToastIcon type="warning" />,
            className: "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950",
        });
    },

    info: (message: string, options?: ToastOptions) => {
        return sonnerToast.info(message, {
            description: options?.description,
            duration: options?.duration || 4000,
            action: options?.action,
            icon: <ToastIcon type="info" />,
            className: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950",
        });
    },

    loading: (message: string, options?: ToastOptions) => {
        return sonnerToast.loading(message, {
            description: options?.description,
            duration: options?.duration || 0, // Loading toasts don't auto-dismiss
            action: options?.action,
            icon: <ToastIcon type="loading" />,
            className: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950",
        });
    },

    promise: <T,>(
        promise: Promise<T>,
        {
            loading,
            success,
            error,
        }: {
            loading: string;
            success: string | ((data: T) => string);
            error: string | ((error: any) => string);
        }
    ) => {
        return sonnerToast.promise(promise, {
            loading,
            success,
            error, 
            className: "border rounded-lg shadow-sm",
            icon: <Loader2 className="h-4 w-4 animate-spin text-blue-500" />,
        });
    },

    // Custom dismiss function
    dismiss: (toastId?: string | number) => {
        return sonnerToast.dismiss(toastId);
    },
};


export default toast;
