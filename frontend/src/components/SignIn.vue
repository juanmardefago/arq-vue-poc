<template>
  <div>
    <v-progress-circular
      :size="70"
      :width="7"
      color="blue"
      indeterminate
      v-if="loading"
    ></v-progress-circular>
    <v-container justify-center @keyup.enter="submitData" v-if="!loading">
      <v-layout align-center column>
        <v-flex>
          <h1 v-if="!logged">Ingresa</h1>
          <v-alert
            v-if="loginFailed"
            :value="true"
            dismissible
            color="error"
            icon="warning"
            outline
          >
            Mail o contraseña incorrecta.
          </v-alert>
          <v-form v-if="!logged" style="width: 500px">
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
              Ingresar
            </v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
      show1: false,
      loginFailed: false,
      loading: false
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    submitData() {
      if (this.isValid) {
        this.loading = true;
        this.loginFailed = false;
        this.authenticate({
          strategy: "local",
          email: this.email,
          password: this.password
        })
          .then(res => {
            this.$store.commit("signIn", res.data);
            this.loading = false;
            this.$router.push("accommodations");
          })
          .catch(() => {
            this.loginFailed = true;
            this.loading = false;
          });
      }
    },
    ...mapActions(["authenticate"])
  },
  computed: {
    ...mapState(["logged"]),
    isValid() {
      return this.email && this.password;
    }
  }
};
</script>
