import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Movie } from '@/types/movies'

export const useMoviesStore = defineStore(
  'movies',
  () => {
    const favorites = ref<Record<string, Movie>>({})
    const query = ref<string>('')
    const page = ref<number>(1)

    function toggleFavorite(movie: Movie) {
      if (favorites.value[movie.imdbID]) {
        delete favorites.value[movie.imdbID]
      } else {
        favorites.value[movie.imdbID] = movie
      }
    }

    function isFavorite(id: string) {
      return !!favorites.value[id]
    }

    return { favorites, query, page, toggleFavorite, isFavorite }
  },
  {
    // persistedstate options
    persist: {
      key: 'mv_favorites_store',
      storage: localStorage, // (default is localStorage; can omit)
      paths: ['favorites', 'query', 'page'], // choose what to persist
    },
  }
)
