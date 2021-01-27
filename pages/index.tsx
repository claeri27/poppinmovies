import React, { FC, useState } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { Box } from '@chakra-ui/react'
import { QueryClient, useQuery } from 'react-query'
import { DehydratedState, dehydrate } from 'react-query/hydration'
import { getConfig, getMovies } from '@/queries'
import AppBar from '@/components/AppBar'
import MovieGrid from '@/components/MovieGrid'

interface HomeProps {
  dehydratedState: DehydratedState
}

const Home: FC<HomeProps> = () => {
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState<'popular' | 'top_rated' | 'now_playing'>('popular')

  const { data, isFetching } = useQuery(['movies', { page, filter }], getMovies)

  return (
    <Box>
      <Head>
        <title>PoppinMovies</title>
      </Head>
      <AppBar setPage={setPage} setFilter={setFilter} />
      <MovieGrid data={data} isFetching={isFetching} />
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['movies', { page: 1, filter: 'popular' }], getMovies)
  await queryClient.prefetchQuery('config', getConfig)
  return { props: { dehydratedState: dehydrate(queryClient) } }
}

export default Home
