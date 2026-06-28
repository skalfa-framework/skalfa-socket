import { Server } from "socket.io";

export let io: Server | null = null;

export function setIo(server: Server | null) {
  io = server;
}
