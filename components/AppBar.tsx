import { Button, Flex, Heading, Input } from '@chakra-ui/react'
import React from 'react'

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>
  setView: React.Dispatch<React.SetStateAction<'popular' | 'top-rated' | 'now-playing'>>
}

export default function AppBar({ setPage, setView }: Props) {
  return (
    <Flex my="1rem" justify="space-between" align="center">
      <Heading
        ml="1em"
        _hover={{ cursor: 'pointer' }}
        onClick={() => {
          setPage(1)
          setView('popular')
        }}>
        PoppinMovies
      </Heading>
      <Flex>
        <Button
          mr="1rem"
          onClick={() => {
            setPage(1)
            setView('top-rated')
          }}>
          TOP RATED
        </Button>
        <Button
          mr="1rem"
          onClick={() => {
            setPage(1)
            setView('now-playing')
          }}>
          NOW PLAYING
        </Button>
        <Button mr="1rem" onClick={() => setPage(prev => prev + 1)}>
          NEXT
        </Button>
        <Input mr="1.3rem" w="20rem" />
      </Flex>
    </Flex>
  )
}
