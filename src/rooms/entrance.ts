/* import { GameState, Rooms } from "../game-state";
import { UserInterface } from "../user-interface";
import { cave } from "./cave";
import { the_garden } from "./garden";

export async function entrance_room(state: GameState, user_interface: UserInterface) {
    user_interface.clear();
    
    if (state.has_visited_room(Rooms.entrance)){
        user_interface.write_line("You are back at the entrance hall")
    }else {
        user_interface.write_line("You are in an entrance hall");
    }

    user_interface.write_line("It's a grand room, decorated with lots of victorian features and a mooses head on the wall above a roaring fire")
    user_interface.write_line("It has a set of sweeping stairs heading upwards, a set of double doors right ahead and another to the right marked 'Garden'")

    state.update_rooms_visited(Rooms.entrance);

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
                user_interface.show_message("You open the door and follow the stairs downwards.");
                cave(state, user_interface);
                break;
            }
        default:
            {
                user_interface.show_message(`I didnt understand what you typed ${response}`)
            }
    }
} */

import { GameEngine, Room } from "../engine";
import { Rooms } from "../game-state";

export class Entrance implements Room {
    async visit(engine: GameEngine): Promise<void> {
        engine.user_interface.write_title("You are in an entrance hall");
        engine.user_interface.write_line("It's a grand room, decorated with lots of victorian features and a mooses head on the wall above a roaring fire")
        engine.user_interface.write_line("It has a set of sweeping stairs heading upwards, a set of double doors right ahead and another to the right marked 'Garden'")


        await engine.user_interface.ask_question("What would you like to do?",
            [
                { optionDescription: "Walk up the stairs", action: async () => await engine.move_to_room(Rooms.cave) },
                { optionDescription: "Open the door marked 'garden'", action: async () => this.garden(engine) },
                { optionDescription: "Go through the double doors", action: () => this.double_doors(engine) },
                { optionDescription: !engine.has_visited_room(Rooms.cave) ? "Have a closer look at the moose" : "Enter the cave", action: () => this.look_at_moose(engine) },
            ]
        )
    }


    private async look_at_moose(engine:GameEngine): Promise<void>{
        await engine.move_to_room(Rooms.cave)
    }

    private async garden(engine:GameEngine): Promise<void>{
       await engine.move_to_room(Rooms.garden)
    }

    private async double_doors(engine:GameEngine): Promise<void>{
      
    }
}