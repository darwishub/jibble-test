<script setup lang="ts">
import type { Movie } from '@/types/movies'
import { useMoviesStore } from '@/stores/movies'
import { computed } from 'vue'

const props = defineProps<{ movie: Movie }>()

const store = useMoviesStore()
const faved = computed(() => store.isFavorite(props.movie.imdbID))

function toggle() {
  store.toggleFavorite(props.movie)
}
</script>

<template>
  <v-card class="h-full" variant="elevated">
    <v-card-item>
      <div class="text-subtitle-1 font-medium title-container">{{ movie.Title }}</div>
      <div class="text-body-2">Year: {{ movie.Year }} • IMDB: {{ movie.imdbID }}</div>
    </v-card-item>
    <v-card-actions>
      <v-spacer />
      <v-btn
        :variant="faved ? 'flat' : 'tonal'"
        :color="faved ? 'yellow-darken-3' : undefined"
        @click="toggle"
      >
        <v-icon class="mr-1" :icon="faved ? 'mdi-star' : 'mdi-star-outline'" />
        {{ faved ? 'Unstar' : 'Star' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.title-container {
  height: 3rem; /* Fixed height for 2 lines of text */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}
</style>
