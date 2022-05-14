import { useRef } from 'react';
import styles from '../styles/Home.module.css'
import RoomsContainer from '../containers/Rooms';
import { useSockets } from '../context/socket.context';
import MessagesContainer from '../containers/Messages';


export default function Home() {
  const { socket, username, setUsername } = useSockets();
  const usernameRef = useRef(null);

  function handleSetUsername() {
    const value = usernameRef.current.value;
    if (!value) {
      return;
    };

    setUsername(value);

    localStorage.setItem("username", value);
  };

  return (
    <div>
      {!username && (
        <div className={styles.usernameWrapper}>
          <div className={styles.usernameInner}>
            <input placeholder="Username" ref={usernameRef} />
            <button onClick={handleSetUsername}>START</button>
          </div>
        </div>  
      )}
      {username && (
        <div className={styles.container}>
          <RoomsContainer />
          <MessagesContainer />
        </div>
      )}
    </div>
  );
};
