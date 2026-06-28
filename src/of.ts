import { io } from "./state";

export function of(namespace: string) {
  if (!io) return null;
  return io.of(namespace);
}
