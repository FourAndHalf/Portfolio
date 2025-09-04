import * as React from "react";

import {
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DndContext,
    closestCenter,
    type UniqueIdentifier,
    type DragEndEvent,
} from "@dnd-kit/core";
import { horizontalListSortingStrategy, SortableContext, arrayMove } from "@dnd-kit/sortable";
import { ColumnDef } from "@tanstack/react-table";

interface CardViewProps<TData> {
    data: TData[];
    columns: ColumnDef<TData>[];
    dndEnabled?: boolean;
    onReorder?: (newData: TData[]) => void;
    renderCard: (item: TData, index: number) => React.ReactNode;
    getItemId?: (item: TData, index: number) => UniqueIdentifier;
}

function renderCardBody<TData>({
    data,
    dndEnabled,
    dataIds,
    renderCard
}: {
    data: TData[];
    dndEnabled: boolean;
    dataIds: UniqueIdentifier[];
    renderCard: (item: TData, index: number) => React.ReactNode;
}) {
    if (!data.length) {
        return (
            <div className="flex items-center justify-center h-24 text-muted-foreground">
                No results.
            </div>
        );
    }

    if (dndEnabled) {
        return (
            <SortableContext items={dataIds} strategy={horizontalListSortingStrategy}>
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    {data.map((item, index) => (
                        <div key={dataIds[index]} className="w-full">
                            {renderCard(item, index)}
                        </div>
                    ))}
                </div>
            </SortableContext>
        );
    }

    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            {data.map((item, index) => (
                <div key={index} className="w-full">
                    {renderCard(item, index)}
                </div>
            ))}
        </div>
    );
}

export function CardView<TData>({
    data,
    columns,
    dndEnabled = false,
    onReorder,
    renderCard,
    getItemId
}: CardViewProps<TData>) {
    const dataIds: UniqueIdentifier[] = data.map((item, index) =>
        (getItemId ? getItemId(item, index) : (index as UniqueIdentifier))
    );
    const sortableId = React.useId();
    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {})
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (active && over && active.id !== over.id && onReorder) {
            const oldIndex = dataIds.indexOf(active.id);
            const newIndex = dataIds.indexOf(over.id);

            // Call parent with new data order (parent manages state)
            const newData = arrayMove(data, oldIndex, newIndex);
            onReorder(newData);
        }
    }

    const cardContent = renderCardBody({
        data,
        dndEnabled,
        dataIds,
        renderCard
    });

    if (dndEnabled) {
        return (
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                sensors={sensors}
                id={sortableId}
            >
                {cardContent}
            </DndContext>
        );
    }

    return cardContent;
}