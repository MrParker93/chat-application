import { createContext, useContext, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/default';

interface Context {
    socket: Socket;
    username?: string;
    setUsername: Function;
    roomID?: string;
    rooms: object;
};

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({
    socket,
    setUsername: () => false,
    rooms: {}, 
});

function SocketsProvider(props: any) {

const [username, setUsername] = useState("");
const [roomID, setRoomID] = useState("");
const [rooms, setRooms] = useState([]);

    return (
        <SocketContext.Provider
            value={{ socket, username, setUsername, roomID, rooms }}
            {...props}
        />
    );
};

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;