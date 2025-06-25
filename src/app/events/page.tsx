"use server";

import TagBar from "@/components/shared/TagBar";
import getApi from "@/lib/functions/api";
import Link from "next/link";

export default async function Home() {
  const api = getApi();
  const response = await api.eventService.list({});

  return (
    <main className="flex h-screen w-screen flex-col items-center overflow-x-hidden">
      {response.events.map((event) => (
        <Link
          key={event.id}
          href={`/events/${event.id}`}
          className="w-full"
          style={{ textDecoration: "none" }}
        >
          <section className="card my-4 flex w-full flex-col items-center space-y-2">
            <div className="w-full">
              <h1 className="text-base-content ml-4 w-full text-2xl font-bold">
                {event.title}
              </h1>
              <figure className="carousel aspect-square max-h-120 w-full rounded-md">
                {event.imageUrls.map((src, i) => (
                  <div
                    key={i}
                    className="carousel-item relative flex size-full flex-row justify-center"
                    id={`image-${i + 1}`}
                  >
                    <img
                      src={src}
                      alt="Event thumbnail"
                      className="z-10 h-auto max-h-full w-auto max-w-full rounded-md"
                    />
                    <img
                      src={src}
                      alt="Event thumbnail"
                      className="absolute size-full object-fill blur-3xl"
                    />
                  </div>
                ))}
              </figure>
            </div>
            <div className="flex w-full flex-col items-center gap-3 px-2">
              <TagBar tags={event.tags} />
              <article className="text-base-content clamping w-full text-start">
                {event.description}
              </article>
            </div>
          </section>
        </Link>
      ))}
    </main>
  );
}
