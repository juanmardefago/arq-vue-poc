<template>
  <v-form v-model="isValid">
    <v-container>
      <v-layout>
        <v-flex>
          <v-select
            v-model="provinceValue"
            :items="provinceOptions"
            item-text="nombre"
            placeholder="Provincia"
            v-on:input="fetchCitiesForProvince"
            return-object
          />
          <v-select
            v-model="cityValue"
            :items="cityOptions"
            item-text="nombre"
            placeholder="Ciudad"
            return-object
          />
          <v-text-field placeholder="Dirección" v-model="addressValue" />
          <v-select
            v-model="accommodationValue"
            :items="accommodationOptions"
            placeholder="Tipo de alojamiento"
          />
          <v-select
            v-model="categoryValue"
            :items="categoryOptions"
            placeholder="Categoria"
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
import Multiselect from "vue-multiselect";
import axios from "axios";

export default {
  name: "AccommodationForm",
  components: {
    Multiselect
  },
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
      categoryOptions: [1, 2, 3, 4, 5]
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
          type: this.accommodationValue
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.accommodation-form {
}
</style>
