import { DropResult, DraggableLocation } from '@hello-pangea/dnd';
import { CombinedItems, combinedItems, Item } from '../lib/initialpositions';
import useLocalStorage from '../hooks/useLocalStorage';

function reorder(list: Item[], startIndex: number, endIndex: number): Item[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}

function move(
    source: Item[],
    destination: Item[],
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
): Record<string, Item[]> {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: Record<string, Item[]> = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
}

function useDragAndDrop() {
    const [storedValue, setStoredValue] = useLocalStorage<CombinedItems>('items', combinedItems);

    function updateRow1(value: Item[]) {
        setStoredValue(prevStoredValue => ({
            items: [...value],
            itemsTwo: prevStoredValue.itemsTwo
        }));
    }

    function updateRow2(value: Item[]) {
        setStoredValue(prevStoredValue => ({
            items: prevStoredValue.items,
            itemsTwo: [...value]
        }));
    }

    function onDragEnd(result: DropResult): void {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = source.droppableId === 'droppable-row-1' ? storedValue.items : storedValue.itemsTwo;
            const setItems = source.droppableId === 'droppable-row-1' ? updateRow1 : updateRow2;

            const reorderedItems = reorder(items, source.index, destination.index);
            setItems(reorderedItems);
        } else {
            const sourceItems = source.droppableId === 'droppable-row-1' ? storedValue.items : storedValue.itemsTwo;
            const destinationItems = destination.droppableId === 'droppable-row-1' ? storedValue.items : storedValue.itemsTwo;
            const setSourceItems = source.droppableId === 'droppable-row-1' ? updateRow1 : updateRow2;
            const setDestinationItems = destination.droppableId === 'droppable-row-1' ? updateRow1 : updateRow2;

            const result = move(sourceItems, destinationItems, source, destination);

            setSourceItems(result[source.droppableId]);
            setDestinationItems(result[destination.droppableId]);
        }
    }

    return {
        storedValue,
        setStoredValue,
        onDragEnd
    };
}

export default useDragAndDrop;