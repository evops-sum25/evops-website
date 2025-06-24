import test from "@/../public/test.png";
import ArrowControl from "@/components/shared/ArrowControl";
import EventMeta from "@/components/shared/EventMeta";
import ReactionsBar from "@/components/shared/ReactionsBar";
import TagBar from "@/components/shared/TagBar";
import Image from "next/image";

export default function Home() {
  const tags = ["bdsm", "math", "b23", "study", "math3"];
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

  const article =
    "Lorem ipsum dolor sit amet. Eum error unde qui omnis numquam qui voluptas architecto vel tempore explicabo ut reprehenderit facilis vel voluptas dolor et assumenda nesciunt. Qui quasi dolor est repudiandae voluptatem nam blanditiis aperiam ad quisquam doloribus";
  const timePlace = {
    place: "IU 108",
    date: "01.01.1970",
    time: "18:30",
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center overflow-x-hidden">
      <section className="card my-4 flex w-full flex-col items-center space-y-3">
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
        <TagBar tags={tags} />
        <div className="flex w-full flex-row items-center justify-around px-2">
          <ReactionsBar reactions={reactions} />
          <ArrowControl />
        </div>
        <article className="text-base-content clamping w-full px-2 text-start">
          {article}
        </article>
        <EventMeta
          date={timePlace.date}
          place={timePlace.place}
          time={timePlace.time}
        />
      </section>
    </main>
  );
}
