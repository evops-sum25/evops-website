"use server";
import TagBar from "@/components/shared/TagBar";
import { EventServiceListResponseSchema } from "@/gen/evops/api/v1/api_pb";
import getApi from "@/lib/functions/api";
import { create } from "@bufbuild/protobuf";

export default async function Home() {
  const api = getApi();

  // const tags: TagProps[] = await api.tagService.list({}).then((it) =>
  //   it.tags.map(
  //     (it) =>
  //       ({
  //         id: it.id,
  //         name: it.name,
  //         color: "blue",
  //         aliases: it.aliases,
  //       }) as TagProps,
  //   ),
  // );

  const events = create(EventServiceListResponseSchema, { events: [] });

  // const tags: TagProps[] = [
  //   {
  //     id: "01979d7b-43c7-7781-82ab-620976261950",
  //     name: "BSDM",
  //     color: "cyan",
  //     aliases: ["videogames", "esports", "cybersport"],
  //   },
  //   {
  //     id: "01979d7b-43c7-7781-82ab-620976261959",
  //     name: "okko",
  //     color: "red",
  //     aliases: ["videogames", "esports", "cybersport"],
  //   },
  //   {
  //     id: "01979d7b-43c7-7781-82ab-620976261958",
  //     name: "lupa",
  //     color: "purple",
  //     aliases: ["videogames", "esports", "cybersport"],
  //   },
  // ];

  const description =
    "Lorem ipsum dolor sit amet. Eum error unde qui omnis numquam qui voluptas architecto vel tempore explicabo ut reprehenderit facilis vel voluptas dolor et assumenda nesciunt. Qui quasi dolor est repudiandae voluptatem nam blanditiis aperiam ad quisquam doloribus";

  return (
    <main className="flex h-screen w-screen flex-col items-center overflow-x-hidden">
      <section className="card my-4 flex w-full flex-col items-center space-y-2">
        <div className="w-full">
          <h1 className="text-base-content ml-4 w-full text-2xl font-bold">
            Probstat Final Preparation
          </h1>
          <figure className="aspect-square max-h-120 w-full rounded-md">
            {/* <Image
              src={test}
              alt="event"
              className="max-h-full max-w-full rounded-md"
            /> */}
          </figure>
        </div>
        <div className="flex flex-col items-center gap-3 px-2">
          <TagBar tags={events.events[0].tags} />
          {/*<div className="flex w-full flex-row items-center justify-around">*/}
          {/*  <ReactionsBar reactions={reactions} />*/}
          {/*  <ArrowControl />*/}
          {/*</div>*/}
          <article className="text-base-content clamping w-full text-start">
            {}
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
