/* eslint-disable @next/next/no-img-element */
import TagBar from "@/components/shared/TagBar";
import getApi from "@/lib/functions/api";
import { streamToU8A } from "@/lib/functions/image";
import Link from "next/link";
// import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Home() {
  const api = getApi();
  const response = await api.eventService.list({});

  const images: string[] = await Promise.all(
    response.events.map(async (e) => {
      const imageId = String(e.imageIds?.[0]);
      const imageStream = await api.eventService.findImage({ imageId });
      const image = await streamToU8A(imageStream);
      const base64 = Buffer.from(image).toString("base64");
      return `data:image/webp;base64,${base64}`;
    }),
  );

  return (
    <main className="main-layout w-screen overflow-x-hidden px-4 lg:px-80">
      {response.events.map((event, idx) => {
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
                <h1 className="text-base-content ml-4 w-full text-2xl font-bold lg:mb-3 lg:text-center lg:text-3xl">
                  {event.title}
                </h1>
                <figure className="relative aspect-square max-h-120 w-full rounded-md">
                  <img
                    src={images[idx]}
                    alt="Event thumbnail"
                    className="z-10 h-auto max-h-full w-auto max-w-full rounded-md"
                  />
                  <img
                    src={images[idx]}
                    alt="Event thumbnail"
                    className="absolute size-full object-fill blur-3xl"
                  />
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
