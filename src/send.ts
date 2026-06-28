import { Socket } from "socket.io";

export function send(client: Socket, event: string, payload?: any) {
  client.emit(event, payload);
}
