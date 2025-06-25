import { TagColor } from "@/components/shared/Tag";
import TagBar from "@/components/shared/TagBar";
import { formatDate } from "@/lib/functions/formatDate";
import { ChevronLeft } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface Event {
  title: string;
  description: string;
  id: string;
  author: { id: string; name: string; profilePictureUrl?: string };
  imageUrls: (string | StaticImageData)[];
  tags: { id: string; name: string; aliases: string[]; color?: TagColor }[];
  withAttendance: boolean;
  createdAt: string;
  modifiedAt: string;
}

export default function EventPage() {
  const event: Event = {
    id: "01979d7b-4416-73b2-9c4b-7f91a267dfc8",
    author: {
      id: "01979d7b-424d-7f92-a5ad-8aed8a065255",
      name: "Ilya-Linh Nguen",
    },
    imageUrls: [],
    title: "Valorant Training",
    description:
      "Come if you want to become a candidate for master of sport! Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
    tags: [
      {
        id: "01979d7b-43c7-7781-82ab-620976261950",
        name: "games",
        color: "cyan",
        aliases: ["videogames", "esports", "cybersport"],
      },
      {
        id: "01979d7b-43c7-7781-82ab-620976261959",
        name: "games",
        color: "red",
        aliases: ["videogames", "esports", "cybersport"],
      },
      {
        id: "01979d7b-43c7-7781-82ab-620976261958",
        name: "games",
        color: "purple",
        aliases: ["videogames", "esports", "cybersport"],
      },
    ],
    withAttendance: true,
    createdAt: "2025-06-23T15:49:50.742836Z",
    modifiedAt: "2025-06-23T15:49:50.742836Z",
  };

  const { date, time } = formatDate(event.createdAt);

  return (
    <>
      <nav>
        <Link href="../" className="btn btn-ghost btn-circle">
          <ChevronLeft />
        </Link>
      </nav>

      <main className="flex w-screen flex-col items-center">
        <div className="flex w-192 max-w-full flex-col gap-2">
          <div className="flex flex-col gap-2 px-2">
            <span className="text-base-content/50">{event.author.name}</span>
            <h2 className="text-4xl font-bold">{event.title}</h2>
          </div>

          <div className="relative flex flex-col items-center">
            <figure className="carousel aspect-square max-h-120 w-full rounded-md">
              {event.imageUrls.map((src, i) => (
                <div
                  key={i}
                  className="carousel-item relative flex size-full flex-row justify-center"
                  id={`image-${i + 1}`}
                >
                  <Image
                    src={src}
                    alt="Event thumbnail"
                    className="z-10 h-auto max-h-full w-auto max-w-full rounded-md"
                  />
                  <Image
                    src={src}
                    alt="Event thumbnail"
                    className="absolute size-full object-fill blur-3xl"
                  />
                </div>
              ))}
            </figure>
            <div className="bg-neutral/50 text-neutral-content absolute bottom-2 z-20 flex flex-row rounded-full">
              {event.imageUrls.map((_, i) => (
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

          <div className="flex flex-col items-start gap-3 px-3">
            <TagBar tags={event.tags} />

            <article className="text-base-content w-full text-start">
              {event.description}
            </article>
            <div className="flex w-full flex-row items-center justify-end">
              <span className="text-end text-xs">
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
