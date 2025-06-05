export class GameState {
    private rooms_visited = new Set<string>()

    update_rooms_visited(room:string){
        this.rooms_visited.add(room)
    }

    has_visited_room(room:string){
        return this.rooms_visited.has(room);
    }
}

