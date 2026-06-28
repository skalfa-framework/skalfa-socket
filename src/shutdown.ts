import { logger } from "@skalfa/skalfa-api-core";
import { io, setIo } from "./state";

export function shutdown() {
  if (!io) return;
  io.close();
  setIo(null);
  logger.socket("WS shutdown complete");
}
