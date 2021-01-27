import React from 'react'
import { Box, Image, SimpleGrid, Skeleton } from '@chakra-ui/react'
import type { ConfigData, PopularData } from '@/queries/types'
import type { QueryObserverResult } from 'react-query'

interface Props {
  data: PopularData
  configQuery: QueryObserverResult<ConfigData, unknown>
  isFetching: boolean
}

export default function MovieGrid({ data, configQuery, isFetching }: Props) {
  const baseUrl = configQuery.data.images.base_url
  const posterSize = 'w500'

  return (
    <SimpleGrid columns={[2, null, 3, 4, 5]} spacing={1}>
      {data.results.map((movie, idx) => (
        <Skeleton isLoaded={!isFetching} key={idx}>
          <Box>
            <Image
              _hover={{ transform: `translateY(-1px)`, cursor: 'pointer' }}
              src={baseUrl + posterSize + movie.poster_path}
            />
          </Box>
        </Skeleton>
      ))}
    </SimpleGrid>
  )
}
