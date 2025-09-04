
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
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";

interface CardBodyProps<TData, TValue> {
    cardData: <TData, TValue>[];
    dndEnabled?: boolean;
    onReorder?: (newData: TData[]) => void;
}

function renderCardBody<TData, TValue>({
    cardData,
    dndEnabled,
    dataIds
}: {
    cardData: <TData, TValue>[];
    dndEnabled: boolean;
    dataIds: UniqueIdentifier[];
}) {
    if (!cardData.length) {
        return (
            <h1 className="text-center">
                No results.
            </h1>
        );
    }

    if (dndEnabled) {
        return (
            <SortableContext items={dataIds} strategy={horizontalListSortingStrategy}>

            </SortableContext>
        )
    }
}

export function CardView<TData, TValue>({
    cardData,
    dndEnabled = false,
    onReorder
}: CardBodyProps<TData, TValue>) {
    const dataIds: UniqueIdentifier[] = cardData.
}