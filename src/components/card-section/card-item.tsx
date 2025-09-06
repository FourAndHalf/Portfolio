import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Trash2, TrendingUp, Upload } from "lucide-react";
import { CardData } from "@/app/(business)/documents/_components/schema";
import { toDateInputValue } from "@/lib/utils";

interface DocumentCardItemProps {
    data: CardData;
    index: number;
    hasDocument?: boolean;
    onUpload?: (id: number) => void;
}

export function DocumentCardItem({ data, index, hasDocument = false, onUpload }: DocumentCardItemProps) {
    const isExpiringSoon = data.daysToExpiry <= 30;
    const isExpired = data.daysToExpiry <= 0;

    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs">
            <Card className="@container/card">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold tabular-nums transition-all duration-300 peer-data-[state=expanded]/sidebar:text-lg peer-data-[state=collapsed]/sidebar:text-2xl">
                        {data.title}
                    </CardTitle>
                    <CardDescription>
                        {data.expiryDate ? `Expiry Date: ${toDateInputValue(data.expiryDate)}` : ""}
                    </CardDescription>
                    <CardAction>
                        <Badge variant="outline"
                            className={
                                isExpired
                                    ? "bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm"
                                    : isExpiringSoon
                                        ? "bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full"
                                        : "bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full"
                            }>
                            {data.expirableOrNot ? isExpired ? "Expired" : `${data.daysToExpiry} days` : "No expiry"}
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex items-center justify-between text-sm">
                    <div className="items-start">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            Authorizing Body
                        </div>
                        <div className="text-muted-foreground">
                            {data.authorizingBody}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onUpload?.(data.id)}
                            className={`p-2 h-8 w-8 transition-colors ${hasDocument
                                ? "text-foreground hover:bg-muted"
                                : "text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/50"
                                }`}
                        >
                            {hasDocument ? (
                                <FileText className="h-4 w-4" />
                            ) : (
                                <Upload className="h-4 w-4" />
                            )}
                            <span className="sr-only">
                                {hasDocument ? "Document uploaded" : "Upload document"}
                            </span>
                        </Button>

                        <Button variant="ghost" size="sm"
                            className="p-2 h-8 w-8 text-muted-foreground/50 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                            <Trash2 className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                            <span className="sr-only">Delete document</span>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
