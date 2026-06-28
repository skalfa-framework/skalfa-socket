import { io } from "./state";

export function room(roomName: string) {
  return {
    emit(event: string, payload?: any) {
      io?.to(roomName).emit(event, payload);
    },
  };
}
