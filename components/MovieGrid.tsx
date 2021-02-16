import React from 'react'
import Link from 'next/link'
import { Image, SimpleGrid, Skeleton } from '@chakra-ui/react'
import { useConfig, useMovies } from '@/hooks'

export default function MovieGrid() {
  const config = useConfig()
  const movies = useMovies()

  const baseUrl = config.data.images.base_url
  const posterSize = 'w500'

  return (
    <SimpleGrid columns={[2, null, 3, 4, 5]} spacing={1}>
      {movies.data?.results.map((movie, idx) => (
        <Skeleton isLoaded={!movies.isFetching} key={idx}>
          <Link href={`/movies/${movie.id}`}>
            <Image
              _hover={{ transform: `translateY(-1px)`, cursor: 'pointer' }}
              src={baseUrl + posterSize + movie.poster_path}
            />
          </Link>
        </Skeleton>
      ))}
    </SimpleGrid>
  )
}
