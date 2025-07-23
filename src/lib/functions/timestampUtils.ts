import { Timestamp } from '@/gen/evops/api/v1/api_pb'

/**
 * Конвертирует Timestamp из Protobuf в JavaScript Date
 */
export function timestampToDate(timestamp: Timestamp | undefined): Date | null {
  if (!timestamp) return null

  try {
    // Если timestamp это строка (ISO format)
    if (typeof timestamp === 'string') {
      return new Date(timestamp)
    }

    // Если это объект Timestamp с полями seconds и nanos
    if (typeof timestamp === 'object' && timestamp !== null) {
      const ts = timestamp as any
      if (ts.seconds !== undefined) {
        return new Date(
          Number(ts.seconds) * 1000 + Number(ts.nanos || 0) / 1000000,
        )
      }

      // Попробуем преобразовать в строку
      const dateString = ts.toString()
      if (dateString && dateString !== '[object Object]') {
        return new Date(dateString)
      }
    }

    return null
  } catch (error) {
    console.error('Error converting timestamp:', error)
    return null
  }
}

/**
 * Форматирует дату для отображения в EventMeta компоненте
 */
export function formatDateForEventMeta(timestamp: Timestamp | undefined): {
  place: string
  date: string
  time: string
} {
  const date = timestampToDate(timestamp)

  if (!date || isNaN(date.getTime())) {
    return {
      place: 'Создано',
      date: 'Неизвестная дата',
      time: '--:--',
    }
  }

  const formattedDate = date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  const formattedTime = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return {
    place: 'Создано',
    date: formattedDate,
    time: formattedTime,
  }
}

/**
 * Простое форматирование даты для отображения
 */
export function formatTimestampSimple(
  timestamp: Timestamp | undefined,
): string {
  const date = timestampToDate(timestamp)

  if (!date || isNaN(date.getTime())) {
    return 'Неизвестная дата'
  }

  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
