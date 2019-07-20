<template>
  <div>
    <v-container justify-center @keyup.enter="submitData">
      <v-layout align-center column>
        <v-flex>
          <h1 v-if="!registered">Registrate!</h1>
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
      registerFailed: false
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    submitData() {
      if (this.isValid) {
        this.registerFailed = false;
        this.createUser({
          email: this.email,
          password: this.password,
          permissions: "user"
        })
          .then(() => {
            this.registered = true;
            this.$router.push("accommodations");
          })
          .catch(() => {
            this.registerFailed = true;
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
