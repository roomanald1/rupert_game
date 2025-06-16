import { italic } from "colorette";
import { GameEngine, Room } from "../engine";
import { Items, Rooms } from "../game-state";
import { questionOption } from "../user-interface";

export class Library implements Room {
    async use_item(engine: GameEngine, item: Items): Promise<void> {
        engine.write_line("No use for this item here");
    }
    async visit(engine: GameEngine, from: Rooms): Promise<void> {

        if (from != Rooms.library) {
            engine.write_line(italic("You have entered a vast library. There are bookcases adhoring all the walls"))
        }
        await engine.prompt_options("What would you like to do?",
            [
               questionOption("Look at bookcase", async () => engine.move_to_room(Rooms.bookcase) ),
                questionOption("Head back upstairs", async () => engine.move_to_room(Rooms.cave) ),
            ]
        )
    }
}

