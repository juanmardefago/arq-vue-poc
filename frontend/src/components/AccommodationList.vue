<template>
  <v-data-table :headers="headers" :items="accommodations" class="elevation-1">
    <template align="" v-slot:items="acc">
      <td>{{ acc.item.location.province.name }}</td>
      <td class="text-xs-center">{{ acc.item.location.city.name }}</td>
      <td class="text-xs-center">{{ acc.item.location.address }}</td>
      <td class="text-xs-center">{{ acc.item.category }}</td>
      <td class="text-xs-center">{{ acc.item.type }}</td>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";

export default {
  name: "AccommodationList",
  data() {
    return {
      headers: [
        { text: "Provincia", align: "center", value: "", sortable: false },
        { text: "Ciudad", align: "center", value: "", sortable: false },
        { text: "Dirección", align: "center", value: "", sortable: false },
        { text: "Categoría", align: "center", value: "", sortable: false },
        { text: "Tipo", align: "center", value: "", sortable: false }
      ],
      accommodations: []
    };
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/accommodation`, {
        headers: {
          Authorization: this.$store.state.jwt
        }
      })
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
