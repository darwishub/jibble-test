<script setup lang="ts"></script>

<template>
  <v-container class="py-6">
    <div class="d-flex align-center mb-4">
      <v-icon icon="mdi-movie-open" class="mr-2" />
      <h2 class="text-h5 my-0">Movie Search</h2>
      <v-spacer />
      <RouterLink to="/favorites">
        <v-btn prepend-icon="mdi-star" variant="tonal">Favorites</v-btn>
      </RouterLink>
    </div>

    <MovieList />
  </v-container>
</template>

<script lang="ts">
import MovieList from '@/components/MovieList.vue'
export default { components: { MovieList } }
</script>
