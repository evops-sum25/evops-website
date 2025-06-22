import test from "@/../public/test.png";
import Tag from "@/components/shared/Tag";
import Image from "next/image";
import { type ReactElement } from "react";

export default function EventFeed(): ReactElement {
  const tagData = [
    { name: "study", color: "orange" },
    { name: "study", color: "green" },
    { name: "study", color: "green" },
    { name: "study", color: "green" },
    { name: "study", color: "green" },
    { name: "study", color: "green" },
    { name: "study", color: "green" },
    { name: "study", color: "green" },
    { name: "study", color: "green" },
    { name: "study", color: "green" },
    { name: "study", color: "green" },
    { name: "study", color: "green" },
    { name: "study", color: "green" },
    { name: "study", color: "green" },
    { name: "study", color: "green" },
    { name: "study", color: "green" },
    { name: "study", color: "green" },
  ];

  return (
    <main className="flex w-full max-w-full flex-col">
      <Image src={test} alt="event" className="w-full" />
      <div className="flex flex-row gap-2 overflow-auto p-2">
        {tagData.map(({ name, color }) => (
          <Tag name={name} color={color} />
        ))}
      </div>
    </main>
  );
}
