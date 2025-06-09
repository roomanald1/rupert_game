import { Room } from "../engine";
import { Rooms } from "../game-state";
import { Cave } from "./cave";
import { Entrance } from "./entrance";
import { Garden } from "./garden";
import { Library } from "./library";
import { RoseGarden } from "./rose_garden";
import { Woods } from "./woods";

export const rooms = new Map<Rooms, Room>([
    [Rooms.entrance, new Entrance()],
    [Rooms.cave, new Cave()],
    [Rooms.garden, new Garden()],
    [Rooms.rose_garden, new RoseGarden()],
    [Rooms.woods, new Woods()],
    [Rooms.library, new Library()],
]
);