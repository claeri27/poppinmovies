import { atom } from 'jotai'

export type Filter = 'popular' | 'top_rated' | 'now_playing'

export const pageAtom = atom<number>(1)
export const filterAtom = atom<Filter>('popular')
