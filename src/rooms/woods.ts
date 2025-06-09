import { GameEngine, Room } from "../engine";
import { Items, Rooms } from "../game-state";

export class Woods implements Room {
    async visit(engine: GameEngine): Promise<void> {
        engine.user_interface.write_title("You are now in the Woods")
        engine.user_interface.write_line("The woods are dense. Its dark.\r\n\You cannot see much. You hear a creepy howling from the far right.");
        await engine.user_interface.ask_question("What would you like to do?",
            [
                { optionDescription: "This is too creepy. Head back to the garden", action: async () => engine.move_to_room(Rooms.garden) },
                { optionDescription: "Stumble Forwards", action: async () => this.encounter_wolves(engine) },
                { optionDescription: "Follow the sound", action: async () => this.encounter_wolves(engine) },
            ]
        )
    }

    encounter_wolves(engine: GameEngine) {
        if (engine.has_item(Items.sword)) {
            engine.user_interface.clear();
            engine.user_interface.write_line("You stumble forwards. And snap a twig under your feet. Now, the howling sound is much closer and you are surrounded by red eyes.")
            engine.user_interface.write_line("Its a pack of hungry wolves - You brandish your sword - and defeat the wolves");
            this.visit(engine)
        } else {
            engine.user_interface.clear();
            engine.user_interface.write_line("You walk forwards. And snap a twig under your feet. Now, the howling sound is much closer and you are surrounded by red eyes.")
            engine.end("Its a pack of hungry wolves - you tried to put up a fight but they were just too strong")
        }
    }

}