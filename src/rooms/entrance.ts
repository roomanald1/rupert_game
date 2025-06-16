import { italic } from "colorette";
import { GameEngine, Room } from "../engine";
import { Events, Items, Rooms } from "../game-state";
import { questionOption } from "../user-interface";

export class Entrance implements Room {
    async use_item(engine: GameEngine, item: Items): Promise<void> {
        engine.write_line("No use for this item here");
    }
    async visit(engine: GameEngine, from: Rooms): Promise<void> {
        if (from != Rooms.entrance) {
            engine.write_line(italic("It's a grand room, decorated with lots of victorian features and a mooses head on the wall above a roaring fire"))
            engine.write_line(italic("It has a set of sweeping stairs heading upwards, a set of double doors right ahead and another to the right marked 'Garden'"))
            engine.write_line(italic("and in the corner is tall, slightly gaunt man with silver streaked hair."))
        }

        await engine.prompt_options("What would you like to do?",
            [
                questionOption( "Walk up the stairs", async () => this.head_upstairs(engine) ),
                questionOption( "Open the door marked 'garden'", async () => this.garden(engine) ),
                questionOption( "Go through the double doors", () => this.double_doors(engine) ),
                questionOption(!engine.event_occurred(Events.KeeperOfStories_ask_name) ? "Speak to the man" : "Speak to Elias (Keeper of stories)", async () => engine.move_to_room(Rooms.KeeperOfStories) ),
                questionOption(!engine.has_visited_room(Rooms.cave) ? "Have a closer look at the moose" : "Enter the cave", () => this.look_at_moose(engine) ),
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
        engine.write_line("The door is locked! It has no handle, or keyhole. \n");
        engine.write_line("There is something etched into the door\n")
        engine.write_line(italic("I am always hungry, I must always be fed. The more you give me, the more I grow—till I turn everything to ash."))

        if (engine.event_occurred(Events.KeeperOfStories_SpeakToDoors)){
            if (await engine.prompt("Speak to door?", "FIRE")) {
                engine.write_line("The door creaks open!")
            }else {
                engine.write_line("Nothing happened!")
            }
        }

        this.visit(engine, Rooms.entrance);
    }
}