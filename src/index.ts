
import { GameEngine } from './engine';
import { Rooms } from './game-state';
import { rooms } from './rooms/rooms';

const engine = new GameEngine(rooms)

engine.start(Rooms.entrance);