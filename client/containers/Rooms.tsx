import { useRef } from "react";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";

function RoomsContainer() {

    const {socket, roomID, rooms} = useSockets();
    const newRoomRef = useRef(null);

    function handleCreateRoom() {
        const roomName = newRoomRef.current.value || "";

        if (!String(roomName).trim()) return;

        socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName});
        
        newRoomRef.current.value = "";
    }; 
    return (
        <nav>
            <div>
                <input ref={newRoomRef} placeholder="Room Name" />
                <button onClick={handleCreateRoom}>CREATE ROOM</button>
            </div>
        </nav>
    );
};

export default RoomsContainer;