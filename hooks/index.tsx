import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { filterAtom, pageAtom } from '@/atoms'
import { getConfig, getMovie, getMovies } from '@/queries'
import type { ConfigData, Movie } from '@/queries/types'

export function useConfig() {
  return useQuery<ConfigData, unknown>('config', getConfig)
}

export function useMovies() {
  const [page] = useAtom(pageAtom)
  const [filter] = useAtom(filterAtom)
  return useQuery(['movies', { page, filter }], getMovies, { keepPreviousData: true })
}

export function useMovie() {
  const router = useRouter()
  const { slug } = router.query
  return useQuery<Movie, unknown>(['movie', slug], () => getMovie(slug as string))
}
