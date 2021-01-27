import React, { FC } from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import { Box, Flex, Image } from '@chakra-ui/react'
import { QueryClient, useQuery } from 'react-query'
import { DehydratedState, dehydrate } from 'react-query/hydration'
import { getConfig, getMovieDetails, getMovies } from '@/queries'
import AppBar from '@/components/AppBar'
import { MovieData } from '@/queries/types'

interface InfoProps {
  dehydratedState: DehydratedState
}

const Info: FC<InfoProps> = () => {
  const router = useRouter()
  const { data } = useQuery(['movie_data', router.query.slug], () =>
    getMovieDetails(router.query.slug as string),
  )
  const configQuery = useQuery('config', getConfig)
  const baseUrl = configQuery.data?.images.base_url
  const backdropSize = 'w1280'

  return (
    <Box>
      <Head>
        <title>PoppinMovies</title>
      </Head>
      <AppBar />
      <Flex maxH="90vh" justify="center">
        <Image w="100vw" src={baseUrl + backdropSize + data?.backdrop_path} />
      </Flex>
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params
  const queryClient = new QueryClient()
  queryClient.prefetchQuery(['movie_details', slug], () => getMovieDetails(slug as string))
  await queryClient.prefetchQuery('config', getConfig)
  return { props: { dehydratedState: dehydrate(queryClient) } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['movies', { page: 1, filter: 'popular' }], getMovies)
  const data = queryClient.getQueryData<MovieData>('movies')
  return {
    paths: data.results.map(movie => ({ params: { slug: movie.id.toString() } })),
    fallback: true,
  }
}

export default Info
