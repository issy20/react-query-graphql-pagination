import { memo, VFC } from 'react'
import { Player } from '../types/types'

interface Props {
  player: Player
}

const PlayerItem: VFC<Props> = ({ player }) => {
  return <li>{player.name}</li>
}

export const PlayerItemMemo = memo(PlayerItem)
