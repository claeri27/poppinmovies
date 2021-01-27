import React from 'react'
import { useQuery } from 'react-query'
import { Image, SimpleGrid, Skeleton } from '@chakra-ui/react'
import { getConfig } from '@/queries'
import type { MovieData } from '@/queries/types'

interface Props {
  data: MovieData
  isFetching: boolean
}

export default function MovieGrid({ data, isFetching }: Props) {
  const configQuery = useQuery('config', getConfig)
  const baseUrl = configQuery.data.images.base_url
  const posterSize = 'w500'

  return (
    <SimpleGrid columns={[2, null, 3, 4, 5]} spacing={1}>
      {data?.results.map((movie, idx) => (
        <Skeleton isLoaded={!isFetching} key={idx}>
          <Image
            _hover={{ transform: `translateY(-1px)`, cursor: 'pointer' }}
            src={baseUrl + posterSize + movie.poster_path}
          />
        </Skeleton>
      ))}
    </SimpleGrid>
  )
}
