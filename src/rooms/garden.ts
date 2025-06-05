import { GameState } from "../game-state"
import { UserInterface } from "../user-interface"
import { entrance_room } from "./entrance";
import { woods } from "./woods";

export async function the_garden(state: GameState, user_interface: UserInterface) {
    user_interface.clear();
    let response = await user_interface.ask_question("You are now in the Garden.\
         \r\n\
         What would you like to do?  \r\n\
         [A] - Head back in \r\n\
         [B] - Explore the woods \r\n\
         [C] - Look around the rose garden \r\n")

    switch (response) {
        case "a": {
            entrance_room(state, user_interface);
            break;
        }
        case "b": {
            woods(state, user_interface);
            break;
        }
        default:
            {
                user_interface.show_message(`I didnt understand what you typed ${response}`)
            }
    }
}