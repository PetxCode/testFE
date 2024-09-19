import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:1122"; // Update with your server address

const useSocket = () => {
  const [socket, setSocket] = useState<typeof Socket | null>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  return socket;
};

export default useSocket;
