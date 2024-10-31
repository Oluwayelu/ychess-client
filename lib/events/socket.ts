import { Socket } from "socket.io-client";
import { User } from "../types";

export const initSocket = (user: User | null, socket: Socket) => {
  socket.on("connect", () => {
    socket.emit("join", "cshj-shsj-shh");
  });
};
