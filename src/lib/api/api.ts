import {
  AuthService,
  EventService,
  TagService,
} from '@/gen/evops/api/v1/api_pb'
import { VITE_PUBLIC_API } from '@/lib/constants.ts'
import { Client, createClient } from '@connectrpc/connect'
import { createGrpcWebTransport } from '@connectrpc/connect-web'

export interface Api {
  url: URL
  authService: Client<typeof AuthService>
  eventService: Client<typeof EventService>
  tagService: Client<typeof TagService>
}

export default function getApi(): Api {
  const url = VITE_PUBLIC_API
  const grpcWebTransport = createGrpcWebTransport({ baseUrl: url.toString() })

  const authService = createClient(AuthService, grpcWebTransport)
  const eventService = createClient(EventService, grpcWebTransport)
  const tagService = createClient(TagService, grpcWebTransport)

  return { url, authService, eventService, tagService }
}
