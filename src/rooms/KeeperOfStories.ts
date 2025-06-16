import { Room, GameEngine } from "../engine";
import { Rooms, Events, Items } from "../game-state";
import { red, yellow, italic } from "colorette"
import { questionOption } from "../user-interface";

export class KeeperOfStories implements Room {
    /*
    Character: Elias Thorne, the Keeper of Stories
    - Appearance: A tall, slightly gaunt man with silver-streaked hair, dressed in an old-fashioned waistcoat and carrying a pocket watch that never seems to tick correctly.
    - Personality: Gentle yet unsettling—his voice is soft, measured, and always feels like he knows more than he lets on. He never quite answers questions directly, leading players to piece together his meaning.
    - Role in the game: Elias claims to be the Keeper of Stories, a role he insists was bestowed upon him by forces beyond comprehension. He curates forgotten tales of the manor and can give cryptic hints about its history, its secrets, and the strange occurrences within.
    - Unique mechanic: Every time the player speaks to Elias, he offers a snippet of an old tale. If the player connects the right pieces, they might uncover something hidden in the manor’s depths—perhaps a
    */
    async visit(engine: GameEngine, from: Rooms): Promise<void> {
        if (from != Rooms.KeeperOfStories) {
            engine.write_line(italic("You approach the man. He is dressed in a old fashioned waistcoat and carrying a pocket watch that never seems to tick"));
        }
        if (engine.event_occurred(Events.KeeperOfStories_ask_help)) {
            this.tell_tale(engine);
        }

        await engine.prompt_options(engine.event_occurred(Events.KeeperOfStories_ask_name) ? "Ask Elias a question" : "Ask him a question?", [
            !engine.event_occurred(Events.KeeperOfStories_ask_name) && questionOption(
                "What is your name?", async () => {
                    engine.write_line(red("You:") + " Hi, I'm lost. What's your name?");
                    engine.write_line(yellow("Elias Thorne:") + " Good Day Sir, I am Elias Throne");
                    engine.set_event_occurred(Events.KeeperOfStories_ask_name);
                    this.visit(engine, Rooms.KeeperOfStories);
                }
            ),
            engine.event_occurred(Events.KeeperOfStories_ask_name) &&
            !engine.event_occurred(Events.KeeperOfStories_ask_help) && questionOption(
                "Can you help?", async () => {
                    engine.write_line(red("You:") + " Hi Elias, Can you please help me?\r\n");
                    engine.write_line(yellow("Elias Thorne:") + " That really depends on what you need help with Sir, I have had the role bestowed upon me of the keeper of stories.");
                    engine.set_event_occurred(Events.KeeperOfStories_ask_help);
                    this.visit(engine, Rooms.KeeperOfStories);
                }
            ),
            questionOption("Return to Entrance Hall", async () => engine.move_to_room(Rooms.entrance))
        ]);
    }

    private tell_tale(engine: GameEngine): void {

        var tales: { isValid: (() => boolean), tell_tale: () => void }[]
            = [
                {
                    isValid: () => !engine.event_occurred(Events.pennyInTheFountain),
                    tell_tale: () => {
                        engine.write_line(italic("\nElias leans in, his voice barely more than a whisper.\n"));
                        engine.write_line(yellow("Elias Thorne:") + " Once, long ago, a traveler passed through this manor—a woman with tired eyes and a silver coin in her palm...");
                        engine.write_line("She spoke to the fountain, though none could hear her words—plea, bargain, hope. When the coin kissed the water's surface, something changed.");
                        engine.write_line("The doors that had been shut for centuries groaned, the whispers in the halls softened, and the shadow beyond the library... well, let’s say it took a step back, just for a while.\n");
                        engine.write_line(italic("He pauses, inspecting you with quiet curiosity.\n"));
                        engine.write_line(yellow("Elias Thorne:") + " Of course, such things are mere stories. But if you ever find yourself lost, uncertain of the way, and the weight in your pocket feels just heavy enough... well, what harm is there in a small gesture?");
                    },
                },
                {
                    isValid: () => !engine.has_visited_room(Rooms.cave),
                    tell_tale: () => {
                        engine.write_line(italic("\nHis lips curl into something resembling a smile, though it never quite reaches his eyes.\n"));
                        engine.write_line(yellow("Elias Thorne:") + " They never think to look up. People wander these halls, searching the floors, pressing against the walls. But the secret isn’t in the stone—it’s in the beast.\n");
                        engine.write_line(italic("He gestures vaguely toward the manor’s aging decor, his fingers tracing unseen shapes in the air.\n"));
                        engine.write_line(yellow("Elias Thorne:") + " There was once a hunter, a man who called the woods his home. He carved a path through the wild, but the wild never forgives.");
                        engine.write_line("The antlers he carried were not trophies, not prizes, but burdens—a reminder of a promise made in whispers and broken in silence.");
                    },
                },
                {
                    isValid: () => engine.has_visited_room(Rooms.cave) && !engine.event_occurred(Events.opened_chest),
                    tell_tale: () => {
                        engine.write_line(italic("\nHe narrows his eyes, fingers absently tracing the edges of his pocket watch.\n"));
                        engine.write_line(yellow("Elias Thorne:") + " There was once a man who understood the trees, who carried a sword—not for battle, but for truth.");
                        engine.write_line("And when his time came to lay it down, he did not bury it in the earth nor lock it behind doors of stone.");
                        engine.write_line("No… he gave it to the wood one last time. A chest, carved from the same restless roots that once sought to claim him.");
                        engine.write_line("A quiet prison for an instrument of defiance.\n");
                        engine.write_line(italic("His gaze drifts toward the darkened corners of the manor.\n"));
                        engine.write_line(yellow("Elias Thorne:") + " If you listen, truly listen, you might hear it—faint, buried beneath the years. The whisper of steel longing for a hand to wield it again.\n");
                        engine.write_line("But the question is… do you have the courage to open the past?");
                    },
                },
                {
                    isValid: () => engine.event_occurred(Events.opened_chest) && !engine.event_occurred(Events.defeat_wolves),
                    tell_tale: () => {
                        engine.write_line(italic("\nHe lets out a slow breath, his gaze drifting toward the books that surround the room.\n"));
                        engine.write_line(yellow("Elias Thorne:") + " The woods were never meant for wandering. Not at night, not alone.");
                        engine.write_line("There are shapes in the shadows, figures just beyond sight, but it is the trees you should fear the most.\n");
                        engine.write_line(italic("He closes his pocket watch, the click sounding sharper than it should.\n"));
                        engine.write_line(yellow("Elias Thorne:") + " Long ago, a man ventured into the heart of the forest. He spoke of movement—branches twisting against the wind, hollow whispers threading through the bark.");
                        engine.write_line("The deeper he went, the more the trees watched him, their knots shifting like lidless eyes.");
                        engine.write_line("But he carried a sword, and that was his salvation. Steel is truth, steel is clarity.");
                        engine.write_line("The moment his blade touched wood, the forest recoiled.");
                    },
                },
                {
                    isValid: () => !engine.event_occurred(Events.KeeperOfStories_SpeakToDoors),
                    tell_tale: () => {
                        engine.set_event_occurred(Events.KeeperOfStories_SpeakToDoors);
                        engine.write_line(italic("\nElias stands still, eyes drifting toward the dim hallway at the edge of the room.\n"));
                        engine.write_line(yellow("Elias Thorne:") + " There are doors in this manor that do not respond to keys. No latch, no lock, no clever hand.");
                        engine.write_line("Just silence—until the right word is spoken.\n");
                        engine.write_line(italic("He traces a fingertip along the spine of a nearby book, as if it, too, is listening.\n"));
                        engine.write_line(yellow("Elias Thorne:") + " They say the manor listens. That it remembers voices, intentions, even regrets.");
                        engine.write_line("One door in particular... oak-bound.");
                        engine.write_line("It opened for a woman once—not because she forced it, but because she begged it to remember.");
                        engine.write_line(italic("\nHe pauses, the ticking of his watch loud in the hush.\n"));
                        engine.write_line(yellow("Elias Thorne:") + " It’s not a magic word, not exactly. It’s a memory—the right one, spoken with conviction.");
                    },
                },
            ];

        var valid = tales.filter(_ => _.isValid())
        if (valid.length > 0) {
            const chosen = valid[Math.floor(Math.random() * valid.length)];
            chosen.tell_tale();
        }

    }


    async use_item(engine: GameEngine, item: Items): Promise<void> {
        engine.write_line("No use for this item here");
    }

}
