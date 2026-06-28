import { io } from "./state";

export function emit(event: string, payload?: any) {
  io?.emit(event, payload);
}
