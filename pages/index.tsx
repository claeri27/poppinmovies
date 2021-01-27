import React, { FC } from 'react'
import Head from 'next/head'
import { useAtom } from 'jotai'
import { GetStaticProps } from 'next'
import { Box } from '@chakra-ui/react'
import { QueryClient, useQuery } from 'react-query'
import { DehydratedState, dehydrate } from 'react-query/hydration'
import { getConfig, getMovies } from '@/queries'
import { filterAtom, pageAtom } from '@/atoms'
import AppBar from '@/components/AppBar'
import MovieGrid from '@/components/MovieGrid'

interface HomeProps {
  dehydratedState: DehydratedState
}

const Home: FC<HomeProps> = () => {
  const [page] = useAtom(pageAtom)
  const [filter] = useAtom(filterAtom)

  const { data, isFetching, isPreviousData } = useQuery(['movies', { page, filter }], getMovies, {
    keepPreviousData: true,
  })

  return (
    <Box>
      <Head>
        <title>PoppinMovies</title>
      </Head>
      <AppBar {...{ isPreviousData }} />
      <MovieGrid {...{ data, isFetching, isPreviousData }} />
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  for (let i = 1; i <= 5; i++) {
    await queryClient.prefetchQuery(['movies', { page: i, filter: 'popular' }], getMovies)
    await queryClient.prefetchQuery(['movies', { page: i, filter: 'top_rated' }], getMovies)
    await queryClient.prefetchQuery(['movies', { page: i, filter: 'now_playing' }], getMovies)
  }
  await queryClient.prefetchQuery('config', getConfig)
  return { props: { dehydratedState: dehydrate(queryClient) } }
}

export default Home
