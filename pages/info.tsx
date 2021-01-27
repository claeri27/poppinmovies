import React, { FC, useEffect, useState } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { Box } from '@chakra-ui/react'
import { QueryClient, useQuery } from 'react-query'
import { DehydratedState, dehydrate } from 'react-query/hydration'
import { getConfig, getNowPlaying, getPopular, getTopRated } from '@/queries'
import AppBar from '@/components/AppBar'

interface InfoProps {
  dehydratedState: DehydratedState
}

const Info: FC<InfoProps> = () => {
  const [page, setPage] = useState(1)
  const topRatedQuery = useQuery(['top-rated', page], () => getTopRated(page))
  const nowPlayingQuery = useQuery(['now-playing', page], () => getNowPlaying(page))
  const popularQuery = useQuery(['popular', page], () => getPopular(page))

  const [view, setView] = useState<'popular' | 'top-rated' | 'now-playing'>('popular')

  return (
    <Box>
      <Head>
        <title>PoppinMovies</title>
      </Head>
      <AppBar setPage={setPage} setView={setView} />
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['popular', 1], () => getPopular(1))
  await queryClient.prefetchQuery('config', getConfig)
  return { props: { dehydratedState: dehydrate(queryClient) } }
}

export default Info
