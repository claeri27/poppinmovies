import axios from 'axios'
import type { ConfigData, MovieData, MovieDetailsData } from './types'

const key = process.env.NEXT_PUBLIC_API_KEY
const baseUrl = `https://api.themoviedb.org/3`

export async function getMovies({ queryKey }): Promise<MovieData> {
  const [, { page, filter }] = queryKey
  const url = `${baseUrl}/movie/${filter}?api_key=${key}&language=en-US&page=${page}`
  const res = await axios(url)
  return res.data
}

export async function getMovieDetails(slug: string): Promise<MovieDetailsData> {
  const url = `${baseUrl}/movie/${slug}?api_key=${key}&language=en-US`
  const res = await axios(url)
  return res.data
}

export async function getConfig(): Promise<ConfigData> {
  const url = `${baseUrl}/configuration?api_key=${key}`
  const res = await axios(url)
  return res.data
}
