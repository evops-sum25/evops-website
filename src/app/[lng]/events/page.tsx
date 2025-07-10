/* eslint-disable @next/next/no-img-element */
import TagBar from "@/components/shared/TagBar";
import { Event } from "@/gen/evops/api/v1/api_pb";
import getApi from "@/lib/api/api";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const api = getApi();
  const response = await api.eventService.list({});

  return (
    <main className="main-layout w-screen overflow-x-hidden px-4 lg:px-80">
      {response.events.map((event: Event) => {
        return (
          <section
            key={event.id}
            className="card my-4 flex w-full flex-col items-center space-y-2"
          >
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="w-full"
              style={{ textDecoration: "none" }}
            >
              <div className="w-full">
                <h1 className="text-base-content clamping mb-3 ml-4 w-full text-2xl font-bold lg:mb-3 lg:text-center lg:text-3xl">
                  {event.title}
                </h1>
                <figure className="relative aspect-square max-h-120 w-full rounded-md">
                  {event.imageIds && event.imageIds.length > 0 ? (
                    <>
                      <img
                        src={new URL(
                          `/v1/events/images/${event.imageIds[0]}`,
                          api.url,
                        ).toString()}
                        className="z-10 h-auto max-h-full max-w-full rounded-md"
                        alt="Event thumbnail"
                      />
                      <img
                        src={new URL(
                          `/v1/events/images/${event.imageIds[0]}`,
                          api.url,
                        ).toString()}
                        alt="Event thumbnail"
                        className="absolute size-full object-fill blur-3xl"
                      />
                    </>
                  ) : (
                    <div className="bg-base-300 flex h-full w-full items-center justify-center rounded-md">
                      <span className="text-base-content/50">No image</span>
                    </div>
                  )}
                </figure>
              </div>
            </Link>
            <div className="flex w-full flex-col items-start gap-3 px-2 lg:items-center lg:justify-center">
              <TagBar tags={event.tags} />
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                style={{ textDecoration: "none" }}
              >
                <article className="text-base-content clamping w-full text-start lg:w-auto lg:text-center lg:text-lg">
                  {event.description}
                </article>
              </Link>
            </div>
          </section>
        );
      })}
    </main>
  );
}
