import { Server, Socket } from "socket.io";
import logger from ".//utils/logger";
import { nanoid } from "nanoid";

const EVENTS = {
    connection: "connection",
    CLIENT: {
        CREATE_ROOM: "CREATE_ROOM",
    },
    SERVER: {
        ROOMS: "ROOMS",
        JOINED_ROOM: "JOINED ROOM",
    }
};

const rooms: Record<string, { name: string }> = {};

function socket({ io }: {io: Server}) {
    logger.info(`Sockets enabled`);

    io.on(EVENTS.connection, (socket: Socket) => {
        logger.info(`User connected ${socket.id}`);

        socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
            console.log({ roomName });
            const roomID = nanoid();
            
            rooms[roomID] = {
                name: roomName
            };

            socket.join(roomID);

            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

            socket.emit(EVENTS.SERVER.ROOMS, rooms);
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomID);
        });
    });
};

export default socket;