<script setup lang="ts"></script>

<template>
  <v-app>
    <v-app-bar flat>
      <v-container class="d-flex align-center">
        <RouterLink to="/" class="text-decoration-none">
          <v-btn variant="text" prepend-icon="mdi-filmstrip">Movies</v-btn>
        </RouterLink>
        <v-spacer />
        <RouterLink to="/favorites" class="text-decoration-none">
          <v-btn variant="text" prepend-icon="mdi-star">Favorites</v-btn>
        </RouterLink>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
