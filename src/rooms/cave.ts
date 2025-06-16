import { italic } from "colorette";
import { GameEngine, Room } from "../engine";
import { Events, Items, Rooms } from "../game-state";
import { questionOption } from "../user-interface";


export class Cave implements Room {

    async use_item(engine: GameEngine, item: Items): Promise<void> {
        if (item == Items.key) {
            engine.write_line(`Success the crate is open`)
            engine.write_line(`In the crate is a shiny silver sword`)
            engine.write_line(`You pick it up and swing it from side to side - Its really heavy`)
            engine.pick_up_item(Items.sword)
            engine.set_event_occurred(Events.opened_chest)
        } else {
            engine.write_line("No use for this item here");
        }
    }

    async visit(engine: GameEngine, from: Rooms): Promise<void> {
        if (from != Rooms.cave) {
            if (!engine.has_visited_room(Rooms.cave)) {
                engine.write_line(italic("You inspect the antlers of the moose. It doesn't look real. You reach out and touch the antler."));
                engine.write_line(italic("Hey, wait a minute, this antler is a lever. You pull it and it opens a door under the stairs."));
                engine.write_line(italic("You walk through the door."));
                engine.write_line("");
            }
            engine.write_line("");
            engine.write_line(italic("On the left is another flight of stairs heading down"));
            engine.write_line(italic("You look up and see a trapdoor!"));
            engine.write_line(italic("in front of you is an old beaten up crate"));
        }

        await engine.prompt_options("What would you like to do?",
            [
                questionOption("Move back to Entrance", () => this.move_back_to_entrance(engine) ),
                !engine.has_item(Items.sword) && questionOption("Inspect crate",  async () => this.open_the_crate(engine) ),
                questionOption( "Inspect trapdoor", async () => { engine.write_line("TODO"); this.visit(engine, Rooms.cave) } ),
                questionOption( "Head down the stairs", async () => engine.move_to_room(Rooms.library) ),
            ]
        )
    }



    private async move_back_to_entrance(engine: GameEngine): Promise<void> {
        await engine.move_to_room(Rooms.entrance)
    }

    private async open_the_crate(engine: GameEngine) {
        engine.clear_screen()
        engine.write_line(`The crate is locked`);
        this.visit(engine, Rooms.cave);
    }
}