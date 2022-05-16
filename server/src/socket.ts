import { Server, Socket } from "socket.io";
import logger from ".//utils/logger";
import { nanoid } from "nanoid";

const EVENTS = {
    connection: "connection",
    CLIENT: {
        CREATE_ROOM: "CREATE_ROOM",
        SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
        JOIN_ROOM: "JOIN_ROOM",
    },
    SERVER: {
        ROOMS: "ROOMS",
        JOINED_ROOM: "JOINED ROOM",
        ROOM_MESSAGE: "ROOM_MESSAGE",
    }
};


const rooms: Record<string, { name: string }> = {};

function socket({ io }: {io: Server}) {
    logger.info(`Sockets enabled`);

    io.on(EVENTS.connection, (socket: Socket) => {
        logger.info(`User connected ${socket.id}`);

        socket.emit(EVENTS.SERVER.ROOMS, rooms);

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
        
        socket.on(EVENTS.CLIENT.SEND_ROOM_MESSAGE, ({ roomID, message, username}) => {
            const date = new Date();

            socket.to(roomID).emit(EVENTS.SERVER.ROOM_MESSAGE, {
                message,
                username,
                time: `${date.getHours()}:${date.getMinutes()}`,
            });
        });
        
        socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomID) => {
            socket.join(roomID);
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomID);
        });
    });
};

export default socket;