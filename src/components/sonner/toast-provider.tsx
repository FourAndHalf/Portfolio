"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
    return (
        <Toaster
            position="top-center"
            expand={false}
            richColors={true}
            closeButton={true}
            toastOptions={{
                style: {
                    background: "var(--background)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--background)"
                },
                className: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                descriptionClassName: "group-[.toaster]:text-muted-foreground",
                actionButtonStyle: {
                    background: "var(--primary)",
                    color: "var(--primary-foreground)",
                },
                cancelButtonStyle: {
                    background: "var(--muted)",
                    color: "var(--muted-foreground)",
                },
            }}
        />
    );
}
