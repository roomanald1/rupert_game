/* import { GameState, Items, Rooms } from "../game-state"
import { UserInterface } from "../user-interface"

export async function library(state: GameState, user_interface: UserInterface) {
    state.update_rooms_visited(Rooms.library);

    let response = await user_interface.ask_question("You are now in the library\r\n\
        \r\n\
        What would you like to do?  \r\n\
        [A] - Look at bookcase\r\n\
        [B] - move forward to find more boo  \r\n\
        [C] -  \r\n")

    switch (response) {
        case "a": {
            user_interface.clear()
            bookcase(state, user_interface)
            break;
        }
         case "b": {
            break;
        }
         case "c": {
            
            break;
        }
        default:
            {
                user_interface.show_message(`I didnt understand what you typed ${response}`)
            }
    }
}


export async function bookcase(state: GameState, user_interface: UserInterface) {



    let response = await user_interface.ask_question("Pick a book\r\n\
        \r\n\
        [A] - Perfume 101 - A wizards guide \r\n\
        [B] - Bad Dad - David Walliams  \r\n\
        [C] -  \r\n")

    switch (response) {
        case "a": {
            user_interface.clear()
            user_interface.show_message("This looks like a spell book. That might come in handy")
            user_interface.show_message("Added book to items")
            state.add_item(Items.perfume_book)
            library(state, user_interface)
            break;
        }
         case "b": {
            user_interface.clear()
            user_interface.show_message("What a terrible choice!")
            library(state, user_interface)
            break;
        }
         case "c": {
            
            break;
        }
        default:
            {
                user_interface.show_message(`I didnt understand what you typed ${response}`)
            }
    }
} */