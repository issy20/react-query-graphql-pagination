import request, { gql } from 'graphql-request'
import { useQuery } from 'react-query'
import { GET_PLAYERS } from '../queries/queries'
import { Player } from '../types/types'

interface PlayerRes {
  players: Player[]
}

// offsetは何件目から取得するかを指定します。デフォルト値は0です。
// limitは取得件数を指定します。デフォルト値は10です。

export const fetchPlayers = async () => {
  const { players: data } = await request<PlayerRes>(
    process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
    GET_PLAYERS
    // gql`
    //   query GetPlayers($limit: Int = ${limit}, $offset: Int = ${offset}) {
    //     players(limit: $limit, offset: $offset) {
    //       id
    //       name
    //     }
    //   }
    // `
  )
  return data
}

export const useQueryPlayers = () => {
  return useQuery<Player[], Error>({
    queryKey: 'players',
    queryFn: fetchPlayers,
    staleTime: 300000,
  })
}
