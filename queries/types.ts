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

export interface Movies {
  page: number
  results: Result[]
  total_pages: number
  total_results: number
  dates?: Dates
}

export interface CastMember {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface CrewMember {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  credit_id: string
  department: string
  job: string
}

export interface Credits {
  id: number
  cast: CastMember[]
  crew: CrewMember[]
}

export interface Reviews {
  id: number
  page: number
  results: {
    author: string
    author_details: {
      name: string
      username: string
      avatar_path: string | null
      rating: number | null
    }
    content: string
    created_at: string
    id: string
    updated_at: string
    url: string
  }[]
  total_pages: number
  total_results: number
}

export interface Movie extends Result {
  belongs_to_collection: null | Record<string, unknown>
  budget: number
  credits: Credits
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
  reviews: Reviews
  runtime: number | null
  spoken_languages: {
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string | null
}

export interface Actor {
  birthday: string | null
  known_for_department: string
  deathday: string | null
  id: number
  name: string
  also_known_as: string[]
  gender: 0 | 1 | 2
  biography: string
  popularity: number
  place_of_birth: string | null
  profile_path: string | null
  adult: boolean
  imdb_id: string
  homepage: string | null
}
