
import { GameEngine, Room } from "../engine";
import { Items, Rooms } from "../game-state";

export class RoseGarden implements Room {
    async use_item(engine: GameEngine, item: Items): Promise<void> {
        engine.write_line("No use for this item here");
    }
    async visit(engine: GameEngine, from: Rooms): Promise<void> {
        await engine.prompt_options("What would you like to do?",
            [
                { optionDescription: "Head back to the main garden", action: async () => engine.move_to_room(Rooms.garden) },
            ]
        )
    }

}