import os from 'os'
import { Server, Socket } from "socket.io";
import { logger } from "@skalfa/skalfa-api-core";
import { io, setIo } from "./state";
import { socket } from "./index";

export function start(port: number) {
  if (io) return io;

  const server = new Server(port, {
    cors: {
      origin: process.env.SOCKET_CORS_ORIGINS || "*",
      credentials: true,
    },
    transports: ["websocket"],
  });

  setIo(server);

  server.use(async (client, next) => {
    try {
      const accessKey = client.handshake.auth?.accessKey || client.handshake.headers["x-api-key"];

      if(process.env.SOCKET_KEY) {
        if (accessKey !== process.env.SOCKET_APP_KEY) {
          return next(new Error("INVALID_SOCKET_KEY"));
        };
      }

      next();
    } catch {
      next(new Error("AUTH_ERROR"));
    }
  });

  server.on("connection", (client: Socket) => {
    logger.socket(`client connected: ${client.id}`);

    socket.event.bind(client);

    client.on("disconnect", (reason) => {
      logger.socket(`client disconnected: ${client.id, reason}`);
    });
  });

  function getLocalIP() {
    const interfaces = os.networkInterfaces()
    for (const name of Object.keys(interfaces)) {
      for (const net of interfaces[name] || []) {
        if (net.family === 'IPv4' && !net.internal) return net.address
      }
    }
  }
  
  setTimeout(() => logger.start(`WS Server running on \n        [LOCAL]    http://localhost:${port} \n        [NETWORK]  http://${getLocalIP()}:${port}!`), 300);
  return server;
}
