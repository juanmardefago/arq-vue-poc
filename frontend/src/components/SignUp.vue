<template>
  <div>
    <h1 v-if="!logged">Registrate!</h1>
    <h1 v-if="logged">Te resgistraste satisfactoriamente!</h1>
    <v-form v-if="!logged">
      <v-container>
        <v-layout>
          <v-flex>
            <v-text-field label="Email" v-model="email" />
            <v-text-field
              label="Contraseña"
              v-model="password"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
            />
            <v-btn
              type="button"
              color="primary"
              v-if="isValid"
              v-on:click="submitData"
            >
              Registrar
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
      show1: false
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    submitData() {
      if (this.isValid) {
        axios.post(`${process.env.VUE_APP_BACKEND_URL}/users`, {
          email: this.email,
          password: this.password,
          permissions: "user"
        });
      }
    }
  },
  computed: {
    ...mapState(["logged"]),
    isValid() {
      return this.email && this.password;
    }
  }
};
</script>
