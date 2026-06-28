import { Socket } from "socket.io";

export function leave(client: Socket, room: string) {
  client.leave(room);
}
