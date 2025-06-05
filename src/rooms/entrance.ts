import { GameState } from "../game-state";
import { UserInterface } from "../user-interface";
import { the_garden } from "./garden";

export async function entrance_room(state: GameState, user_interface: UserInterface) {
    user_interface.clear();
    
    if (state.has_visited_room("entrance")){
        user_interface.write_line("You are back at the entrance hall")
    }else {
        user_interface.write_line("You are in an entrance hall");
    }

    user_interface.write_line("It's a grand room, decorated with lots of victorian features and a mooses head on the wall above a roaring fire")
    user_interface.write_line("It has a set of sweeping stairs heading upwards, a set of double doors right ahead and another to the right marked 'Garden'")

    state.update_rooms_visited("entrance");

    let response = await user_interface.ask_question("\r\nWhat would you like to do?  \r\n\
         [A] - Open the door marked 'garden' \r\n\
         [B] - Go through the double doors \r\n\
         [C] - Walk up the stairs \r\n\
         [D] - Stroke the antlers of the moose \r\n")

    switch (response) {
        case "a":
            {
                user_interface.show_message("Heading Outside....");
                the_garden(state, user_interface);
                break;
            }
        case "b":
            {
                user_interface.show_message("Opening the door...");
                break;
            }
        case "c":
            {
                user_interface.show_message("Walking up the creaky stairs...");
                break;
            }
        case "d":
            {
                user_interface.show_message("Stroking the antlers..... Wait a minute.... This is a lever to open a secret door under the stairs!");
                break;
            }
        default:
            {
                user_interface.show_message(`I didnt understand what you typed ${response}`)
            }
    }
}