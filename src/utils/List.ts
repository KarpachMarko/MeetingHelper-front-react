export class List<TElem> {
    private readonly _items: TElem[] = [];

    constructor(items?: TElem[]) {
        if (items !== undefined) {
            this._items = items;
        }
    }

    get itemsArray(): TElem[] {
        return this._items;
    }

    public add(...item: TElem[]): void {
        this._items.push(...item);
    }

    public remove(item: TElem): void {
        const itemsToRestore: TElem[] = []

        let removedItem = this._items.pop();
        while (removedItem !== undefined) {
            if (removedItem !== item) {
                itemsToRestore.push(removedItem);
            }
            removedItem = this._items.pop();
        }

        let restoreItem = itemsToRestore.pop();
        while (restoreItem !== undefined) {
            this._items.push(restoreItem);
            restoreItem = itemsToRestore.pop();
        }
    }

    public removeAt(index: number): void {
        const itemsToRestore: TElem[] = []
        const initialLength = this._items.length;

        let removedItem = this._items.pop();
        let removedIndex = initialLength - 1;
        while (removedItem !== undefined) {
            if (removedIndex !== index) {
                itemsToRestore.push(removedItem);
            }
            removedItem = this._items.pop();
            removedIndex--;
        }

        let restoreItem = itemsToRestore.pop();
        while (restoreItem !== undefined) {
            this._items.push(restoreItem);
            restoreItem = itemsToRestore.pop();
        }
    }

    public size(): number {
        return this._items.length;
    }

    public isEmpty(): boolean {
        return this._items.length === 0;
    }

    public get(index: number): TElem {
        return this._items[index];
    }

    public filter(filterFunc: (item: TElem) => boolean): void {
        const itemsToRestore: TElem[] = []

        let removedItem = this._items.pop();
        while (removedItem !== undefined) {
            itemsToRestore.push(removedItem);
            removedItem = this._items.pop();
        }

        let restoreItem = itemsToRestore.pop();
        while (restoreItem !== undefined) {
            if (filterFunc(restoreItem)) {
                this._items.push(restoreItem);
            }
            restoreItem = itemsToRestore.pop();
        }
    }
}