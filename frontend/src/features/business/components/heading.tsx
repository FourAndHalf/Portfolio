import React from "react";

export function Heading({ header, subHeader }: { header: string, subHeader: string }) {
    if (subHeader) {
        return (
            <header className="shrink-0">
                <div className="flex h-12 items-center gap-2 border-b text-3xl font-bold">
                    {header}
                </div>
                {subHeader && (
                    <p className="mt-1 text-sm font-normal">{subHeader}</p>
                )}
            </header>
        );
    } else {
        return (
            <header className="h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 text-3xl font-bold">
                 {header}
            </header>
        );
    }
}