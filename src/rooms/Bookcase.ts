import { Room, GameEngine } from "../engine";
import { Items, Rooms } from "../game-state";
import { questionOption } from "../user-interface";


export class Bookcase implements Room {
    async use_item(engine: GameEngine, item: Items): Promise<void> {
        engine.write_line("No use for this item here");
    }

    async visit(engine: GameEngine, from: Rooms): Promise<void> {
        await engine.prompt_options("Which book would you like to take a closer look at?",
            [
                !engine.has_item(Items.perfume_book) && questionOption( "Perfume 101 - A wizards guide", async () => {
                        engine.write_line("This looks like a perfume spell book. That might come in handy");
                        engine.pick_up_item(Items.perfume_book);
                        this.visit(engine, Rooms.bookcase);
                    }
                ),
                questionOption( "Bad Dad - David Walliams", async () => {
                        engine.write_line("Seriously? This book is less than useless");
                        this.visit(engine, Rooms.bookcase);
                    }
                ),
                questionOption("Return to Library", async () => {
                        engine.move_to_room(Rooms.library);
                    }
                )
            ]
        );
    }
}
