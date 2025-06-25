import test from "@/../public/test.png";
import ArrowControl from "@/components/shared/ArrowControl";
import EventMeta from "@/components/shared/EventMeta";
import ReactionsBar from "@/components/shared/ReactionsBar";
import { TagProps } from "@/components/shared/Tag";
import TagBar from "@/components/shared/TagBar";
import Image from "next/image";

export default function Home() {
  const tags: TagProps[] = [
    {
      id: "01979d7b-43c7-7781-82ab-620976261950",
      name: "BSDM",
      color: "cyan",
      aliases: ["videogames", "esports", "cybersport"],
    },
    {
      id: "01979d7b-43c7-7781-82ab-620976261959",
      name: "okko",
      color: "red",
      aliases: ["videogames", "esports", "cybersport"],
    },
    {
      id: "01979d7b-43c7-7781-82ab-620976261958",
      name: "lupa",
      color: "purple",
      aliases: ["videogames", "esports", "cybersport"],
    },
  ];
  const reactions = [
    {
      emoji: "😀",
      count: 32,
    },
    {
      emoji: "😇",
      count: 52,
    },
    {
      emoji: "🤗",
      count: 2,
    },
    {
      emoji: "🤪",
      count: 32,
    },
  ];

  const description =
    "Lorem ipsum dolor sit amet. Eum error unde qui omnis numquam qui voluptas architecto vel tempore explicabo ut reprehenderit facilis vel voluptas dolor et assumenda nesciunt. Qui quasi dolor est repudiandae voluptatem nam blanditiis aperiam ad quisquam doloribus";
  const timePlace = {
    place: "IU 108",
    date: "01.01.1970",
    time: "18:30",
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center overflow-x-hidden">
      <section className="card my-4 flex w-full flex-col items-center space-y-2">
        <div className="w-full">
          <h1 className="text-base-content ml-4 w-full text-2xl font-bold">
            Probstat Final Preparation
          </h1>
          <figure className="aspect-square max-h-120 w-full rounded-md">
            <Image
              src={test}
              alt="event"
              className="max-h-full max-w-full rounded-md"
            />
          </figure>
        </div>
        <div className="flex flex-col items-center gap-3 px-2">
          <TagBar tags={tags} />
          {/*<div className="flex w-full flex-row items-center justify-around">*/}
          {/*  <ReactionsBar reactions={reactions} />*/}
          {/*  <ArrowControl />*/}
          {/*</div>*/}
          <article className="text-base-content clamping w-full text-start">
            {description}
          </article>
          {/*<EventMeta*/}
          {/*  date={timePlace.date}*/}
          {/*  place={timePlace.place}*/}
          {/*  time={timePlace.time}*/}
          {/*/>*/}
        </div>
      </section>
    </main>
  );
}
