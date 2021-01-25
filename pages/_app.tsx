import { CSSReset, ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import '@/theme/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider>
    <CSSReset />
    <Component {...pageProps} />
  </ChakraProvider>
)

export default MyApp
