<template>

  <v-data-table
    :headers="headers"
    :items="accommodations"
    class="elevation-1"
  >
    <template align='' v-slot:items="acc">
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
         { text: 'Province', align: 'center', value: '', sortable: false },
         { text: 'City', align: 'center', value: '', sortable: false },
         { text: 'Address', align: 'center', value: '', sortable: false },
         { text: 'Category', align: 'center', value: '', sortable: false },
         { text: 'Type', align: 'center', value: '', sortable: false }
       ],
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
