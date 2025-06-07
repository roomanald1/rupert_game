import { Room } from "../engine";
import { Rooms } from "../game-state";
import { Cave } from "./cave";
import { Entrance } from "./entrance";
import { Garden } from "./garden";

export const rooms = new Map<Rooms, Room>([
    [Rooms.entrance, new Entrance()],
    [Rooms.cave, new Cave()],
    [Rooms.garden, new Garden()]
]
);