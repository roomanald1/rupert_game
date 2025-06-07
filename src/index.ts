
import { GameEngine } from './engine';
import { GameState, Rooms } from './game-state';
import { rooms } from './rooms/rooms';
import { UserInterface } from './user-interface';

const user_interface = new UserInterface();
const state= new GameState();
const engine = new GameEngine(state, user_interface, rooms)

engine.start(Rooms.entrance);