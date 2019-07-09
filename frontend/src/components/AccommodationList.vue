<template>
  <v-data-table :headers="headers" :items="accommodations" class="elevation-1">
    <template align="" v-slot:items="acc">
      <td>{{ acc.item.location.province.name }}</td>
      <td class="text-xs-center">{{ acc.item.location.city.name }}</td>
      <td class="text-xs-center">{{ acc.item.location.address }}</td>
      <td class="text-xs-center">{{ acc.item.category }}</td>
      <td class="text-xs-center">{{ acc.item.type }}</td>
      <td class="text-xs-center">
        <v-btn color="info" @click="navigateTo('accommodation', acc.item._id)"
          >Detalle</v-btn
        >
      </td>
      <td class="text-xs-center">
        <v-btn color="warning" v-on:click="deleteAccommodation(acc.item)"
          >Borrar</v-btn
        >
      </td>
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
        { text: "Tipo", align: "center", value: "", sortable: false },
        { text: "", align: "center", value: "", sortable: false }
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
  },
  methods: {
    deleteAccommodation(item) {
      axios
        .delete(
          `${process.env.VUE_APP_BACKEND_URL}/accommodation/${item._id}`,
          {
            headers: {
              Authorization: this.$store.state.jwt
            }
          }
        )
        .then(() => {
          this.accommodations.splice(this.accommodations.indexOf(item), 1);
        });
    },
    navigateTo(path, id) {
      this.$router.push(`${path}/${id}`);
    }
  }
};
</script>

<style scoped>
.accommodation-list {
}
</style>
