<template>
  <div class="home">
    <div class="top-bar">
      <button type="button" @click="navigateTo('accommodations-form')">
        Go to form
      </button>
      <button type="button" @click="navigateTo('accommodations')">
        Go to lists
      </button>
    </div>
    <router-view />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  methods: {
    navigateTo (path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped></style>
