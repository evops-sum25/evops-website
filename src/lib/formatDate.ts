export function formatDate(dateString: string): { date: string; time: string } {
  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  return { date: formattedDate, time: formattedTime }
}
