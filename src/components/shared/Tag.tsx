import { useSearchStore } from '@/lib/stores/searchStore'
import { useNavigate } from '@tanstack/react-router'
import clsx from 'clsx'

export type TagColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'gray'

export interface TagProps {
  id: string
  name: string
  color?: TagColor
  aliases: string[]
}

export default function Tag(props: TagProps) {
  const navigate = useNavigate()
  const { setTagFilter } = useSearchStore()

  const handleTagClick = () => {
    setTagFilter([props.id], props.name)
    navigate({ to: '/events' })
  }

  return (
    <button
      onClick={handleTagClick}
      className={clsx([
        'btn btn-sm lg:btn-lg border-0 shadow-none active:text-white',
        props.color == 'red' &&
          'bg-red-400/10 text-red-400 hover:bg-red-400/25 active:bg-red-400/75',
        props.color == 'orange' &&
          'bg-orange-400/10 text-orange-400 hover:bg-orange-400/25 active:bg-orange-400/75',
        props.color == 'yellow' &&
          'bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/25 active:bg-yellow-400/75',
        props.color == 'green' &&
          'bg-green-400/10 text-green-400 hover:bg-green-400/25 active:bg-green-400/75',
        props.color == 'cyan' &&
          'bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400/25 active:bg-cyan-400/75',
        props.color == 'blue' &&
          'bg-blue-400/10 text-blue-400 hover:bg-blue-400/25 active:bg-blue-400/75',
        props.color == 'purple' &&
          'bg-purple-400/10 text-purple-400 hover:bg-purple-400/25 active:bg-purple-400/75',
        props.color == 'pink' &&
          'bg-pink-400/10 text-pink-400 hover:bg-pink-400/25 active:bg-pink-400/75',
        props.color == 'gray' &&
          'bg-gray-400/10 text-gray-400 hover:bg-gray-400/25 active:bg-gray-400/75',
      ])}
    >
      {props.name}
    </button>
  )
}
