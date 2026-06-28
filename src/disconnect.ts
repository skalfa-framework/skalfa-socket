import { Socket } from "socket.io";

export function disconnect(client: Socket, reason?: string) {
  if (reason) {
    client.emit("force-disconnect", { reason });
  }
  client.disconnect(true);
}
