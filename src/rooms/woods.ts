import { italic } from "colorette";
import { GameEngine, Room } from "../engine";
import { Events, Items, Rooms } from "../game-state";
import { questionOption } from "../user-interface";

export class Woods implements Room {

    async use_item(engine: GameEngine, item: Items): Promise<void> {
        if (item == Items.sword) {
            engine.clear_screen();
            engine.write_line(italic("You stumble forwards. And snap a twig under your feet. Now, the howling sound is much closer and you are surrounded by red eyes."))
            engine.write_line(italic("Its a pack of hungry wolves - You brandish your sword - and defeat the wolves"));
            engine.set_event_occurred(Events.defeat_wolves);
        } else {
            engine.write_line("No use for this item here");
        }
    }


    async visit(engine: GameEngine, from: Rooms): Promise<void> {
        if (from != Rooms.woods) {
            engine.write_line("The woods are dense. Its dark.\r\nYou cannot see much. You hear a creepy howling from the far right.");
        }
        if (engine.event_occurred(Events.defeat_wolves)) {
            await engine.prompt_options("What would you like to do?",
                [
                    questionOption("Head back to the garden", async () => engine.move_to_room(Rooms.garden)),
                ]
            )
        } else {
            await engine.prompt_options("What would you like to do?",
                [
                    questionOption("This is too creepy. Head back to the garden", async () => engine.move_to_room(Rooms.garden)),
                    questionOption("Stumble Forwards", async () => this.encounter_wolves(engine) ),
                ]
            )
        }
    }

    encounter_wolves(engine: GameEngine) {
        engine.clear_screen();
        engine.write_line("You walk forwards. And snap a twig under your feet. Now, the howling sound is much closer and you are surrounded by red eyes.")
        engine.game_over("Its a pack of hungry wolves - you tried to put up a fight but they were just too strong")
    }

}