import React, { FC, useState } from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Box, Flex, Heading, IconButton, Image, ScaleFade, Skeleton, Text } from '@chakra-ui/react'
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
          <Flex direction="column" position="absolute" w="100%" h="100%">
            <ScaleFade initialScale={0.4} in={!isFetching && imageLoaded}>
              <Flex justify="center">
                <Heading fontSize={['1.5rem', '2.5rem', '3rem', '4rem', '5rem']}>
                  {data?.title?.toUpperCase()}
                </Heading>
              </Flex>
              <Flex m="4rem">
                <Flex direction="column" p="3rem" bg="rgba(24,24,24, .5)">
                  <Flex>
                    <Text mr="1rem">{data?.release_date.slice(0, 4)}</Text>
                    {data?.genres.map(genre => (
                      <Text mr="1rem" key={genre.id}>
                        {genre.name}
                      </Text>
                    ))}
                  </Flex>
                  <Text fontSize={['.7rem', null, null, '1.2rem']}>{data?.overview}</Text>
                  <IconButton
                    size="lg"
                    aria-label="Back button"
                    icon={<ArrowBackIcon color="white" />}
                    onClick={() => router.push('/')}
                  />
                </Flex>
              </Flex>
            </ScaleFade>
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
