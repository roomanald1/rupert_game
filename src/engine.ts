import { GameState, Items, Rooms } from "./game-state";
import { UserInterface } from "./user-interface";

export abstract class Room {
    abstract visit(state: GameEngine): Promise<void>
}


export class GameEngine {
    constructor(private state: GameState, private _user_interface: UserInterface, private rooms: Map<Rooms, Room>) {

    }

    has_visited_room(room_name: Rooms){
        return this.state.has_visited_room(room_name);
    }

    async start(init_room: Rooms) {
        this.user_interface.clear()
        this.user_interface.write_line("******************************");
        this.user_interface.write_line("Welcome to the world of 'THE GAME'");
        this.user_interface.write_line("******************************");
        this.user_interface.write_line("Press Enter to start");

        await this.user_interface.wait_for_enter()

        this.move_to_room(init_room)
    }

    get user_interface() {
        return this._user_interface;
    }

    async move_to_room(room_name: Rooms) {
        let room = this.rooms.get(room_name);
        if (room) {
            this.user_interface.clear();        
            room.visit(this);
            this.state.update_rooms_visited(room_name)    
        } else {
            throw Error(`Cannot move to room ${room_name} - room not registered`)
        }
    }

    pick_up_item(item: Items) {
        this.state.add_item(item);
    }

    has_item(item: Items) {
        return this.state.has_item(item);
    }

    end(msg: string){
        this.user_interface.write_line(msg);
        this.user_interface.write_line("");
        this.user_interface.write_line("___________________")
        this.user_interface.write_line("    GAME OVER")
        this.user_interface.write_line("___________________")
    }
}


