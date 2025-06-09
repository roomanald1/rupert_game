
import { GameEngine, Room } from "../engine";
import { Rooms } from "../game-state";

export class RoseGarden implements Room {
    async visit(engine: GameEngine): Promise<void> {
        engine.user_interface.write_line("You are now in the Rose Garden");
        await engine.user_interface.ask_question("What would you like to do?",
            [
                { optionDescription: "Head back to the main garden", action: async () => engine.move_to_room(Rooms.garden)  },
            ]
        )
    }

}