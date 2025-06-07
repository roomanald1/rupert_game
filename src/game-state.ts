export enum Items {
    sword,
    key,
    perfume_book,
    spell_book
}

export enum Rooms {
    cave,
    entrance,
    garden,
    library,
    woods,
    rose_garden
}

export class GameState {

    private rooms_visited = new Set<Rooms>()
    private items = new Set<Items>()

    update_rooms_visited(room:Rooms){
        this.rooms_visited.add(room)
    }

    has_visited_room(room:Rooms){
        return this.rooms_visited.has(room);
    }

    add_item(item:Items){
        this.items.add(item)
    }

    has_item(item: Items){
        return this.items.has(item)
    }
}

