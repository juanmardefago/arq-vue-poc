<template>
  <v-container align-center>
    <v-layout align-center justify-center row fill-height>
      <v-flex
        xs12
        sm6
        md4
        lg3
      >
        <v-card>
          <v-card-title><h4>Alojamiento en: {{this.accommodation.location.city.name}}, {{this.accommodation.location.province.name}}</h4></v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>Dirección:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ this.accommodation.location.address }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Ciudad:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ this.accommodation.location.city.name }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Provincia:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ this.accommodation.location.province.name }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Categoría:</v-list-tile-content>
              <div class="text-xs-center">
                <v-rating v-model="accommodation.category" readonly></v-rating>
              </div>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Tipo:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ this.accommodation.type }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content class="font-weight-bold">Precio por noche con</v-list-tile-content>
            </v-list-tile>
            <v-divider inset class="align-center"></v-divider>
            <v-list-tile>
              <v-list-tile-content>Desayuno:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ this.accommodation.breakfast }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Media pensión:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ this.accommodation.halfPension }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Pensión completa:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ this.accommodation.fullPension }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "AccommodationDetail",
  data() {
    return {
       accommodation: { location: { province: { name: '' }, city: { name: '' }, address: '' }, category: 0, type: '', breakfast: '',
       fullPension: '',  halfPension: '' }
    };
  },
  methods: {
  },
  mounted() {
      axios
        .get(`${process.env.VUE_APP_BACKEND_URL}/accommodation/${this.$route.params.id}`)
        .then((response) => {
          let data = response.data
          this.accommodation = { location: {
              province: {
                name: data.location.province.name
              },
              city: {
                name: data.location.city.name
              },
              address: data.location.address
          }, category: data.category, type: data.type,
          breakfast: data.pensions.breakfast,
          fullPension: data.pensions.fullPension,
          halfPension: data.pensions.halfPension
          }
        });
  }
};
</script>
