import React from 'react'
import { useAtom } from 'jotai'
import { Button, Flex, Heading } from '@chakra-ui/react'
import { Filter, filterAtom, pageAtom } from '@/atoms'
import MenuButton from './MenuButton'
import Pagination from './Pagination'
import { useRouter } from 'next/dist/client/router'

interface Props {
  isPreviousData?: boolean
}

export default function AppBar({ isPreviousData }: Props) {
  const [, setPage] = useAtom(pageAtom)
  const [, setFilter] = useAtom(filterAtom)
  const router = useRouter()

  const onClick = (filter: Filter) => {
    if (!isPreviousData) {
      setPage(1)
      setFilter(filter)
    }
  }

  return (
    <Flex my="1rem" justify="space-between" align="center">
      <Heading
        ml="1rem"
        _hover={{ cursor: 'pointer' }}
        onClick={() => {
          if (router.asPath !== '/') router.push('/')
          else onClick('popular')
        }}>
        PoppinMovies
      </Heading>
      <Flex>
        <Pagination {...{ isPreviousData }} />
        <Button
          mr="1rem"
          minW="7rem"
          disabled={isPreviousData}
          display={['none', null, null, 'flex']}
          onClick={() => {
            if (router.asPath !== '/') router.push('/')
            onClick('top_rated')
          }}>
          TOP RATED
        </Button>
        <Button
          mr="1rem"
          minW="8rem"
          disabled={isPreviousData}
          display={['none', null, null, 'flex']}
          onClick={() => {
            if (router.asPath !== '/') router.push('/')
            onClick('now_playing')
          }}>
          NOW PLAYING
        </Button>
        <MenuButton handleClick={filter => onClick(filter)} />
        {/* <Input mr="1.3rem" /> */}
      </Flex>
    </Flex>
  )
}
