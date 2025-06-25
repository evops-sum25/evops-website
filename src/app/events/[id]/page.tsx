import TagBar from "@/components/shared/TagBar";
import getApi from "@/lib/functions/api";
import { formatDate } from "@/lib/functions/formatDate";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface EventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventPage(props: EventPageProps) {
  const api = getApi();
  const response = await api.eventService.find({
    id: await props.params.then((it) => it.id),
  });

  if (!response.event) {
    return <p>Error</p>;
  }
  const data = new Date(
    Number(response.event?.createdAt?.seconds) * 1000 +
      Math.floor(Number(response.event?.createdAt?.nanos ?? 0) / 1000000),
  ).toISOString();
  const { date, time } = formatDate(data);

  return (
    <>
      <nav>
        <Link href="../" className="btn btn-ghost btn-circle">
          <ChevronLeft />
        </Link>
      </nav>

      <main className="flex w-screen flex-col items-center">
        <div className="flex w-192 max-w-full flex-col gap-2">
          <div className="flex flex-col gap-2 px-2 lg:items-center">
            <span className="text-base-content/50">
              {response.event.author?.name ?? "NO_AUTHOR"}
            </span>
            <h2 className="text-4xl font-bold">{response.event.title}</h2>
          </div>

          <div className="relative flex flex-col items-center">
            <figure className="carousel aspect-square max-h-120 w-full rounded-md">
              {response.event.imageUrls.map((src, i) => (
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
            <div className="bg-neutral/50 text-neutral-content absolute bottom-2 z-20 flex flex-row rounded-full">
              {response.event.imageUrls.map((_, i) => (
                <Link
                  key={i}
                  href={`#image-${i + 1}`}
                  className="btn btn-ghost btn-circle btn-sm"
                >
                  {i + 1}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 px-3 lg:items-center">
            <TagBar tags={response.event.tags} />

            <article className="text-base-content w-full text-start lg:text-center lg:text-lg">
              {response.event.description}
            </article>
            <div className="flex w-full flex-row items-center justify-end">
              <span className="text-end text-xs lg:text-base">
                {date}
                <br />
                {time}
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
