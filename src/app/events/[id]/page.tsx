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
    imageUrls: [
      "https://img.redbull.com/images/c_crop,x_321,y_0,h_1049,w_787/c_fill,w_450,h_600/q_auto:low,f_auto/redbullcom/2020/4/19/d1jrdrpou7hvstulfozq/red-bull-campus-clutch-valorant-agents-phoenix-jett",
    ],
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
      <div className="w-192 max-w-full">
        <h2 className="text-base-content/50">{event.author.name}</h2>
        <h2 className="text-4xl font-bold">{event.title}</h2>

        <Image src={test} alt="Event thumbnail" className="w-full rounded-md" />
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
