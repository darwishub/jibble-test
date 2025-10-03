import type { MoviesApiResponse } from '@/types/movies'

const BASE = 'https://jsonmock.hackerrank.com/api/movies/search/'

export async function fetchMovies(title: string, page: number): Promise<MoviesApiResponse> {
  const params = new URLSearchParams()
  if (title) params.set('Title', title)
  params.set('page', String(page || 1))

  const res = await fetch(`${BASE}?${params.toString()}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
