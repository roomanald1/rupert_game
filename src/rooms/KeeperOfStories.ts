import { Room, GameEngine } from "../engine";
import { Rooms, Events, Items } from "../game-state";


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
            engine.write_line("You approach the man. He is dressed in a old fashioned waistcoat and carrying a pocket watch that never seems to tick");
        }
        if (engine.event_occurred(Events.KeeperOfStories_ask_help)) {
            this.tell_tale(engine);
        }

        await engine.prompt_options(engine.event_occurred(Events.KeeperOfStories_ask_name) ? "Ask Elias a question" : "Ask him a question?", [
            !engine.event_occurred(Events.KeeperOfStories_ask_name) && {
                optionDescription: "Ask him what his name is?", action: async () => {
                    engine.write_line("You: Hi, I'm lost. What's your name?");
                    engine.write_line("Elias Thorne: Good Day Sir, I am Elias Throne");
                    engine.set_event_occurred(Events.KeeperOfStories_ask_name);
                    this.visit(engine, Rooms.KeeperOfStories);
                }
            },
            engine.event_occurred(Events.KeeperOfStories_ask_name) && 
            !engine.event_occurred(Events.KeeperOfStories_ask_help) && {
                optionDescription: "Ask Elias if he can help you?", action: async () => {
                    engine.write_line("You: Hi Elias, Can you please help me find my way home?\r\n");
                    engine.write_line("Elias Thorne: That really depends on what you need help with Sir, I have had the role bestowed upon me of the keeper of stories.");
                    engine.set_event_occurred(Events.KeeperOfStories_ask_help);
                    this.visit(engine, Rooms.KeeperOfStories);
                }
            },
            {
                optionDescription: "Return to Entrance Hall", action: async () => { engine.move_to_room(Rooms.entrance); }
            }
        ]);
    }

    tell_tale(engine: GameEngine) {
        if (!engine.event_occurred(Events.pennyInTheFountain)) {
            engine.write_line("\r\nElias leans in, his voice barely more than a whisper, as if the air itself conspires to keep his words hidden. \r\n");
            engine.write_line("Elias Thorn: Once, long ago, a traveler passed through this manor. A woman with tired eyes and a silver coin in her palm. She spoke to the fountain, though none could hear her words. \r\n\
plea, a bargain, a hope—who can say? But when the coin left her fingers and kissed the water's surface, something changed. The doors that had been shut for centuries groaned, as if stirred from sleep. \r\n\
The whispers in the halls softened, listening rather than calling. And the shadow beyond the library... well, let’s say it took a step back, just for a while.\r\n\r\n\
He pauses, inspecting you with quiet curiosity. \r\n \r\n\
Elias Thorn: Of course, such things are mere stories. But if you ever find yourself lost, uncertain of the way, and the weight in your pocket feels just heavy enough... well, what harm is there in a small gesture?");
        }else if (!engine.has_visited_room(Rooms.cave)){
            engine.write_line("\r\nHis lips curl into something resembling a smile, though it never quite reaches his eyes..\r\n\r\n\
Elias Thorn: they never think to look up. People wander these halls, searching the floors, pressing against the walls. But the secret isn’t in the stone—it’s in the beast. \r\n\r\n\
He gestures vaguely toward the manor’s aging decor, his fingers tracing unseen shapes in the air.\r\n\r\n\
Elias Thorn: There was once a hunter, a man who called the woods his home. He carved a path through the wild, but the wild never forgives. The antlers he carried were not trophies, not prizes, but burdens.\r\n\
A reminder of a promise made in whispers and broken in silence.\r\n")
        }else if (!engine.event_occurred(Events.opened_chest)){
            engine.write_line("He narrows his eyes, his fingers absently tracing the edges of his pocket watch.\r\n\r\n\
Elias Thorn: There was once a man who understood the trees, knew their hunger, their patience. He carried a sword, not for battle, but for truth. \r\n\
And when his time came to lay it down, he did not bury it in the earth, nor lock it behind doors of stone. No… he gave it to the wood one last time. \r\n\
A chest, carved from the same restless roots that once sought to claim him. A quiet prison for an instrument of defiance..\r\n\r\n\
His gaze drifts toward the darkened corners of the manor.\r\n\r\n\
If you listen, truly listen, you might hear it—faint, buried beneath the years. The whisper of steel longing for a hand to wield it again. But the question is… do you have the courage to open the past?\r\n")
        }        
        else if (!engine.event_occurred(Events.defeat_wolves) && engine.event_occurred(Events.opened_chest)){
            engine.write_line("\r\nHe lets out a slow breath, his gaze drifting towards the books that surround the room.\r\n\r\n\
Elias Thorn: The woods were never meant for wandering. Not at night, not alone. There are shapes in the shadows, figures just beyond sight, but it is the trees you should fear the most. \r\n\r\n\
He closes his pocket watch, the click sounding sharper than it should. \r\n\r\n\
Elias Thorn: Long ago, a man ventured into the heart of the forest. He spoke of movement—branches twisting against the wind, hollow whispers threading through the bark. The deeper he went, the more the trees watched him, their knots shifting like lidless eyes. But he carried a sword, and that was his salvation. Steel is truth, steel is clarity. The moment his blade touched wood, the forest recoiled.\r\n\r\n\
He leans back, folding his hands.\r\n\r\n\
Elias Thorn: No axe, no fire, no voice will stop them. Only a sword can silence the gaze. But tell me—when was the last time you saw a blade in this manor?\r\n")
        }
    }

    async use_item(engine: GameEngine, item: Items): Promise<void> {
        engine.write_line("No use for this item here");
    }

}
