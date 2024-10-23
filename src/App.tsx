import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import WidgetMixer from './components/dashboard/ui/WidgetMixer';
import useDragAndDrop from './hooks/useDragAndDrop';
import { CombinedItems, updateItemContent } from './lib/initialpositions';
import React from 'react';
import { Button } from './components/ui/button';
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"




function App() {
  const { storedValue, setStoredValue, onDragEnd } = useDragAndDrop();
  const [selectedWidget, setSelectedWidget] = React.useState<string>('');
  let enableAddWidgetButton = false;

  const findEmptyContentIndices = React.useCallback((storedValue: CombinedItems): { items: number[], itemsTwo: number[] } => {
    const emptyIndicesItems: number[] = [];
    const emptyIndicesItemsTwo: number[] = [];

    storedValue.items.forEach((item, index) => {
      if (item.content === '') {
        emptyIndicesItems.push(index);
      }
    });

    storedValue.itemsTwo.forEach((item, index) => {
      if (item.content === '') {
        emptyIndicesItemsTwo.push(index);
      }
    });

    return {
      items: emptyIndicesItems,
      itemsTwo: emptyIndicesItemsTwo
    };
  }, []);

  const emptyIndices = findEmptyContentIndices(storedValue);

  if (emptyIndices.items.length > 0 || emptyIndices.itemsTwo.length > 0) {
    enableAddWidgetButton = true;
  } else {
    enableAddWidgetButton = false;
  }

  function addWidget(widgetType: string): void {
    if (emptyIndices.items.length > 0) {
      const nextValue = updateItemContent(emptyIndices.items[0], widgetType, storedValue.items);
      setStoredValue(prevValue => ({
        items: nextValue,
        itemsTwo: prevValue.itemsTwo
      }));
    } else if (emptyIndices.itemsTwo.length > 0) {
      const nextValue = updateItemContent(emptyIndices.itemsTwo[0], widgetType, storedValue.itemsTwo);
      setStoredValue(prevValue => ({
        items: prevValue.items,
        itemsTwo: nextValue
      }));
    }
  };


  const handleUpdateRowOne = React.useCallback((index: number, newValue: string): void => {
    const nextValue = updateItemContent(index, newValue, storedValue.items);
    setStoredValue(prevValue => ({
      items: nextValue,
      itemsTwo: prevValue.itemsTwo
    }));
  }, [storedValue.items]);

  const handleUpdateRowTwo = React.useCallback((index: number, newValue: string): void => {
    const nextValue = updateItemContent(index, newValue, storedValue.itemsTwo);
    setStoredValue(prevValue => ({
      items: prevValue.items,
      itemsTwo: nextValue
    }));
  }, [storedValue.itemsTwo]);

  React.useEffect(() => {
    console.log(selectedWidget)
  }, [selectedWidget]);

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row gap-4 p-2'>
        <Select value={selectedWidget} onValueChange={(value) => setSelectedWidget(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Widget" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="KPI">KPI Widget</SelectItem>
            <SelectItem value="PIE">Pie Chart</SelectItem>
            <SelectItem value="BAR">Bar Chart</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => {
          if (!enableAddWidgetButton) {
            toast("No more space for widgets.");
            return;
          }

          addWidget(selectedWidget);
          toast("Event has been created.")
        }}>Add Text Widget</Button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-row-1" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-row mb-4"
            >
              {storedValue.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="w-fit"
                    >
                      <WidgetMixer type={item.content} index={index} updateRow={handleUpdateRowOne} />
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
              {storedValue.itemsTwo.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="w-fit"
                    >
                      <WidgetMixer type={item.content} index={index} updateRow={handleUpdateRowTwo} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
