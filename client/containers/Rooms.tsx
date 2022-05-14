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

    function handleJoinRoom(key) {
        if (key === roomID) return;

        socket.emit(EVENTS.CLIENT.JOIN_ROOM, key)
    }
    return (
        <nav>
            <div>
                <input ref={newRoomRef} placeholder="Room Name" />
                <button onClick={handleCreateRoom}>CREATE ROOM</button>
            </div>
            {Object.keys(rooms).map((key) => {
                return (
                    <div key={key}>
                        <button 
                        disabled={key === roomID}
                        title={`Join ${rooms[key].name}`}
                        onClick={() => handleJoinRoom(key)}>
                            {rooms[key].name}
                        </button>
                    </div>
                );
            })}

        </nav>
    );
};

export default RoomsContainer;