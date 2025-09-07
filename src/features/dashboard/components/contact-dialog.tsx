"use client";

import * as React from "react";
import { DialogForm, FieldConfig } from "@/components/dialog/dialog-view";
import { CardData } from "@/app/(business)/certifications/_components/schema";
import { Button } from "@/components/ui/button";
import { Plus, Edit, FileText } from "lucide-react";

export interface DocumentDialogProps {
    trigger?: React.ReactNode;
    document?: CardData;
    onSubmit: (data: Partial<CardData>) => void | Promise<void>;
    isLoading?: boolean;
}


export function ContactDialog({
    trigger,
    onSubmit,
    isLoading = false
}: Omit<DocumentDialogProps, "document">) {
    const contactFields: FieldConfig[] = [
        {
            name: "linkedin",
            label: "LinkedIn",
            type: "icon",
            placeholder: "Enter document title",
            required: true,
        },
        {
            name: "authorizingBody",
            label: "Authorizing Body",
            type: "text",
            placeholder: "Enter authorizing body",
            required: true,
        },
    ];

    const handleSubmit = async (data: Record<string, any>) => {
        const documentData: Partial<CardData> = {
            title: data.title,
            authorizingBody: data.authorizingBody,
            expirableOrNot: false,
            expiryDate: new Date(),
            daysToExpiry: 365,
        };

        await onSubmit(documentData);
    };

    return (
        <DialogForm
            trigger={trigger || (
                <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4" />
                    <span className="hidden lg:inline">Quick Add</span>
                </Button>
            )}
            title="Let's Collaborate"
            description="Connect with me on any of these platforms."
            fields={contactFields}
            onSubmit={handleSubmit}
            submitLabel="Add Document"
            isLoading={isLoading}
        />
    );
}
