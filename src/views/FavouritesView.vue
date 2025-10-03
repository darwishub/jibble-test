<script setup lang="ts">
import { computed } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import MovieCard from '@/components/MovieCard.vue'

const store = useMoviesStore()
const favList = computed(() => Object.values(store.favorites))
</script>

<template>
  <v-container class="py-6">
    <div class="d-flex align-center mb-4">
      <v-icon icon="mdi-star" class="mr-2" />
      <h2 class="text-h5 my-0">Favorites</h2>
      <v-spacer />
      <RouterLink to="/">
        <v-btn prepend-icon="mdi-home" variant="tonal">Home</v-btn>
      </RouterLink>
    </div>

    <v-row dense>
      <v-col v-for="m in favList" :key="m.imdbID" cols="12" sm="6" md="4" lg="3" class="mb-4">
        <MovieCard :movie="m" />
      </v-col>

      <v-col v-if="!favList.length" cols="12">
        <v-alert
          type="info"
          variant="tonal"
          text="No favorites yet. Star a movie from the search page."
        />
      </v-col>
    </v-row>
  </v-container>
</template>
