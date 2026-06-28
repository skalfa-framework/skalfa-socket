import { Socket } from "socket.io";

export function join(client: Socket, room: string) {
  client.join(room);
}
