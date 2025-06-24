interface EventMetaProps {
  place: string;
  date: string;
  time: string;
}

export default function EventMeta({ place, date, time }: EventMetaProps) {
  const parsedDate = new Date(
    `${date.split(".").reverse().join("-")}T${time.replace(" PM", "").replace(" AM", "")}`,
  );
  const formattedTime = parsedDate.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="text-base-content mt-4 flex flex-row items-center gap-2 font-bold">
      <p>{place}</p>
      <span>|</span>
      <data value={date}>{date}</data>
      <span>|</span>
      <time>{formattedTime}</time>
    </div>
  );
}
