import Image from "next/image";
import test from "@/../public/test.png";
import TagBar from "@/components/shared/TagBar";
import ArrowControl from "@/components/shared/ArrowControl";

export default function Home(): React.ReactNode {
  const tags = ["BDSM", "math", "B23", "study", "math3"];

  return (
    <main className="flex h-screen w-screen flex-col items-center overflow-x-hidden">
      <section className="card flex w-full flex-col items-center space-y-4">
        <div>
          <h1 className="text-base-content ml-4 w-full text-2xl font-bold">
            Probstat Final Preparation
          </h1>
          <figure className="w-full">
            <Image src={test} alt="event" />
          </figure>
        </div>
        <TagBar tags={tags} />
        <div className="flex w-full flex-row items-center justify-around px-2">
          <div className="skeleton min-w-[65vw] rounded-lg bg-gray-300 p-4"></div>
          <ArrowControl />
        </div>
      </section>
    </main>
  );
}
