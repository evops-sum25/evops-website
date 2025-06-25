import TagBar from "@/components/shared/TagBar";
import getApi from "@/lib/functions/api";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const api = getApi();
  const response = await api.eventService.list({});

  return (
    <main className="main-layout w-screen overflow-x-hidden px-80">
      {response.events.map((event) => (
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
      ))}
    </main>
  );
}
