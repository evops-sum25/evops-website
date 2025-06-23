import test from "@/../public/test.png";
import Tag, { type TagColor } from "@/components/shared/Tag";
import Image from "next/image";

export default function EventFeed() {
  const tagData: { name: string; color: TagColor }[] = [
    { name: "study", color: "blue" },
    { name: "bdsm", color: "red" },
    { name: "b23", color: "yellow" },
    { name: "official", color: "green" },
    { name: "games", color: "purple" },
    { name: "food", color: "orange" },
  ];

  return (
    <main className="flex h-screen w-screen flex-col items-center">
      <div className="w-120 max-w-full">
        <Image src={test} alt="event" className="w-full" />
        <div className="flex flex-row flex-wrap gap-2 p-2">
          {tagData.map(({ name, color }, i) => (
            <Tag key={i} name={name} color={color} />
          ))}
        </div>
      </div>
    </main>
  );
}
