import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { dehydrate, QueryClient } from 'react-query'
import { Layout } from '../components/Layout'
import { Pagination } from '../components/Pagination'
import { PlayerItemMemo } from '../components/PlayerItem'
import { fetchPlayers, useQueryPlayers } from '../hooks/useQueryPlayers'

export default function Home() {
  const { status, data } = useQueryPlayers()
  if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>
  return (
    <Layout>
      <p>Player List</p>
      <ul className="mt-4">
        {data?.map((player) => (
          <PlayerItemMemo key={player.id} player={player} />
        ))}
      </ul>
      <Pagination totalCount={25} />
    </Layout>
  )
}
