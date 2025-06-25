"use client";
import {
  EventService,
  TagService,
  UserService,
} from "@/gen/evops/api/v1/api_pb";
import { Client, createClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { createContext, ReactNode } from "react";

export interface Api {
  eventService: Client<typeof EventService>;
  tagService: Client<typeof TagService>;
  userService: Client<typeof UserService>;
}

export const ApiContext = createContext<Api>(undefined!);

export default function ApiProvider(props: { children: ReactNode }) {
  const grpcWebTransport = createGrpcWebTransport({
    baseUrl: "http://127.0.0.1:8080",
  });

  const eventService = createClient(EventService, grpcWebTransport);
  const tagService = createClient(TagService, grpcWebTransport);
  const userService = createClient(UserService, grpcWebTransport);

  return (
    <ApiContext.Provider value={{ eventService, tagService, userService }}>
      {props.children}
    </ApiContext.Provider>
  );
}
