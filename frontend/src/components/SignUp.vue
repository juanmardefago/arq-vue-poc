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
          <h1 v-if="!registered">Registrate!</h1>
          <h1 v-if="registered">Usuario registrado exitosamente</h1>
          <v-btn
            type="button"
            color="primary"
            v-if="registered"
            v-on:click="navigateTo('/signin')"
          >
            Ingresar
          </v-btn>
          <v-alert
            v-if="registerFailed"
            :value="true"
            dismissible
            color="error"
            icon="warning"
            outline
          >
            Ha ocurrido un error.
          </v-alert>
          <v-form v-if="!registered" style="width: 500px">
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
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
      show1: false,
      registered: false,
      registerFailed: false,
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
        this.registerFailed = false;
        this.createUser({
          email: this.email,
          password: this.password,
          permissions: "user"
        })
          .then(() => {
            this.registered = true;
            this.loading = false;
          })
          .catch(() => {
            this.registerFailed = true;
            this.loading = false;
          });
      }
    },
    ...mapActions(["createUser"])
  },
  computed: {
    ...mapState(["logged"]),
    isValid() {
      return this.email && this.password;
    }
  }
};
</script>
