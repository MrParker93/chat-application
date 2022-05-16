import { useEffect, useRef } from "react";
import EVENTS from "../config/events";
import styles from "../styles/Messages.module.css";
import { useSockets } from "../context/socket.context";

function MessagesContainer() {

    const {socket, messages, roomID, username, setMessages} = useSockets();
    const newMessageRef = useRef(null);
    const messageEndRef = useRef(null);

    function handleSendMessage() {
        const message = newMessageRef.current.value;

        if (!String(message).trim()) return;

        socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomID, message, username });

        const date = new Date();

        setMessages([
            ...messages, {
                username: "You",
                message,
                time: `${date.getHours()}:${date.getMinutes()} ${date.getHours() < 13 ? "AM" : "PM"}`,
            },
        ]);
        
        newMessageRef.current.value = "";
    };

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth"});
    }, [messages]);
    
    if (!roomID) return <div />;
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.messageList}>
                {messages.map(({message, username, time}, index) => {
                    return <div key={index} className={styles.message}>
                                <div key={index} className={styles.messageInner}>
                                    <span className={styles.messageSender}>{username} -- {time} </span>
                                    <span className={styles.messageBody}>{message}</span>
                                </div>
                            </div>
                })}
                <div ref={messageEndRef} />
                <div className={styles.messageBox}>
                    <textarea 
                    placeholder="Tell us what you are thinking"
                    rows={1}
                    ref={newMessageRef}
                    />
                    <button onClick={handleSendMessage}>SEND</button>
                </div>
            </div>
        </div>
    );
};

export default MessagesContainer;