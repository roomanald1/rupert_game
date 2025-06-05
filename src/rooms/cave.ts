import { GameState } from "../game-state"
import { UserInterface } from "../user-interface"
import { entrance_room } from "./entrance";
import { library } from "./library";

export async function cave(state: GameState, user_interface: UserInterface) {
    user_interface.clear();
    state.update_rooms_visited("cave");

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
            if (state.has_item("key")){
                user_interface.show_message(`Success the crate is open`)
                user_interface.show_message(`In the crate is a shiny silver sword`)
                user_interface.show_message(`You pick it up and swing it from side to side - Its really heavy`)
                state.add_item("sword")
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
}