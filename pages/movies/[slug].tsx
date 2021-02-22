import React, { FC, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Fade, Flex, Heading, IconButton, Image, Skeleton, Text } from '@chakra-ui/react'
import { QueryClient } from 'react-query'
import { DehydratedState, dehydrate } from 'react-query/hydration'
import { getConfig, getMovie, getMovies } from '@/queries'
import AppBar from '@/components/AppBar'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useConfig, useMovie } from '@/hooks'
import type { Movies } from '@/queries/types'

interface InfoProps {
  dehydratedState: DehydratedState
}

const Info: FC<InfoProps> = () => {
  const [imageLoaded, setImageLoaded] = useState(false)

  const config = useConfig()
  const router = useRouter()
  const movie = useMovie()

  const isLoaded = !movie.isFetching && imageLoaded
  const baseUrl = config.data?.images.base_url
  const backdropSize = 'original'

  return (
    <Box>
      <Head>
        <title>PoppinMovies</title>
      </Head>
      <AppBar />
      <Flex>
        {movie.data && (
          <Skeleton isLoaded={imageLoaded}>
            <Image
              onLoad={() => setImageLoaded(true)}
              src={baseUrl + backdropSize + movie.data.backdrop_path}
            />
          </Skeleton>
        )}
        <Flex direction="column" position="absolute" w="100%" h="100%">
          <Fade in={isLoaded}>
            <Flex justify="center">
              <Heading fontSize={['1.5rem', '2.5rem', '3rem', '4rem', '5rem']}>
                {movie.data?.title.toUpperCase()}
              </Heading>
            </Flex>
            <Flex m="3rem">
              <Flex w="100%" direction="column" p="3rem" bg="rgba(24,24,24, .5)">
                <Flex>
                  <Text mr="1rem">{movie.data?.release_date.slice(0, 4)}</Text>
                  {movie.data?.genres.map((genre, idx) => (
                    <Text mr="1rem" key={idx}>
                      {genre.name}
                    </Text>
                  ))}
                </Flex>
                <Text fontSize={['.7rem', null, null, '1.2rem']}>{movie.data?.overview}</Text>
                <Flex overflow="scroll" direction="row">
                  {movie.data?.credits.cast.slice(0, 6).map((castMember, idx) => (
                    <Flex m="1rem" direction="column" align="center" justify="center" key={idx}>
                      <Text>{castMember.name}</Text>
                    </Flex>
                  ))}
                </Flex>
                <IconButton
                  size="lg"
                  aria-label="Back button"
                  icon={<ArrowBackIcon color="white" />}
                  onClick={() => router.push('/')}
                />
              </Flex>
            </Flex>
          </Fade>
        </Flex>
      </Flex>
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['movie', slug], () => getMovie(slug as string))
  await queryClient.prefetchQuery('config', getConfig)
  return { props: { dehydratedState: dehydrate(queryClient) } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['movies', { page: 1, filter: 'popular' }], getMovies)
  const data = queryClient.getQueryData<Movies>('movies')
  return {
    paths: data.results.map(movie => ({ params: { slug: movie.id.toString() } })),
    fallback: true,
  }
}

export default Info
