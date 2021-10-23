import { gql } from 'graphql-request'

let limit = 3

export const GET_PLAYERS = gql`
  query GetPlayers($limit: Int = ${limit}) {
    players(limit: $limit) {
      id
      name
    }
  }
`

export const GET_PLAYERS_AGGREGAETE = gql`
  query GetPlayersAggregate {
    players_aggregate {
      aggregate {
        count(columns: id)
      }
    }
  }
`
