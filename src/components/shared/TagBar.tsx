import Tag from "@/components/shared/Tag";

export interface TagBarProps {
  tags: string[];
}

export default function TagBar(props: TagBarProps) {
  return (
    <div className="scroll-hide flex w-full flex-row items-center gap-3 overflow-x-auto overflow-y-hidden px-3">
      {props.tags.map((tag, i) => (
        <Tag key={i} name={tag} color="blue" />
      ))}
    </div>
  );
}
