import { GameEngine, Room } from "../engine";
import { Items, Rooms } from "../game-state";

export class Library implements Room {
    async use_item(engine: GameEngine, item: Items): Promise<void> {
       engine.write_line("No use for this item here");
    }
    async visit(engine: GameEngine, from: Rooms): Promise<void> {
        await engine.prompt_options("What would you like to do?",
            [
                { optionDescription: "Look at bookcase", action: async () => engine.move_to_room(Rooms.bookcase) },
                { optionDescription: "Head back upstairs", action: async () => engine.move_to_room(Rooms.cave) },
            ]
        )
    }
}

export class Bookcase implements Room {
    async use_item(engine: GameEngine, item: Items): Promise<void> {
        engine.write_line("No use for this item here");
    }

    async visit(engine: GameEngine, from: Rooms): Promise<void> {
        await engine.prompt_options("Which book would you like to take a closer look at?",
            [
                !engine.has_item(Items.perfume_book) && {
                    optionDescription: "Perfume 101 - A wizards guide", action: async () => {
                        engine.write_line("This looks like a perfume spell book. That might come in handy")
                        engine.pick_up_item(Items.perfume_book)
                        this.visit(engine, Rooms.bookcase)
                    }
                },
                {
                    optionDescription: "Bad Dad - David Walliams", action: async () => {
                        engine.write_line("Seriously? This book is less than useless");
                        this.visit(engine, Rooms.bookcase);
                    }
                },
                {
                    optionDescription: "Return to Library", action: async () => {
                        engine.move_to_room(Rooms.library)
                    }
                }
            ]
        )
    }
}