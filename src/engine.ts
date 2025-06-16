import figlet from "figlet";
import { Events, GameState, Items, Rooms } from "./game-state";
import { questionOption, QuestionOption, UserInterface } from "./user-interface";
import { green, italic, underline } from "colorette";
import * as fs from 'fs';

export abstract class Room {
    abstract visit(engine: GameEngine, from: Rooms): Promise<void>
    abstract use_item(engine: GameEngine, item: Items): Promise<void>
}


export class GameEngine {

    private state: GameState;
    private user_interface: UserInterface;
    constructor(private rooms: Map<Rooms, Room>) {
        this.user_interface = new UserInterface();
        this.state = new GameState();
    }

    has_visited_room(room_name: Rooms) {
        return this.state.has_visited_room(room_name);
    }

    event_occurred(event: Events): boolean {
        return this.state.event_occurred(event);
    }

    set_event_occurred(event: Events) {
        this.state.set_event_occurred(event);
    }
    async start(init_room: Rooms) {
        this.user_interface.clear()
        this.user_interface.write_line("******************************");
        this.user_interface.write_title("THE MANOR");
        this.user_interface.write_line("******************************");
        this.user_interface.write_line("");
        this.user_interface.write_line("");
        this.user_interface.write_line("You are lost, You have just a penny to your name. You have been walking for days. You find a grand manor in the distance");
        this.user_interface.write_line("On approaching the manor you find the door ajar. You are desperate for help so you walk in to see if anyone is around.");

        await this.user_interface.ask_question("Main Menu", [
            questionOption("Load", async () => {
                this.state = JSON.parse(fs.readFileSync("save.game").toString('utf-8'))
                this.move_to_room(this.state.current_room)
            }),
            questionOption("New", async () =>  this.move_to_room(init_room))
        ])
    }

    async move_to_room(room_name: Rooms) {
        let room = this.rooms.get(room_name);
        if (room) {
            this.user_interface.clear();
            this.user_interface.write_title(room_name);
            room.visit(this, this.current_room);
            this.state.update_rooms_visited(room_name)
        } else {
            throw Error(`Cannot move to room ${room_name} - room not registered`)
        }
    }

    get current_room() {
        return this.state.current_room;
    }

    pick_up_item(item: Items) {
        this.state.add_item(item);
        this.user_interface.write_line("Item Added - " + item)
    }

    remove_item(item: Items) {
        this.state.remove_item(item);
    }

    show_inventory(currentRoom: Rooms) {
        this.clear_screen();
        let items = this.state.list_items();
        this.user_interface.write_title("INVENTORY");
        this.user_interface.write_line(italic("Select an item from the list of collected items to use it in your current room"));
        this.user_interface.ask_question("Use Item?", [
            ...items.map(i => (questionOption( i.toString(),  async () => {
                    let room = this.rooms.get(currentRoom);
                    await room.use_item(this, i);
                    await room.visit(this, this.current_room)
                }
            ))),
            questionOption("Return to " + currentRoom, async () => await this.move_to_room(currentRoom) )
        ])
    }

    prompt(question: string, answer: string){
        return this.user_interface.ask_question_input(question, answer);
    }

    prompt_options(question: string, options: QuestionOption[]) {
        let base_options: QuestionOption[] = [
            {optionDescription: "Seperator", action : async () => {}, type : "seperator"},
            questionOption("View Inventory", async () => { this.show_inventory(this.state.current_room) } ),
            questionOption("Save Game",  async () => { this.save() } )
        ]
        return this.user_interface.ask_question(underline(green(question)), [...options, ...base_options]);
    }
    save() {
        fs.writeFileSync("save.game", JSON.stringify(GameState))
    }

    has_item(item: Items) {
        return this.state.has_item(item);
    }

    write_line(str: string) {
        this.user_interface.write_line(str);
    }

    clear_screen() {
        this.user_interface.clear();
    }

    game_over(msg: string) {
        this.user_interface.write_line(msg);
        this.user_interface.write_line("");
        this.user_interface.write_line("___________________")

        this.user_interface.write_line(figlet.textSync("GAME OVER", "Doom"))
        this.user_interface.write_line("___________________")

        this.user_interface.ask_question("Start again", [
            questionOption("Yes", async () => this.move_to_room(Rooms.entrance)),
            questionOption( "No",  async () => this.user_interface.end() )
        ])
    }
}


