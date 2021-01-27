import React from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { pageAtom } from '@/atoms'

interface Props {
  isPreviousData: boolean
}

export default function Pagination({ isPreviousData }: Props) {
  const [page, setPage] = useAtom(pageAtom)

  return (
    <Flex mr="1rem" align="center">
      <IconButton
        aria-label="Previous button"
        disabled={isPreviousData || page === 1}
        onClick={() => setPage(prev => prev - 1)}
        icon={<ArrowLeftIcon />}
      />
      <Text textAlign="center" minW="1.5rem" mx="1rem">
        {page}
      </Text>
      <IconButton
        aria-label="Next button"
        disabled={isPreviousData}
        onClick={() => setPage(prev => prev + 1)}
        icon={<ArrowRightIcon />}
      />
    </Flex>
  )
}
