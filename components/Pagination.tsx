import Link from 'next/link'
import { VFC } from 'react'

interface Props {
  totalCount: number
}

export const Pagination: VFC<Props> = ({ totalCount }) => {
  const perPage = 3
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i)

  return (
    <ul className="flex mt-2">
      {range(1, Math.ceil(totalCount / perPage)).map((number, index) => (
        <li key={index}>
          <Link href={`/player/page/${number}`}>
            <a className="p-1 text-indigo-500 hover:bg-indigo-200">{number}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
