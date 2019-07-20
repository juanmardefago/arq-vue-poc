<template>
  <v-layout align-center justify-center row @click.self="closeDetail">
    <v-flex xs12 sm6 md4 lg3 style="position: relative;">
      <v-btn fab v-if="onClose" @click="closeDetail" class="close-btn">
        <v-icon>close</v-icon>
      </v-btn>
      <v-tabs v-model="activeTab" color="white" slider-color="blue" grow>
        <v-tab key="1">
          Información
        </v-tab>
        <v-tab-item key="1">
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
                  <v-rating
                    v-model="accommodation.category"
                    readonly
                  ></v-rating>
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
        </v-tab-item>
        <v-tab key="2" :disabled="accommodation.photos.length === 0">
          Fotos
        </v-tab>
        <v-tab-item key="2">
          <v-carousel
            :cycle="false"
            v-if="this.accommodation.photos.length > 0"
          >
            <v-carousel-item
              v-for="(photo, i) in this.accommodation.photos"
              :key="i"
            >
              <img :src="backendUrl + '/' + photo" style="width:100%;" />
            </v-carousel-item>
          </v-carousel>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AccommodationDetail",
  props: {
    accommodationId: String,
    onClose: Function
  },
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
      },
      activeTab: 0
    };
  },
  computed: {
    backendUrl() {
      return process.env.VUE_APP_BACKEND_URL;
    }
  },
  methods: {
    ...mapActions(["getAccommodationData"]),
    closeDetail() {
      if(this.onClose) {
        this.accommodation = {
          location: { province: { name: "" }, city: { name: "" }, address: "" },
          category: 0,
          type: "",
          breakfast: "",
          fullPension: "",
          halfPension: "",
          photos: []
        };
        this.onClose();
      }
    }
  },
  mounted() {
    this.getAccommodationData(this.accommodationId).then(response => {
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
        photos: data.photos || []
      };
    });
  }
};
</script>
<!-- overwriting carousel style to center images -->
<style scoped>
.close-btn {
  position: absolute;
  top: -25px;
  right: -25px;
  z-index: 1;
  height: 35px;
  width: 35px;
  min-width: 35px;
}
</style>
<style>
.v-responsive__content {
  margin: auto;
}

.v-carousel__item {
  background: white;
}
</style>
