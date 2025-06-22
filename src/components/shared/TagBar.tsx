interface TagBarProps {
  tags: string[];
}

export default function TagBar({ tags }: TagBarProps) {
  return (
    <div className="scroll-hide flex w-full flex-row items-center gap-3 overflow-x-auto overflow-y-hidden px-3">
      {tags.map((tag, index) => (
        <button key={index} className="evops-tag evops-predef">
          {tag}
        </button>
      ))}
    </div>
  );
}
