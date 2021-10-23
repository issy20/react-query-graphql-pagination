import request, { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'

import { VFC } from 'react'
import { dehydrate, QueryClient, useQuery, useQueryClient } from 'react-query'
import { Layout } from '../../../components/Layout'
import { Pagination } from '../../../components/Pagination'
import { fetchData } from '../../../hooks/useQueryPage'
// import { fetchData } from '../../../hooks/useQueryPage'

import { GET_PLAYERS_AGGREGAETE } from '../../../queries/queries'
import { Count, Player } from '../../../types/types'

interface PlayerRes {
  players: Player[]
}

interface Props {
  id: number
}

const totalCount = 25

const PlayerPage: VFC = () => {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<Player[]>('data')
  console.log(data)
  return (
    <Layout>
      <ul>
        {/* @ts-ignore */}
        {data?.data.map((player) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
      <Pagination totalCount={totalCount} />
    </Layout>
  )
}

export default PlayerPage

// 動的なページ作成
export const getStaticPaths: GetStaticPaths = async () => {
  const limit = 3
  const res = await request(
    process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
    GET_PLAYERS_AGGREGAETE
  )
  const totalCount: number = res.players_aggregate.aggregate.count
  console.log(totalCount)
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i)
  const paths = range(1, Math.ceil(totalCount / limit)).map(
    (i) => `/player/page/${i}`
  )
  return {
    paths,
    fallback: false,
  }
}

// データ取得
export const getStaticProps: GetStaticProps = async (context) => {
  const id = Number(context.params.id)
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('data', () => fetchData(id))
  return {
    props: {
      dehydrateState: dehydrate(queryClient),
    },
    revalidate: 3,
  }
}

// const { players: data } = await request<PlayerRes>(
//   process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
//   gql`
//     query GetPlayers($limit: Int = ${limit}, $offset: Int = ${offset}) {
//       players(limit: $limit, offset: $offset) {
//         id
//         name
//       }
//     }
//   `
// )
