import request, { gql } from 'graphql-request'
import { useQuery } from 'react-query'
import { Player } from '../types/types'

interface PlayerRes {
  players: Player[]
}

// export const offset = (a: number) => (a - 1) * 3

export const fetchData = async (id: number) => {
  const offset = (id - 1) * 3
  const { players: data } = await request<PlayerRes>(
    process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
    gql`
        query GetPlayers($limit: Int = 3, $offset: Int = ${offset}) {
          players(limit: $limit, offset: $offset) {
            id
            name
            created_at
          }
        }
      `
  )
  return {
    data,
  }
}
