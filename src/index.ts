import { registry } from "@skalfa/skalfa-api-core";
import { EventRegistry } from "./event-registry";
import { start } from "./start";
import { emit } from "./emit";
import { send } from "./send";
import { join } from "./join";
import { leave } from "./leave";
import { room } from "./room";
import { of } from "./of";
import { disconnect } from "./disconnect";
import { shutdown } from "./shutdown";

export { EventRegistry };

export const socket = {
  // ===============================
  // ## socket: start server
  // ===============================
  start,

  // ===============================
  // ## socket: event register
  // ===============================
  event: new EventRegistry(),

  // ===============================
  // ## socket: emit
  // ===============================
  emit,

  // ===============================
  // ## socket: emit specific client
  // ===============================
  send,

  // ===============================
  // ## socket: join room
  // ===============================
  join,

  // ===============================
  // ## socket: leave
  // ===============================
  leave,

  // ===============================
  // ## socket: room
  // ===============================
  room,

  // ===============================
  // ## socket: namespace
  // ===============================
  of,

  // ===============================
  // ## socket: disconnect
  // ===============================
  disconnect,

  // ===============================
  // ## socket: shutdown server
  // ===============================
  shutdown,
};

registry.register("socket", socket);
