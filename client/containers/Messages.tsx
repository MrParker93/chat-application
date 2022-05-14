import { useRef } from "react";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";

function MessagesContainer() {

    const {socket, messages, roomID, username, setMessages} = useSockets();
    const newMessageRef = useRef(null);

    function handleSendMessage() {
        const message = newMessageRef.current.value;

        if (!String(message).trim()) return;

        socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomID, message, username });

        const date = new Date();

        setMessages([
            ...messages, {
                username: "You",
                message,
                time: `${date.getHours()}:${date.getMinutes()}`,
            },
        ]);
        
        newMessageRef.current.value = "";
    };

    if (!roomID) return <div />;
    
    return (
        <div>
            {messages.map(({message}, index) => {
                return <p key={index}>{message}</p>;
            })}
            <div>
                <textarea 
                placeholder="Tell us what you are thinking"
                rows={1}
                ref={newMessageRef}
                />
                <button onClick={handleSendMessage}>SEND</button>
            </div>
        </div>
    );
};

export default MessagesContainer;