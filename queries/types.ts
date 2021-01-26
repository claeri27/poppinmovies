export interface Result {
  poster_path: string
  adult: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  original_title: string
  original_language: string
  title: string
  backdrop_path: string | null
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}

export interface PopularData {
  page: number
  results: Result[]
  total_pages: number
  total_results: number
}

export interface LatestData extends Result {
  belongs_to_collection: null
  budget: number
  genres: {
    id: number
    name: string
  }
  homepage: string
  imdb_id: string
  production_companies: Record<string, unknown>[]
  production_countries: Record<string, unknown>[]
  revenue: number
  runtime: number
  spoken_languages: Record<string, unknown>[]
  status: string
  tagline: string
}

export interface Images {
  backdrop_sizes: string[]
  base_url: string
  logo_sizes: string[]
  poster_sizes: string[]
  profile_sizes: string[]
  secure_base_url: string
  still_sizes: string[]
}

export interface ConfigData {
  change_keys: string[]
  images: Images
}

export interface Dates {
  maximum: Date
  minimum: Date
}

export interface TopRatedData extends PopularData {}
export interface NowPlayingData extends PopularData {
  dates: Dates
}
