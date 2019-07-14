<template>
  <v-data-table
    :headers="headers"
    :items="approvedAccommodations"
    class="elevation-1"
  >
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
        <v-btn color="warning" v-on:click="deleteAccommodation(acc.item)"
          >Borrar</v-btn
        >
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapState } from "vuex";

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
      ]
    };
  },
  mounted() {
    this.getApprovedAccommodations();
  },
  methods: {
    navigateTo(path, id) {
      this.$router.push(`${path}/${id}`);
    },
    ...mapActions(["getApprovedAccommodations", "deleteAccommodation"])
  },
  computed: {
    ...mapState(["approvedAccommodations"])
  }
};
</script>

<style scoped>
.accommodation-list {
}
</style>
