// Type for items
export interface Item {
    id: string;
    content: string;
}

export interface CombinedItems {
    items: Item[];
    itemsTwo: Item[];
}

export const combinedItems: CombinedItems = {
    items: [
        { id: "item-0", content: "KPI" },
        { id: "item-1", content: "KPI" },
        { id: "item-2", content: "KPI" }
    ],
    itemsTwo: [
        { id: "item-3", content: "BAR" },
        { id: "item-4", content: "PIE" },
        { id: "item-5", content: "KPI" }
    ]
};

export function updateItemContent(index: number, newValue: string, array: Item[]): Item[] {
    if (index >= 0 && index < array.length) {
        array[index].content = newValue;
    } else {
        console.error('Invalid index');
    }

    return array;
}