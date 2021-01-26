import axios, { AxiosResponse } from 'axios'
import type { ConfigData, LatestData, NowPlayingData, PopularData, TopRatedData } from './types'

const key = process.env.NEXT_PUBLIC_API_KEY
const baseUrl = `https://api.themoviedb.org/3`

export async function getPopular(page: number) {
  const popularUrl = `${baseUrl}/movie/popular?api_key=${key}&language=en-US&page=${page}`
  const res: AxiosResponse<PopularData> = await axios(popularUrl)
  return res.data
}

export async function getTopRated(page: number) {
  const topRatedUrl = `${baseUrl}/movie/top_rated?api_key=${key}&language=en-US&page=${page}`
  const res: AxiosResponse<TopRatedData> = await axios(topRatedUrl)
  return res.data
}

export async function getNowPlaying(page: number) {
  const nowPlayingUrl = `${baseUrl}/movie/now_playing?api_key=${key}&language=en-US&page=${page}`
  const res: AxiosResponse<NowPlayingData> = await axios(nowPlayingUrl)
  return res.data
}

export async function getLatest() {
  const latestUrl = `${baseUrl}/movie/latest?api_key=${key}&language=en-US&page=1`
  const res: AxiosResponse<LatestData> = await axios(latestUrl)
  return res.data
}

export async function getConfig() {
  const configUrl = `${baseUrl}/configuration?api_key=${key}`
  const res: AxiosResponse<ConfigData> = await axios(configUrl)
  return res.data
}
