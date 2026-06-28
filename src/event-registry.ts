import { Socket } from "socket.io";
import { auth } from "@skalfa/skalfa-api-core";

type Handler = (client: Socket, data: any) => void;

export class EventRegistry {
  private events = new Map<string, Handler[]>();
  private authEvents = new Map<string, Handler[]>();

  on(event: string, handler: Handler) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(handler);
  }

  auth() {
    return {
      on: (event: string, handler: Handler) => {
        if (!this.authEvents.has(event)) {
          this.authEvents.set(event, []);
        }
        this.authEvents.get(event)!.push(handler);
      },
    };
  }

  bind(client: Socket) {
    this.events.forEach((handlers, eventName) => {
      client.on(eventName, (data) => {
        handlers.forEach((handler) => handler(client, data));
      });
    });

    this.authEvents.forEach((handlers, eventName) => {
      client.on(eventName, async (data) => {
        const token = data?.accessToken;

        const session = await auth.verifyAccessToken(token);

        if (!session) {
          client.emit("error", {
            event: eventName,
            message: "UNAUTHORIZED_USER",
          });
          return;
        }

        client.data.user = {id: session.user.id, token: session.token};

        handlers.forEach((handler) => handler(client, data));
      });
    });
  }
}
