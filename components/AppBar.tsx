import { Button, Flex, Heading, Input } from '@chakra-ui/react'
import React from 'react'
import { useQueryClient } from 'react-query'

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>
  setFilter: React.Dispatch<React.SetStateAction<'popular' | 'top_rated' | 'now_playing'>>
}

export default function AppBar({ setPage, setFilter }: Props) {
  const queryClient = useQueryClient()

  const onClick = (filter: 'popular' | 'top_rated' | 'now_playing') => {
    setPage(1)
    setFilter(filter)
    queryClient.invalidateQueries('movies')
  }

  return (
    <Flex my="1rem" justify="space-between" align="center">
      <Heading ml="1rem" _hover={{ cursor: 'pointer' }} onClick={() => onClick('popular')}>
        PoppinMovies
      </Heading>
      <Flex>
        <Button mr="1rem" minW="7rem" onClick={() => onClick('top_rated')}>
          TOP RATED
        </Button>
        <Button mr="1rem" minW="8rem" onClick={() => onClick('now_playing')}>
          NOW PLAYING
        </Button>
        <Button mr="1rem" minW="4rem" onClick={() => setPage(prev => prev + 1)}>
          NEXT
        </Button>
        <Input mr="1.3rem" />
      </Flex>
    </Flex>
  )
}
