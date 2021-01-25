import { FC } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { Box } from '@chakra-ui/react'

const Home: FC = () => (
  <Box>
    <Head>
      <title>MovieData</title>
      {/* <link rel="icon" href="/moon.svg" /> */}
    </Head>
  </Box>
)

export const getStaticProps: GetStaticProps = async () => {
  // const res: AxiosResponse<Props> = await axios(
  //   `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C7d%2C30d%2C1y`,
  // )
  return { props: { data: '' } }
}

export default Home
