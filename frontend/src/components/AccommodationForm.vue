<template>
  <div class="accommodation-form">
    <multiselect
      v-model="provinceValue"
      :options="provinceOptions"
      :custom-label="getNameFromObject"
      placeholder="Provincia"
      label="nombre"
      track-by="nombre"
      v-on:input="fetchCitiesForProvince"
    />
    <multiselect
      v-model="cityValue"
      :options="cityOptions"
      :custom-label="getNameFromObject"
      placeholder="Ciudad"
      label="nombre"
      track-by="nombre"
    />
    <input placeholder="Dirección" v-model="addressValue" />
    <multiselect
      v-model="accommodationValue"
      :options="accommodationOptions"
      placeholder="Tipo de alojamiento"
    />
    <multiselect
      v-model="categoryValue"
      :options="categoryOptions"
      placeholder="Categoria"
    />
    <button type="button" v-if="isValid" v-on:click="submitData">
      Submit data
    </button>
  </div>
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
    getNameFromObject({ nombre }) {
      return nombre;
    },
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
