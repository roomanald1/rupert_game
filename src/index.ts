
import { GameState } from './game-state';
import { entrance_room } from './rooms/entrance';
import { UserInterface } from './user-interface';

const state= new GameState();
const user_interface = new UserInterface();

user_interface.clear()
user_interface.write_line("******************************");
user_interface.write_line("Welcome to the world of 'THE GAME'");
user_interface.write_line("Press any Key to start");
user_interface.write_line("******************************");

user_interface.ask_question("").then(() => entrance_room(state, user_interface))