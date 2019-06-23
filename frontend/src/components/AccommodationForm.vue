<template>
  <v-form v-model="isValid">
    <v-container>
      <v-layout>
        <v-flex>
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
          <v-btn type="button" color="primary" v-if="isValid" v-on:click="submitData">
            Submit data
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "AccommodationForm",
  data() {
    return {
      provinceValue: null,
      provinceOptions: [],
      cityValue: null,
      cityOptions: [],
      addressValue: null,
      accommodationValue: null,
      accommodationOptions: ["Hotel", "Posada", "Cabaña", "Otro"],
      categoryValue: 5,
      categoryOptions: [1, 2, 3, 4, 5],
      breakfastFee: 0,
      halfPensionFee: 0,
      fullPensionFee: 0
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
    }
  },
  methods: {
    fetchCitiesForProvince() {
      if (this.provinceValue) {
        axios
          .get(
            `${process.env.VUE_APP_CITIES_API_URL}&provincia=${
              this.provinceValue.id
            }`
          )
          .then(response => {
            this.cityOptions = response.data.municipios;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    submitData() {
      if (this.isValid) {
        axios.post(`${process.env.VUE_APP_BACKEND_URL}/accommodation`, {
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
        });
      }
    }
  },
  mounted() {
    axios
      .get(process.env.VUE_APP_PROVINCE_API_URL)
      .then(response => {
        this.provinceOptions = response.data.provincias;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.accommodation-form {
}
</style>
