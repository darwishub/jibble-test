<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import MovieCard from './MovieCard.vue'
import { fetchMovies } from '@/services/movies'
import { useMoviesStore } from '@/stores/movies'
import type { Movie } from '@/types/movies'

const store = useMoviesStore()

const loading = ref(false)
const error = ref<string | null>(null)
const items = ref<Movie[]>([])
const total = ref(0)
const perPage = ref(10) // API uses 10 per page in this endpoint

async function load() {
  try {
    loading.value = true
    error.value = null
    const res = await fetchMovies(store.query.trim(), store.page)
    items.value = res.data
    total.value = res.total
    perPage.value = res.per_page || 10
  } catch (e: any) {
    error.value = e?.message ?? 'Failed to load'
  } finally {
    loading.value = false
  }
}

watch([() => store.query, () => store.page], load, { immediate: true })

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / perPage.value)))
</script>

<template>
  <div class="d-flex flex-column gap-4">
    <div>
      <v-text-field
        v-model="store.query"
        label="Search by Title"
        prepend-inner-icon="mdi-magnify"
        clearable
      />
    </div>

    <v-alert v-if="error" type="error" variant="tonal" :text="error" />

    <v-skeleton-loader v-if="loading" type="image, article, actions" class="mb-4" />

    <v-row v-else dense>
      <v-col v-for="m in items" :key="m.imdbID" cols="12" sm="6" md="4" lg="3" class="mb-4">
        <MovieCard :movie="m" />
      </v-col>

      <v-col v-if="!items.length && !loading && !error" cols="12">
        <v-empty-state
          headline="No results"
          title="Try a different title."
          icon="mdi-movie-open-outline"
        />
      </v-col>
    </v-row>

    <div class="d-flex align-center justify-center">
      <v-pagination v-model="store.page" :length="totalPages" :total-visible="7" />
    </div>
  </div>
</template>
