<template>
  <v-form>
    <v-container justify-center>
      <v-layout align-center column>
        <v-flex>
          <v-alert
            v-if="created"
            :value="true"
            color="info"
            icon="info"
            outline
          >
            Alojamiento creado con exito.
          </v-alert>
          <v-select
            v-model="provinceValue"
            :items="provinceOptions"
            item-text="nombre"
            label="Provincia"
            v-on:input="fetchCitiesForProvince"
            return-object
          />
          <v-select
            v-model="cityValue"
            :items="cityOptions"
            item-text="nombre"
            label="Ciudad"
            return-object
          />
          <v-text-field label="Dirección" v-model="addressValue" />
          <v-select
            v-model="accommodationValue"
            :items="accommodationOptions"
            label="Tipo de alojamiento"
          />
          <v-text-field
            label="Precio por noche con Desayuno"
            v-model="breakfastFee"
            type="number"
          />
          <v-text-field
            label="Precio por noche con Media Pensión"
            v-model="halfPensionFee"
            type="number"
          />
          <v-text-field
            label="Precio por noche con Pensión Completa"
            v-model="fullPensionFee"
            type="number"
          />
          <v-select
            v-model="categoryValue"
            :items="categoryOptions"
            label="Categoria"
          />
          <input
            type="file"
            ref="photos"
            accept="image/*"
            multiple="multiple"
            @change="onFileSelected"
          />
          <br />
          <v-btn
            type="button"
            color="primary"
            v-if="isValid && !created"
            v-on:click="submitData"
          >
            Guardar
          </v-btn>
          <v-btn
            type="button"
            color="primary"
            v-if="created"
            v-on:click="goBack"
          >
            Volver
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "AccommodationForm",
  data() {
    return {
      provinceValue: null,
      cityValue: null,
      addressValue: null,
      accommodationValue: null,
      accommodationOptions: ["Hotel", "Posada", "Cabaña", "Otro"],
      categoryValue: 5,
      categoryOptions: [1, 2, 3, 4, 5],
      breakfastFee: 0,
      halfPensionFee: 0,
      fullPensionFee: 0,
      photos: [],
      created: false
    };
  },
  computed: {
    isValid() {
      return (
        this.provinceValue &&
        this.cityValue &&
        this.addressValue &&
        this.accommodationValue &&
        this.categoryValue
      );
    },
    ...mapState(["provinceOptions", "cityOptions"])
  },
  methods: {
    fetchCitiesForProvince() {
      if (this.provinceValue) {
        this.fetchCityOptions(this.provinceValue.id);
      }
    },
    submitData() {
      if (this.isValid) {
        this.createAccommodation({
          location: {
            province: {
              name: this.provinceValue.nombre,
              id: this.provinceValue.id
            },
            city: {
              name: this.cityValue.nombre,
              id: this.cityValue.id
            },
            address: this.addressValue
          },
          category: this.categoryValue,
          type: this.accommodationValue,
          pensions: {
            breakfast: this.breakfastFee,
            halfPension: this.halfPensionFee,
            fullPension: this.fullPensionFee
          }
        }).then(response => {
          if (this.photos.length > 0) {
            let formData = new FormData();
            if (this.photos[0]) {
              formData.append("photos", this.photos[0]);
            }
            if (this.photos[1]) {
              formData.append("photos", this.photos[1]);
            }
            if (this.photos[2]) {
              formData.append("photos", this.photos[2]);
            }
            formData.append("id", response.data._id);
            let config = {
              headers: { "Content-Type": "multipart/form-data" }
            };
            this.uploadPhotoForm({
              formData,
              config
            });
          }
          this.created = true;
        });
      }
    },
    onFileSelected() {
      this.photos = this.$refs.photos.files;
    },
    goBack() {
      this.$router.replace({ name: 'accommodations' });
    }
    ,
    ...mapActions([
      "fetchProvinceOptions",
      "fetchCityOptions",
      "uploadPhotoForm",
      "createAccommodation"
    ])
  },
  mounted() {
    this.fetchProvinceOptions();
  }
};
</script>

<style scoped>
.accommodation-form {
}
</style>
