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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export type FieldType =
    | "text"
    | "email"
    | "password"
    | "number"
    | "textarea"
    | "select"
    | "checkbox"
    | "date"
    | "file"
    | "icon";

export interface FieldConfig {
    name: string;
    label: string;
    type: FieldType;
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[]; // For select fields
    validation?: (value: any) => string | undefined;
    defaultValue?: any;
}

export interface DialogFormProps {
    trigger?: React.ReactNode;
    title: string;
    description?: string;
    fields: FieldConfig[];
    onSubmit: (data: Record<string, any>) => void | Promise<void>;
    submitLabel?: string;
    cancelLabel?: string;
    isLoading?: boolean;
    defaultValues?: Record<string, any>;
}

export function DialogForm({
    trigger,
    title,
    description,
    fields,
    onSubmit,
    submitLabel = "Save",
    cancelLabel = "Cancel",
    isLoading = false,
    defaultValues = {},
}: DialogFormProps) {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState<Record<string, any>>(() => {
        const initial: Record<string, any> = {};
        fields.forEach(field => {
            initial[field.name] = field.defaultValue ?? defaultValues[field.name] ?? "";
        });
        return initial;
    });
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate fields
        const newErrors: Record<string, string> = {};
        fields.forEach(field => {
            const value = formData[field.name];

            if (field.required && (!value || value === "")) {
                newErrors[field.name] = `${field.label} is required`;
                return;
            }

            if (field.validation && value) {
                const error = field.validation(value);
                if (error) {
                    newErrors[field.name] = error;
                }
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        await onSubmit(formData);
        setOpen(false);
    };

    const handleFieldChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const renderField = (field: FieldConfig) => {
        const value = formData[field.name] || "";
        const error = errors[field.name];

        switch (field.type) {
            case "text":
            case "email":
            case "password":
            case "number":
                return (
                    <div key={field.name} className="space-y-2">
                        <Label htmlFor={field.name}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Input
                            id={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={value}
                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            className={cn(error && "border-destructive")}
                        />
                        {error && <p className="text-sm text-destructive">{error}</p>}
                    </div>
                );

            case "textarea":
                return (
                    <div key={field.name} className="space-y-2">
                        <Label htmlFor={field.name}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Textarea
                            id={field.name}
                            placeholder={field.placeholder}
                            value={value}
                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            className={cn(error && "border-destructive")}
                        />
                        {error && <p className="text-sm text-destructive">{error}</p>}
                    </div>
                );

            case "select":
                return (
                    <div key={field.name} className="space-y-2">
                        <Label htmlFor={field.name}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Select value={value} onValueChange={(val) => handleFieldChange(field.name, val)}>
                            <SelectTrigger className={cn(error && "border-destructive")}>
                                <SelectValue placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`} />
                            </SelectTrigger>
                            <SelectContent>
                                {field.options?.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {error && <p className="text-sm text-destructive">{error}</p>}
                    </div>
                );

            case "checkbox":
                return (
                    <div key={field.name} className="flex items-center space-x-2">
                        <Checkbox
                            id={field.name}
                            checked={value}
                            onCheckedChange={(checked) => handleFieldChange(field.name, checked)}
                        />
                        <Label htmlFor={field.name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {field.label}
                        </Label>
                    </div>
                );

            case "date":
                return (
                    <div key={field.name} className="space-y-2">
                        <Label htmlFor={field.name}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !value && "text-muted-foreground",
                                        error && "border-destructive"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {value ? format(new Date(value), "PPP") : <span>{field.placeholder || "Pick a date"}</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={value ? new Date(value) : undefined}
                                    onSelect={(date) => handleFieldChange(field.name, date?.toISOString())}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {error && <p className="text-sm text-destructive">{error}</p>}
                    </div>
                );

            case "file":
                return (
                    <div key={field.name} className="space-y-2">
                        <Label htmlFor={field.name}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <Input
                            id={field.name}
                            type="file"
                            onChange={(e) => handleFieldChange(field.name, e.target.files?.[0])}
                            className={cn(error && "border-destructive")}
                        />
                        {error && <p className="text-sm text-destructive">{error}</p>}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" size="sm">
                        <Plus />
                        <span className="hidden lg:inline">Add Item</span>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        {description && <DialogDescription>{description}</DialogDescription>}
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {fields.map(renderField)}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            {cancelLabel}
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : submitLabel}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

// Predefined form configurations for common use cases
export const documentFormFields: FieldConfig[] = [
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
        name: "documentFile",
        label: "Upload Document",
        type: "file",
    },
];

export const userFormFields: FieldConfig[] = [
    {
        name: "name",
        label: "Full Name",
        type: "text",
        placeholder: "Enter full name",
        required: true,
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter email address",
        required: true,
        validation: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value) ? undefined : "Please enter a valid email";
        },
    },
    {
        name: "role",
        label: "Role",
        type: "select",
        required: true,
        options: [
            { value: "admin", label: "Administrator" },
            { value: "user", label: "User" },
            { value: "viewer", label: "Viewer" },
        ],
    },
    {
        name: "active",
        label: "Active User",
        type: "checkbox",
        defaultValue: true,
    },
];
