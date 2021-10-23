export interface Player {
  id: string
  name: string
  created_at: string
}

export interface Count {
  players_aggregate: {
    aggregate: {
      count: number
    }
  }
}
