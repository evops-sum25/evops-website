import { timestampToDate } from './timestampUtils'

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

// Новая функция для работы с Timestamp
export function formatTimestamp(timestamp: any): {
  date: string
  time: string
} {
  const date = timestampToDate(timestamp)

  if (!date || isNaN(date.getTime())) {
    return { date: 'Неизвестная дата', time: '--:--' }
  }

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
