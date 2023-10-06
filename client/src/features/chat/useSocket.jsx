import { useState } from "react";
import io from "socket.io-client";
import { useEffect } from "react";

import { API_URL } from "../../utils/Constant"

const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(API_URL, {
            transports: ["websocket"],
        });
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return socket;
};
export default useSocket;