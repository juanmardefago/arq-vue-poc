<template>
  <div>
    <AccommodationDetail
      v-if="selectedAccomodation"
      :accommodationId="selectedAccomodation"
      :onClose="onClose"
      class="modal"
    />
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
          <v-btn color="info" @click="viewDetailedAccomodation(acc.item._id)"
            >Detalle</v-btn
          >
          <v-btn
            v-if="permissions === 'admin'"
            color="warning"
            v-on:click="deleteAccommodation(acc.item)"
            >Borrar</v-btn
          >
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AccommodationDetail from "./AccommodationDetail.vue";

export default {
  name: "AccommodationList",
  components: {
    AccommodationDetail
  },
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
      selectedAccomodation: ""
    };
  },
  mounted() {
    this.getApprovedAccommodations();
  },
  methods: {
    viewDetailedAccomodation(id) {
      this.selectedAccomodation = id;
    },
    onClose() {
      this.selectedAccomodation = "";
    },
    ...mapActions(["getApprovedAccommodations", "deleteAccommodation"])
  },
  computed: {
    ...mapState(["approvedAccommodations", "permissions"])
  }
};
</script>

<style>
.modal {
  position: absolute;
  width: 100%;
  height: 93.25%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2;
}
</style>
