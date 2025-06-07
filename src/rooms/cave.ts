/* import { GameState, Items, Rooms } from "../game-state"
import { UserInterface } from "../user-interface"
import { entrance_room } from "./entrance";
import { library } from "./library";

export async function cave(state: GameState, user_interface: UserInterface) {
    user_interface.clear();
    state.update_rooms_visited(Rooms.cave);

    let response = await user_interface.ask_question("You are now in the Cave\r\n\
        On the left is another flight of stairs heading down \r\n\
        You look up and see a trapdoor! \r\n\
        in front of you is an old beaten up crate \r\n\
        \r\n\
        What would you like to do?  \r\n\
        [A] - Open the crate \r\n\
        [B] - Return to entrance hall \r\n\
        [C] - Go down the stairs \r\n")

    switch (response) {
        case "a": {
            if (state.has_item(Items.key)){
                user_interface.show_message(`Success the crate is open`)
                user_interface.show_message(`In the crate is a shiny silver sword`)
                user_interface.show_message(`You pick it up and swing it from side to side - Its really heavy`)
                state.add_item(Items.sword)
                await user_interface.ask_question("Press Enter to return to cave");
                cave(state, user_interface)
            }else {

                user_interface.show_message(`The crate is locked. It appears as though you need a key`);
                await user_interface.ask_question("Press Enter to return to cave");
                cave(state, user_interface)
            }
            break;
        }
         case "b": {
            await entrance_room(state, user_interface)    
            break;
        }
        case "c": {
            user_interface.clear();
            user_interface.show_message(`You take careful steps down the slippery stone steps....`);
            user_interface.show_message(`And arrive at a hidden library`);
            await library(state, user_interface)
            break;
        }
        default:
            {
                user_interface.show_message(`I didnt understand what you typed ${response}`)
            }
    }
} */

import { GameEngine, Room } from "../engine";
import { Items, Rooms } from "../game-state";


export class Cave implements Room {
    async visit(engine: GameEngine): Promise<void> {

        if (!engine.has_visited_room(Rooms.cave)){
            engine.user_interface.write_line("You inspect the antlers of the moose. It doesn't look real. You reach out and touch the antler.");
            engine.user_interface.write_line("Hey, wait a minute, this antler is a lever. You pull it and it opens a door under the stairs.");
            engine.user_interface.write_line("You walk through the door.");
            engine.user_interface.write_line("");
        }

        engine.user_interface.write_line("You are now in the cave below the stairs");
        engine.user_interface.write_line("");
        engine.user_interface.write_line("On the left is another flight of stairs heading down");
        engine.user_interface.write_line("You look up and see a trapdoor!");
        engine.user_interface.write_line("in front of you is an old beaten up crate");

        await engine.user_interface.ask_question("What would you like to do?",
            {
                "a": { optionDescription: "Move back to Entrance", action: () => this.move_back_to_entrance(engine) },
                "b": { optionDescription: "Open the crate", action: async () => this.open_the_crate(engine) },
                "c": { optionDescription: "Inspect trapdoor", action: async () => engine.user_interface.write_line("You choose c") },
                "d": { optionDescription: "Head down the stairs", action: async () => engine.user_interface.write_line("You choose d") },
            }
        )
    }

    private async move_back_to_entrance(engine:GameEngine): Promise<void>{
        await engine.move_to_room(Rooms.entrance)
    }

    private async open_the_crate(engine:GameEngine){
        engine.user_interface.clear()
        if (engine.has_item(Items.key)){
            engine.user_interface.write_line(`Success the crate is open`)
            engine.user_interface.write_line(`In the crate is a shiny silver sword`)
            engine.user_interface.write_line(`You pick it up and swing it from side to side - Its really heavy`)
            engine.pick_up_item(Items.sword)
            this.visit(engine);
        }else {
            engine.user_interface.write_line(`The crate is locked. It appears as though you need a key`);
            this.visit(engine);
        }
    }
}