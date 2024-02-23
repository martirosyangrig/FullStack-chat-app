import { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000/");

export { socket };
export const useSocket = (eventName: string, callback: (data: any) => void) => {
  useEffect(() => {
    const eventListener = (data: any) => {
      callback(data);
    };

    socket.on(eventName, eventListener);

    return () => {
      socket.off(eventName, eventListener);
    };
  }, [eventName, callback]);
};

const emit = (eventName: string, data: any) => {
  socket.emit(eventName, data);
};

export default emit;
