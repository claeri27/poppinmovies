import axios from 'axios'
import type { Movie, Movies } from './types'

const key = process.env.NEXT_PUBLIC_API_KEY
const baseUrl = `https://api.themoviedb.org/3`

export async function getConfig() {
  const url = `${baseUrl}/configuration?api_key=${key}`
  const res = await axios(url)
  return res.data
}

export async function getMovies({ queryKey }): Promise<Movies> {
  const [, { page, filter }] = queryKey
  const url = `${baseUrl}/movie/${filter}?api_key=${key}&page=${page}&language=en-US`
  const res = await axios(url)
  return res.data
}

export async function getMovie(slug: string): Promise<Movie> {
  const url = `${baseUrl}/movie/${slug}?api_key=${key}&language=en-US&append_to_response=credits,reviews`
  const res = await axios(url)
  return res.data
}

//  export async function getActors(slug: string[]): Promise<Actor[]> {
//   const actors: Actor[] = []
//   slug.forEach(async id => {
//     const url = `${baseUrl}/person/${id}?api_key=${key}&language=en-US`
//     const res: AxiosResponse<Actor> = await axios(url)
//     actors.push(res.data)
//   })
//   return actors
// }
