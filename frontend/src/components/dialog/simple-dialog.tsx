"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";

export interface SimpleDialogProps {
    trigger?: React.ReactNode;
    title: string;
    description?: string;
    children?: React.ReactNode;
    onConfirm?: () => void | Promise<void>;
    onCancel?: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "default" | "destructive" | "success" | "warning" | "info";
    isLoading?: boolean;
    showCancel?: boolean;
}

const variantConfig = {
    default: {
        icon: null,
        confirmVariant: "default" as const,
    },
    destructive: {
        icon: XCircle,
        confirmVariant: "destructive" as const,
    },
    success: {
        icon: CheckCircle,
        confirmVariant: "default" as const,
    },
    warning: {
        icon: AlertTriangle,
        confirmVariant: "default" as const,
    },
    info: {
        icon: Info,
        confirmVariant: "default" as const,
    },
};

export function SimpleDialog({
    trigger,
    title,
    description,
    children,
    onConfirm,
    onCancel,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    variant = "default",
    isLoading = false,
    showCancel = true,
}: SimpleDialogProps) {
    const [open, setOpen] = React.useState(false);
    const config = variantConfig[variant];
    const Icon = config.icon;

    const handleConfirm = async () => {
        if (onConfirm) {
            await onConfirm();
        }
        setOpen(false);
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
                        <DialogTitle>{title}</DialogTitle>
                    </div>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>

                {children && <div className="py-4">{children}</div>}

                <DialogFooter>
                    {showCancel && (
                        <Button type="button" variant="outline" onClick={handleCancel}>
                            {cancelLabel}
                        </Button>
                    )}
                    {onConfirm && (
                        <Button
                            type="button"
                            variant={config.confirmVariant}
                            onClick={handleConfirm}
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : confirmLabel}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// Confirmation dialog for destructive actions
export function ConfirmDialog({
    trigger,
    title = "Are you sure?",
    description = "This action cannot be undone.",
    onConfirm,
    confirmLabel = "Delete",
    ...props
}: Omit<SimpleDialogProps, "variant" | "showCancel">) {
    return (
        <SimpleDialog
            trigger={trigger}
            title={title}
            description={description}
            onConfirm={onConfirm}
            confirmLabel={confirmLabel}
            variant="destructive"
            showCancel={true}
            {...props}
        />
    );
}

// Success dialog
export function SuccessDialog({
    trigger,
    title = "Success!",
    description,
    onConfirm,
    confirmLabel = "OK",
    ...props
}: Omit<SimpleDialogProps, "variant" | "showCancel">) {
    return (
        <SimpleDialog
            trigger={trigger}
            title={title}
            description={description}
            onConfirm={onConfirm}
            confirmLabel={confirmLabel}
            variant="success"
            showCancel={false}
            {...props}
        />
    );
}

// Info dialog
export function InfoDialog({
    trigger,
    title,
    description,
    onConfirm,
    confirmLabel = "OK",
    ...props
}: Omit<SimpleDialogProps, "variant" | "showCancel">) {
    return (
        <SimpleDialog
            trigger={trigger}
            title={title}
            description={description}
            onConfirm={onConfirm}
            confirmLabel={confirmLabel}
            variant="info"
            showCancel={false}
            {...props}
        />
    );
}
