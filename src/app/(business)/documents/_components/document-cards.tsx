"use client";

import { TrendingUp, TrendingDown, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { CardData, cardColumns } from "./schema";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CardViewOptions } from "@/components/card-section/card-view-options";
import { CardView } from "@/components/card-section/card-view";
import { DocumentCardItem } from "@/components/card-section/card-item";
import { DocumentDialog, QuickDocumentDialog } from "@/app/(business)/documents/_components/document-dialog";
import { Button } from "@/components/ui/button";
import { useDocumentToast } from "@/components/sonner";
import { cardData } from "./data";

export function DocumentCard({ data: initialData = cardData }: { data?: CardData[] }) {
    const [data, setData] = React.useState(() => initialData);
    const [uploadedDocuments, setUploadedDocuments] = React.useState<Set<number>>(new Set());
    const { handleUpload, handleSave } = useDocumentToast();

    const handleDocumentUpload = async (id: number) => {
        const document = data.find(doc => doc.id === id);
        if (!document) return;

        // Simulate file upload
        const mockFile = new File([`Content for ${document.title}`], `${document.title}.pdf`, {
            type: 'application/pdf'
        });

        try {
            await handleUpload(mockFile, async (file) => {
                // Simulate upload delay
                await new Promise(resolve => setTimeout(resolve, 2000));
                console.log('Uploading file:', file.name);
            });

            // Mark as uploaded
            setUploadedDocuments(prev => new Set(prev).add(id));
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    const handleAddDocument = async (documentData: Partial<CardData>) => {
        const documentTitle = documentData.title || "New Document";

        try {
            await handleSave(documentTitle, async () => {
                // Generate new ID
                const newId = Math.max(...data.map(d => d.id), 0) + 1;
                const newDocument: CardData = {
                    id: newId,
                    title: documentData.title || "",
                    authorizingBody: documentData.authorizingBody || "",
                    expirableOrNot: documentData.expirableOrNot || false,
                    expiryDate: documentData.expiryDate || new Date(),
                    daysToExpiry: documentData.daysToExpiry || 0,
                };

                // Simulate save delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                setData(prev => [...prev, newDocument]);
            });
        } catch (error) {
            console.error('Save failed:', error);
        }
    };

    const handleEditDocument = async (documentData: Partial<CardData>) => {
        if (!documentData.id) return;

        const documentTitle = documentData.title || "Document";

        try {
            await handleSave(documentTitle, async () => {
                // Simulate save delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                setData(prev => prev.map(doc =>
                    doc.id === documentData.id
                        ? { ...doc, ...documentData }
                        : doc
                ));
            });
        } catch (error) {
            console.error('Save failed:', error);
        }
    };

    return (
        <Tabs defaultValue="blueprint" className="w-full flex-col justify-start gap-6">
            <div className="flex items-center justify-between">
                <Label htmlFor="view-selector" className="sr-only">
                    View
                </Label>
                <Select defaultValue="blueprint">
                    <SelectTrigger className="flex w-fit @4xl/main:hidden" size="sm" id="view-selector">
                        <SelectValue placeholder="Select a view" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="blueprint">Blueprint</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                        <SelectItem value="sanctions">Sanctions</SelectItem>
                        <SelectItem value="contracts">Contracts</SelectItem>
                    </SelectContent>
                </Select>
                <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
                    <TabsTrigger value="blueprint">
                        Blueprint
                    </TabsTrigger>
                    <TabsTrigger value="legal">
                        Legal
                    </TabsTrigger>
                    <TabsTrigger value="sanctions">
                        Sanctions <Badge variant="secondary">2</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="contracts">
                        Contracts
                    </TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                    <CardViewOptions data={data} columns={cardColumns} />
                    {/* <Button variant="outline" size="sm">
                        <Plus />
                        <span className="hidden lg:inline">Add Document</span>
                    </Button>  */}
                    <DocumentDialog onSubmit={handleAddDocument} />
                    <QuickDocumentDialog onSubmit={handleAddDocument} />
                </div>
            </div>
            <TabsContent value="blueprint" className="relative flex flex-col gap-4 overflow-auto">
                <CardView
                    data={data}
                    columns={cardColumns}
                    dndEnabled={true}
                    onReorder={setData}
                    getItemId={(item) => item.id}
                    renderCard={(item, index) => (
                        <DocumentCardItem
                            data={item}
                            index={index}
                            hasDocument={uploadedDocuments.has(item.id)}
                            onUpload={handleDocumentUpload}
                        />
                    )}
                />
            </TabsContent>
            <TabsContent value="legal" className="relative flex flex-col gap-4 overflow-auto">
                <CardView
                    data={data}
                    columns={cardColumns}
                    dndEnabled={true}
                    onReorder={setData}
                    renderCard={(item, index) => (
                        <DocumentCardItem
                            data={item}
                            index={index}
                            hasDocument={uploadedDocuments.has(item.id)}
                            onUpload={handleDocumentUpload}
                        />
                    )}
                />
            </TabsContent>
            <TabsContent value="sanctions" className="flex flex-col">
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
            <TabsContent value="contracts" className="flex flex-col">
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
        </Tabs>
    );
}