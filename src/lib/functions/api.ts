import {
  EventService,
  TagService,
  UserService,
} from "@/gen/evops/api/v1/api_pb";
import { Client, createClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";

export interface Api {
  eventService: Client<typeof EventService>;
  tagService: Client<typeof TagService>;
  userService: Client<typeof UserService>;
}

export default function getApi(): Api {
  const grpcWebTransport = createGrpcWebTransport({
    baseUrl: process.env.publicApi!,
    // baseUrl: "http://backend:8080",
  });

  const eventService = createClient(EventService, grpcWebTransport);
  const tagService = createClient(TagService, grpcWebTransport);
  const userService = createClient(UserService, grpcWebTransport);

  return { eventService, tagService, userService };
}
