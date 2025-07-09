import {
  EventService,
  TagService,
  UserService,
} from "@/gen/evops/api/v1/api_pb";
import { Client, createClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";

export interface Api {
  url: URL;
  eventService: Client<typeof EventService>;
  tagService: Client<typeof TagService>;
  userService: Client<typeof UserService>;
}

export default function getApi(): Api {
  const url = new URL(process.env.publicApi!);
  // const url = new URL("http://backend:8080");
  const grpcWebTransport = createGrpcWebTransport({ baseUrl: url.toString() });

  const eventService = createClient(EventService, grpcWebTransport);
  const tagService = createClient(TagService, grpcWebTransport);
  const userService = createClient(UserService, grpcWebTransport);

  return { url, eventService, tagService, userService };
}
