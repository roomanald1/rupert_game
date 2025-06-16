import { italic } from "colorette";
import { GameEngine, Room } from "../engine";
import { Events, Items, Rooms } from "../game-state";
import { questionOption } from "../user-interface";

export class Garden implements Room {
    async use_item(engine: GameEngine, item: Items): Promise<void> {
        if (item == Items.penny) {
            engine.write_line("You rummage through your pockets for a penny. You find one and flick it between you thumb and index finger into the fountain.....")
            engine.write_line("You take a closer look at the penny. And right next to it is a key. You pick up the key")
            engine.set_event_occurred(Events.pennyInTheFountain)
            engine.pick_up_item(Items.key)
            engine.remove_item(Items.penny)

        } else {
            engine.write_line("No use for this item here");
        }
    }

    async visit(engine: GameEngine, from: Rooms): Promise<void> {
        if (from != Rooms.garden) {
            engine.write_line(italic("Its a beautiful summers day, the birds are singing and the bees are buzzing around the lavendar hedge that leads down a path towards a water fountain"))
            engine.write_line(italic("Beyond the fountain is a wooded area and left of the fountain is a stunning rose garden'"))
        }

        await engine.prompt_options("What would you like to do?",
            [
                questionOption("Head back to entrance hall",  async () => engine.move_to_room(Rooms.entrance) ),
                questionOption( "Explore the woods",  async () => engine.move_to_room(Rooms.woods) ),
                questionOption( "Look around the rose garden",  async () => engine.move_to_room(Rooms.rose_garden) ),
            ]
        )
    }
}