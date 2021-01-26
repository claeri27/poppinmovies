import axios from 'axios'
import type { ConfigData, LatestData, NowPlayingData, PopularData, TopRatedData } from './types'

const key = process.env.NEXT_PUBLIC_API_KEY
const baseUrl = `https://api.themoviedb.org/3`

export async function getPopular(page: number): Promise<PopularData> {
  const url = `${baseUrl}/movie/popular?api_key=${key}&language=en-US&page=${page}`
  const res = await axios(url)
  return res.data
}

export async function getTopRated(page: number): Promise<TopRatedData> {
  const url = `${baseUrl}/movie/top_rated?api_key=${key}&language=en-US&page=${page}`
  const res = await axios(url)
  return res.data
}

export async function getNowPlaying(page: number): Promise<NowPlayingData> {
  const url = `${baseUrl}/movie/now_playing?api_key=${key}&language=en-US&page=${page}`
  const res = await axios(url)
  return res.data
}

export async function getLatest(): Promise<LatestData> {
  const url = `${baseUrl}/movie/latest?api_key=${key}&language=en-US&page=1`
  const res = await axios(url)
  return res.data
}

export async function getConfig(): Promise<ConfigData> {
  const url = `${baseUrl}/configuration?api_key=${key}`
  const res = await axios(url)
  return res.data
}
