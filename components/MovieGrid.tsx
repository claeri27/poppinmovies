import React from 'react'
import { Flex, Image } from '@chakra-ui/react'
import type { ConfigData, PopularData } from '@/queries/types'
import type { QueryObserverResult } from 'react-query'

interface Props {
  data: PopularData
  configQuery: QueryObserverResult<ConfigData, unknown>
}

export default function MovieGrid({ data, configQuery }: Props) {
  const baseUrl = configQuery.data.images.base_url
  const posterSize = 'w185'

  return (
    <Flex wrap="wrap" justify="center">
      {data.results.map((movie, idx) => (
        <Image
          m="0.5rem"
          key={idx}
          _hover={{ transform: `translateY(-3px)`, cursor: 'pointer' }}
          src={baseUrl + posterSize + movie.poster_path}
        />
      ))}
    </Flex>
  )
}
