import test from "@/../public/test.png";
import Tag from "@/components/shared/Tag";
import Image from "next/image";

interface Event {
  title: string;
  description: string;
  id: string;
  author: { id: string; name: string; profilePictureUrl?: string };
  imageUrls: string[];
  tags: { id: string; name: string; aliases: string[] }[];
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
    imageUrls: [test, test],
    title: "Valorant Training",
    description:
      "Come if you want to become a candidate for master of sport! Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
    tags: [
      {
        id: "01979d7b-43c7-7781-82ab-620976261959",
        name: "games",
        aliases: ["videogames", "esports", "cybersport"],
      },
    ],
    withAttendance: true,
    createdAt: "2025-06-23T15:49:50.742836Z",
    modifiedAt: "2025-06-23T15:49:50.742836Z",
  };

  return (
    <main className="flex w-screen flex-col items-center">
      <div className="flex w-192 max-w-full flex-col">
        <h2 className="text-base-content/50">{event.author.name}</h2>
        <h2 className="text-4xl font-bold">{event.title}</h2>

        <div className="flex flex-col items-center">
          <div className="carousel h-120 w-full rounded-md">
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
          </div>

          <div className="flex flex-row gap-2">
            {event.imageUrls.keys().map((i) => (
              <a href={`#image-${i + 1}`}>{i + 1}</a>
            ))}
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-2">
          {event.tags.map(({ name }, i) => (
            <Tag key={i} name={name} color="blue" />
          ))}
        </div>

        <p>{event.description}</p>
      </div>
    </main>
  );
}
