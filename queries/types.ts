export interface Result {
  poster_path: string
  adult: boolean
  overview: string
  release_date: Date
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

export interface MovieData {
  page: number
  results: Result[]
  total_pages: number
  total_results: number
  dates?: Dates
}

export interface MovieDetailsData extends Result {
  belongs_to_collection: null | Record<string, unknown>
  budget: number
  genres: {
    id: number
    name: string
  }[]
  homepage: string | null
  imdb_id: string | null
  production_companies: {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  revenue: number
  runtime: number | null
  spoken_languages: {
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string | null
}
