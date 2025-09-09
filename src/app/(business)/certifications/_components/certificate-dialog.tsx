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

const documentFields: FieldConfig[] = [
    {
        name: "title",
        label: "Document Title",
        type: "text",
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
    {
        name: "expirableOrNot",
        label: "Document Expires",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "expiryDate",
        label: "Expiry Date",
        type: "date",
        placeholder: "Select expiry date",
    },
    {
        name: "daysToExpiry",
        label: "Days to Expiry",
        type: "number",
        placeholder: "Enter days to expiry",
        validation: (value) => {
            const num = Number(value);
            if (isNaN(num) || num < 0) {
                return "Days to expiry must be a positive number";
            }
            return undefined;
        },
    },
    {
        name: "documentFile",
        label: "Upload Document",
        type: "file",
    },
];

export function DocumentDialog({
    trigger,
    document,
    onSubmit,
    isLoading = false
}: DocumentDialogProps) {
    const isEditing = !!document;

    const handleSubmit = async (data: Partial<CardData>) => {
        const documentData: Partial<CardData> = {
            title: data.title,
            authorizingBody: data.authorizingBody,
            expirableOrNot: data.expirableOrNot || false,
            expiryDate: data.expiryDate ? new Date(data.expiryDate) : new Date(),
            daysToExpiry: Number(data.daysToExpiry) || 0,
        };

        // Add ID if editing
        if (isEditing && document) {
            documentData.id = document.id;
        }

        await onSubmit(documentData);
    };

    const defaultValues = document ? {
        title: document.title,
        authorizingBody: document.authorizingBody,
        expirableOrNot: document.expirableOrNot,
        expiryDate: document.expiryDate.toISOString().split('T')[0],
        daysToExpiry: document.daysToExpiry,
    } : {};

    return (
        <DialogForm
            trigger={trigger || (
                <Button variant="outline" size="sm">
                    {isEditing ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    <span className="hidden lg:inline">
                        {isEditing ? "Edit Document" : "Add Document"}
                    </span>
                </Button>
            )}
            title={isEditing ? "Edit Document" : "Add New Document"}
            description={isEditing
                ? "Update the document information below."
                : "Fill in the details to add a new document."
            }
            fields={documentFields}
            onSubmit={handleSubmit}
            submitLabel={isEditing ? "Update Document" : "Add Document"}
            isLoading={isLoading}
            defaultValues={defaultValues}
        />
    );
}

// Quick add document dialog with minimal fields
export function QuickDocumentDialog({
    trigger,
    onSubmit,
    isLoading = false
}: Omit<DocumentDialogProps, "document">) {
    const quickFields: FieldConfig[] = [
        {
            name: "title",
            label: "Document Title",
            type: "text",
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

    const handleSubmit = async (data: Partial<CardData>) => {
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
            title="Quick Add Document"
            description="Add a new document with basic information."
            fields={quickFields}
            onSubmit={handleSubmit}
            submitLabel="Add Document"
            isLoading={isLoading}
        />
    );
}

