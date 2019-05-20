<template>
  <ul class="accommodation-list">
    <li v-for="item in accommodations" :key="item._id">
      {{ item }}
    </li>
  </ul>
</template>

<script>
import axios from "axios";

export default {
  name: "AccommodationList",
  data() {
    return {
      accommodations: []
    };
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/accommodation`)
      .then(response => {
        this.accommodations = response.data.data;
      });
  }
};
</script>

<style scoped>
.accommodation-list {
}
</style>
