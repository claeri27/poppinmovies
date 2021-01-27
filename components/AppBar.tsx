import { Button, Flex, Heading, Input, Text } from '@chakra-ui/react'
import React from 'react'
import { useQueryClient } from 'react-query'

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>
  setView: React.Dispatch<React.SetStateAction<'popular' | 'top-rated' | 'now-playing'>>
}

export default function AppBar({ setPage, setView }: Props) {
  const queryClient = useQueryClient()

  return (
    <Flex my="1rem" justify="space-between" align="center">
      <Heading
        ml="1rem"
        _hover={{ cursor: 'pointer' }}
        onClick={() => {
          setPage(1)
          setView('popular')
          queryClient.invalidateQueries('popular')
        }}>
        PoppinMovies
      </Heading>
      <Flex>
        <Button
          mr="1rem"
          minW="7rem"
          onClick={() => {
            setPage(1)
            setView('top-rated')
            queryClient.invalidateQueries('top-rated')
          }}>
          TOP RATED
        </Button>
        <Button
          mr="1rem"
          minW="8rem"
          onClick={() => {
            setPage(1)
            setView('now-playing')
            queryClient.invalidateQueries('now-playing')
          }}>
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
