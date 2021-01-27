import React, { FC, useState } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { Box } from '@chakra-ui/react'
import { QueryClient } from 'react-query'
import { DehydratedState, dehydrate } from 'react-query/hydration'
import { getConfig } from '@/queries'
import AppBar from '@/components/AppBar'

interface InfoProps {
  dehydratedState: DehydratedState
}

const Info: FC<InfoProps> = () => {
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState<'popular' | 'top_rated' | 'now_playing'>('popular')

  return (
    <Box>
      <Head>
        <title>PoppinMovies</title>
      </Head>
      <AppBar setPage={setPage} setFilter={setFilter} />
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('config', getConfig)
  return { props: { dehydratedState: dehydrate(queryClient) } }
}

export default Info
