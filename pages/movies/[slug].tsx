import React, { FC, useState } from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import {
  Box,
  Flex,
  Image,
  Text,
  Skeleton,
  Heading,
  IconButton,
  Fade,
  ScaleFade,
} from '@chakra-ui/react'
import { QueryClient, useQuery } from 'react-query'
import { DehydratedState, dehydrate } from 'react-query/hydration'
import { getConfig, getMovieDetails, getMovies } from '@/queries'
import AppBar from '@/components/AppBar'
import { MovieData } from '@/queries/types'
import { ArrowBackIcon } from '@chakra-ui/icons'

interface InfoProps {
  dehydratedState: DehydratedState
}

const Info: FC<InfoProps> = () => {
  const router = useRouter()

  const [imageLoaded, setImageLoaded] = useState(false)
  const { data, isFetching } = useQuery(['movie_data', router.query.slug], () =>
    getMovieDetails(router.query.slug as string),
  )
  const configQuery = useQuery('config', getConfig)
  const baseUrl = configQuery.data?.images.base_url
  const backdropSize = 'original'

  return (
    <Box>
      <Head>
        <title>PoppinMovies</title>
      </Head>
      <AppBar />
      <Skeleton isLoaded={!isFetching && imageLoaded}>
        <Flex>
          {data && (
            <Image
              onLoad={() => setImageLoaded(true)}
              src={baseUrl + backdropSize + data.backdrop_path}
            />
          )}
          <Flex position="absolute" w="100%" h="100%">
            <Flex pl="3rem" justify="center" direction="column" w="70%">
              <ScaleFade initialScale={0.4} in={!isFetching && imageLoaded}>
                <Flex direction="column" borderRadius="5%" p="3rem" bg="rgba(24,24,24, .5)">
                  <Heading>{data?.title}</Heading>
                  <Flex>
                    <Text>{data?.release_date.slice(0, 4)}</Text>
                    {data?.genres.map(genre => (
                      <Text key={genre.id}>-{genre.name}</Text>
                    ))}
                  </Flex>
                  <Text my={['1rem']} fontSize={['.7rem', null, null, '1.2rem']}>
                    {data?.overview}
                  </Text>
                  <IconButton
                    size="lg"
                    aria-label="Back button"
                    icon={<ArrowBackIcon color="white" />}
                    onClick={() => router.back()}
                  />
                </Flex>
              </ScaleFade>
            </Flex>
            {/* <Flex direction="column" w="50%" align="center" justify="center">
              <ScaleFade initialScale={0.4} in={!isFetching && imageLoaded}>
                <Flex direction="column">
                  {data?.production_companies.map(company => (
                    <Text key={company.id}>{company.name}</Text>
                  ))}
                </Flex>
                <Flex>
                  {data?.production_countries.map((country, idx) => (
                    <Flex key={idx}>
                      <Text>{country.name}</Text>
                    </Flex>
                  ))}
                </Flex>
                <Text>{data?.homepage}</Text>
                <Text>{data?.popularity}</Text>
              </ScaleFade>
            </Flex> */}
            {/* <Text>BOBBY</Text> */}
          </Flex>
        </Flex>
      </Skeleton>
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
  const data = await queryClient.getQueryData<MovieData>('movies')
  return {
    paths: data.results.map(movie => ({ params: { slug: movie.id.toString() } })),
    fallback: true,
  }
}

export default Info
