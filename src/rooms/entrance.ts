import { GameEngine, Room } from "../engine";
import { Items, Rooms } from "../game-state";

export class Entrance implements Room {
    async use_item(engine: GameEngine, item: Items): Promise<void> {
        engine.write_line("No use for this item here");
    }
    async visit(engine: GameEngine, from: Rooms): Promise<void> {
        if (from != Rooms.entrance) {
            engine.write_line("It's a grand room, decorated with lots of victorian features and a mooses head on the wall above a roaring fire")
            engine.write_line("It has a set of sweeping stairs heading upwards, a set of double doors right ahead and another to the right marked 'Garden'")
        }

        await engine.prompt_options("What would you like to do?",
            [
                { optionDescription: "Walk up the stairs", action: async () => this.head_upstairs(engine) },
                { optionDescription: "Open the door marked 'garden'", action: async () => this.garden(engine) },
                { optionDescription: "Go through the double doors", action: () => this.double_doors(engine) },
                { optionDescription: !engine.has_visited_room(Rooms.cave) ? "Have a closer look at the moose" : "Enter the cave", action: () => this.look_at_moose(engine) },
            ]
        )
    }

    private async head_upstairs(engine: GameEngine): Promise<void> {
        engine.write_line("TODO");
        this.visit(engine, Rooms.entrance);
    }

    private async look_at_moose(engine: GameEngine): Promise<void> {
        await engine.move_to_room(Rooms.cave)
    }

    private async garden(engine: GameEngine): Promise<void> {
        await engine.move_to_room(Rooms.garden)
    }

    private async double_doors(engine: GameEngine): Promise<void> {
        engine.write_line("TODO");
        this.visit(engine, Rooms.entrance);
    }
}