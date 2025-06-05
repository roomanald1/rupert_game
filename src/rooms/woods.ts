import { GameState } from "../game-state"
import { UserInterface } from "../user-interface"
import { the_garden } from "./garden";

export async function woods(state: GameState, user_interface: UserInterface) {
    user_interface.clear();
    state.update_rooms_visited("woods");

    let response = await user_interface.ask_question("You are now in the Woods\r\n\
        The woods are dense. Its dark.\r\n\
        You cannot see much. You hear a creepy howling from the far right. \r\n\
        \r\n\
        What would you like to do?  \r\n\
        [A] - Stumble forwards \r\n\
        [B] - Follow the sound \r\n\
        [C] - This is too creepy. Head back to the garden \r\n")

    switch (response) {
        case "a": {
            user_interface.clear();    
            user_interface.write_line("You stumble forwards. And snap a twig under your feet. Now the howling sound is much closer and you are surrounded by red eyes")    
            user_interface.write_line("**************GAME OVER**************");        
            break;
        }
         case "b": {
            user_interface.clear();    
            user_interface.write_line("You head towards the sound. You twitch your head back and forth. The sound is all around you. Now the howling sound is much closer and you are surrounded by red eyes")    
            user_interface.write_line("**************GAME OVER**************");          
            break;
        }
         case "c": {
            the_garden(state, user_interface);
            break;
        }
        default:
            {
                user_interface.show_message(`I didnt understand what you typed ${response}`)
            }
    }
}