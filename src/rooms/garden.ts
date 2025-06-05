import { GameState } from "../game-state"
import { UserInterface } from "../user-interface"
import { entrance_room } from "./entrance";
import { woods } from "./woods";

export async function the_garden(state: GameState, user_interface: UserInterface) {
    user_interface.clear();

    user_interface.write_line("You are now in the Garden");
    user_interface.write_line("Its a beautiful summers day, the birds are singing and the bees are buzzing around the lavendar hedge that leads down a path towards a water fountain");
    user_interface.write_line("Beyond the fountain is a wooded area and left of the fountain is a stunning rose garden.");
    let response = await user_interface.ask_question("\r\n\
         What would you like to do?  \r\n\
         [A] - Head back in \r\n\
         [B] - Explore the woods \r\n\
         [C] - Look around the rose garden \r\n\
         [D] - Throw a penny in the fountain\r\n")

    switch (response) {
        case "a": {
            entrance_room(state, user_interface);
            break;
        }
        case "b": {
            woods(state, user_interface);
            break;
        }
        case "c": {
            user_interface.write_line("Looking around the rose garden")
            break;
        }
        case "d": {
            user_interface.write_line("You rummage through your pockets for a penny. You find one and flick it between you thumb and index finger into the fountain.....")
            break;
        }
        default:
            {
                user_interface.show_message(`I didnt understand what you typed ${response}`)
            }
    }
}