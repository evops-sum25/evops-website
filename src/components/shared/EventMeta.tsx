export interface EventMetaProps {
  place: string
  date: string
  time: string
}

export default function EventMeta({ place, date, time }: EventMetaProps) {
  return (
    <div className="text-base-content/60 flex flex-row items-center gap-2 text-sm">
      <p>{place}</p>
      <span>|</span>
      <span>{date}</span>
      <span>|</span>
      <span>{time}</span>
    </div>
  )
}
