<template>
  <v-container align-center>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 sm6 md4 lg3>
        <v-card>
          <v-card-title
            ><h4>
              Alojamiento en: {{ this.accommodation.location.city.name }},
              {{ this.accommodation.location.province.name }}
            </h4></v-card-title
          >
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>Dirección:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                this.accommodation.location.address
              }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Ciudad:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                this.accommodation.location.city.name
              }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Provincia:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                this.accommodation.location.province.name
              }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Categoría:</v-list-tile-content>
              <div class="text-xs-center">
                <v-rating v-model="accommodation.category" readonly></v-rating>
              </div>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Tipo:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                this.accommodation.type
              }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content class="font-weight-bold"
                >Precio por noche con</v-list-tile-content
              >
            </v-list-tile>
            <v-divider inset class="align-center"></v-divider>
            <v-list-tile>
              <v-list-tile-content>Desayuno:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                this.accommodation.breakfast
              }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Media pensión:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                this.accommodation.halfPension
              }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Pensión completa:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                this.accommodation.fullPension
              }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
        <v-carousel :cycle="false" v-if="this.accommodation.photos.length > 0">
          <v-carousel-item
            v-for="(photo, i) in this.accommodation.photos"
            :key="i"
          >
            <img :src="'http://localhost:3030/' + photo" style="width:100%;" />
          </v-carousel-item>
        </v-carousel>
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
      accommodation: {
        location: { province: { name: "" }, city: { name: "" }, address: "" },
        category: 0,
        type: "",
        breakfast: "",
        fullPension: "",
        halfPension: "",
        photos: []
      }
    };
  },
  methods: {},
  mounted() {
    axios
      .get(
        `${process.env.VUE_APP_BACKEND_URL}/accommodation/${
          this.$route.params.id
        }`,
        {
          headers: {
            Authorization: this.$store.state.jwt
          }
        }
      )
      .then(response => {
        let data = response.data;
        let pensions = data.pensions || {};
        this.accommodation = {
          location: {
            province: {
              name: data.location.province.name
            },
            city: {
              name: data.location.city.name
            },
            address: data.location.address
          },
          category: data.category,
          type: data.type,
          breakfast: pensions.breakfast || "-",
          fullPension: pensions.fullPension || "-",
          halfPension: pensions.halfPension || "-",
          photos: data.photos
        };
      });
  }
};
</script>
<!-- overwriting carousel style to center images -->
<style>
.v-responsive__content {
  margin: auto;
}
</style>
