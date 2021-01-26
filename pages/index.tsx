import React, { FC, useEffect, useState } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { Box } from '@chakra-ui/react'
import { QueryClient, useQuery } from 'react-query'
import { DehydratedState, dehydrate } from 'react-query/hydration'
import { getConfig, getNowPlaying, getPopular, getTopRated } from '@/queries'
import AppBar from '@/components/AppBar'
import MovieGrid from '@/components/MovieGrid'

interface HomeProps {
  dehydratedState: DehydratedState
}

const Home: FC<HomeProps> = () => {
  const [page, setPage] = useState(1)
  const configQuery = useQuery('config', getConfig)
  const popularQuery = useQuery(['popular', page], () => getPopular(page))
  const topRatedQuery = useQuery(['top-rated', page], () => getTopRated(page))
  const nowPlayingQuery = useQuery(['now-playing', page], () => getNowPlaying(page))

  const [view, setView] = useState<'popular' | 'top-rated' | 'now-playing'>('popular')
  const [data, setData] = useState(popularQuery.data)

  useEffect(() => {
    if (view === 'popular') popularQuery.data && setData(popularQuery.data)
    if (view === 'top-rated') topRatedQuery.data && setData(topRatedQuery.data)
    if (view === 'now-playing') nowPlayingQuery.data && setData(nowPlayingQuery.data)
  }, [view, popularQuery.data, topRatedQuery, nowPlayingQuery])

  return (
    <Box>
      <Head>
        <title>PoppinMovies</title>
      </Head>
      <AppBar setPage={setPage} setView={setView} />
      <MovieGrid data={data} configQuery={configQuery} />
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['popular', 1], () => getPopular(1))
  await queryClient.prefetchQuery('config', getConfig)
  return { props: { dehydratedState: dehydrate(queryClient) } }
}

export default Home
