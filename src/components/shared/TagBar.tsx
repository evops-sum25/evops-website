"use client";
import Tag, { TagProps } from "@/components/shared/Tag";

export interface TagBarProps {
  tags: TagProps[];
}

export default function TagBar(props: TagBarProps) {
  return (
    <div className="scroll-hide flex w-full flex-row items-center gap-3 overflow-x-auto overflow-y-hidden">
      {props.tags.map((tag) => (
        <Tag
          key={tag.id}
          id={tag.id}
          aliases={tag.aliases}
          name={tag.name}
          color={tag.color}
        />
      ))}
    </div>
  );
}
