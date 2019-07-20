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
      :items="unapprovedAccommodations"
      :pagination.sync="pagination"
      :total-items="totalItems"
      :loading="loading"
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
          <v-btn color="success" @click="approveAcc(acc.item)">Aprobar</v-btn>
          <v-btn color="warning" @click="deleteAcc(acc.item)">Borrar</v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AccommodationDetail from "./AccommodationDetail.vue";

export default {
  name: "UnapprovedAccommodationList",
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
      selectedAccomodation: "",
      pagination: {},
      totalItems: 0,
      loading: false
    };
  },
  watch: {
    pagination: {
      handler() {
        this.loading = true;
        this.getUnapprovedAccommodations(this.pagination).then(response => {
          this.totalItems = response.total;
          this.loading = false;
        });
      },
      deep: true
    }
  },
  mounted() {
    this.loading = true;
    this.getUnapprovedAccommodations(this.pagination).then(response => {
      this.totalItems = response.total;
      this.loading = false;
    });
  },
  methods: {
    navigateTo(path, id) {
      this.$router.push(`${path}/${id}`);
    },
    viewDetailedAccomodation(id) {
      this.selectedAccomodation = id;
    },
    onClose() {
      this.selectedAccomodation = "";
    },
    approveAcc(itemId) {
      this.approveAccommodation(itemId).then(() => {
        this.totalItems -= 1;
      });
    },
    deleteAcc(itemId) {
      this.deleteAccommodation(itemId).then(() => {
        this.totalItems -= 1;
      });
    },
    ...mapActions([
      "deleteAccommodation",
      "getUnapprovedAccommodations",
      "approveAccommodation"
    ])
  },
  computed: {
    ...mapState(["unapprovedAccommodations"])
  }
};
</script>

<style scoped>
.accommodation-list {
}
</style>
