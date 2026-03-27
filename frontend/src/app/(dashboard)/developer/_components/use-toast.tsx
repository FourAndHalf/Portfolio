"use client";

import { useCallback } from "react";
import { toast } from "@/components/sonner/toast";
import { developerToast, validationToast } from '../_components/developer-toast';

export function useToast() {
    const showToast = useCallback((type: "success" | "error" | "warning" | "info" | "loading", message: string, options?: any) => {
        return toast[type](message, options);
    }, []);

    const showDeveloperToast = useCallback(
        <T extends keyof typeof developerToast>(
            action: T,
            ...args: Parameters<(typeof developerToast)[T]>) => {
            const fn = developerToast[action] as (...fnArgs: any[]) => unknown;
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
        developerToast: showDeveloperToast,
        validationToast: showValidationToast,
        dismiss: toast.dismiss,
    };
}

export function useDeveloperToast() {
    const featureComingSoon = useCallback(async () => {

        try {
            developerToast.featureComingSoon();
        } catch (error) {
            developerToast.operationError(error instanceof Error ? error.message : undefined);
            throw error;
        }
    }, []);

    return {
        featureComingSoon,
    };
}
