import { DragDropContext, Droppable, Draggable, DropResult, DraggableLocation } from '@hello-pangea/dnd';
import WidgetCard from './components/dashboard/ui/Widget';
import { useState } from 'react';

// Type for items
interface Item {
  id: string;
  content: string;
}

const items = [
  {
    id: "item-0",
    content: "item 0"
  },
  {
    id: "item-1",
    content: "item 1"
  },
  {
    id: "item-2",
    content: "item 2"
  }
]
 
const itemsTwo = [
  {
    id: "item-3",
    content: "item 0"
  },
  {
    id: "item-4",
    content: "item 1"
  },
  {
    id: "item-5",
    content: "item 2"
  }
]

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

  // Check if the destination will have 4 items
  if (destClone.length = 4) {
    // If the moved item isn't the last index, move the last item back to the source
    if (droppableDestination.index !== destClone.length - 1) {
      const [lastItem] = destClone.splice(destClone.length - 1, 1);
      sourceClone.push(lastItem);
    }
    // Else if the moved item is the last index, move the second-to-last item back to the source
    else {
      const [secondToLastItem] = destClone.splice(destClone.length - 2, 1);
      sourceClone.push(secondToLastItem);
    }
  }

  const result: Record<string, Item[]> = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
}


const App: React.FC = () => {
  // Two lists of items
  const [itemsRow1, setItemsRow1] = useState<Item[]>(items);
  const [itemsRow2, setItemsRow2] = useState<Item[]>(itemsTwo);

  function onDragEnd(result: DropResult): void {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // Dropped within the same list
    if (source.droppableId === destination.droppableId) {
      const items = source.droppableId === 'droppable-row-1' ? itemsRow1 : itemsRow2;
      const setItems = source.droppableId === 'droppable-row-1' ? setItemsRow1 : setItemsRow2;

      const reorderedItems = reorder(items, source.index, destination.index);
      setItems(reorderedItems);
    }
    // Dropped into a different list
    else {
      const sourceItems = source.droppableId === 'droppable-row-1' ? itemsRow1 : itemsRow2;
      const destinationItems = destination.droppableId === 'droppable-row-1' ? itemsRow1 : itemsRow2;
      const setSourceItems = source.droppableId === 'droppable-row-1' ? setItemsRow1 : setItemsRow2;
      const setDestinationItems = destination.droppableId === 'droppable-row-1' ? setItemsRow1 : setItemsRow2;

      const result = move(sourceItems, destinationItems, source, destination);
      setSourceItems(result[source.droppableId]);
      setDestinationItems(result[destination.droppableId]);
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-row-1" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-row mb-4"
          >
            {itemsRow1.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="w-fit"
                  >
                    <WidgetCard />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="droppable-row-2" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-row"
          >
            {itemsRow2.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="w-fit"
                  >
                    <WidgetCard />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
