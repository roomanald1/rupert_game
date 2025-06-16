export enum Items {
    sword = "Sword",
    key = "Key",
    perfume_book = "Perfume Book",
    spell_book = "Spell Book",
    penny = "Penny"
}

export enum Rooms {
    cave = "Cave",
    entrance = "Entrance Hall",
    garden = "Garden",
    library = "Library",
    woods = "Woods",
    rose_garden= "Rose Garden",
    bookcase = "Bookcase",
    KeeperOfStories = "Keeper Of Stories"
}

export enum Events{
    defeat_wolves = "Defeat Wolves",
    KeeperOfStories_ask_name = "KeeperOfStories_ask_name",
    pennyInTheFountain = "pennyInTheFountain",
    KeeperOfStories_ask_help = "KeeperOfStories_ask_help",
    opened_chest = "opened_chest",
    KeeperOfStories_SpeakToDoors = "KeeperOfStories_SpeakToDoors"
}

export class GameState {
    event_occurred(event: Events): boolean {
        return this._events_occurred.has(event);
    }

    set_event_occurred(event: Events) {
        this._events_occurred.add(event);
    }
    remove_item(item: Items) {
        this._items.delete(item);
    }

    private _events_occurred = new Set<Events>();
    private _rooms_visited = new Set<Rooms>();
    private _items = new Set<Items>([Items.penny]);
    private _current_room : Rooms;

    get current_room(){
        return this._current_room;
    }
    update_rooms_visited(room:Rooms){
        this._rooms_visited.add(room);
        this._current_room = room;
    }

    has_visited_room(room:Rooms){
        return this._rooms_visited.has(room);
    }

    add_item(item:Items){
        this._items.add(item)
    }

    list_items(){
        return Array.from(this._items);
    }

    has_item(item: Items){
        return this._items.has(item)
    }
}

