<template>
  <div>
    <h1 v-if="!registered">Crea un nuevo usuario</h1>
    <h1 v-if="registered">Usuario creado exitosamente!</h1>
    <v-btn
      type="button"
      color="primary"
      v-if="registered"
      v-on:click="clearData"
    >
      Crear otro?
    </v-btn>
    <v-form v-if="!registered">
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
            <v-select
              v-model="permissions"
              :items="permissionOptions"
              label="Permisos"
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
import { mapState, mapActions } from "vuex";

export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
      permissions: "",
      permissionOptions: ["user", "admin"],
      show1: false,
      registered: false
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    submitData() {
      if (this.isValid) {
        this.createUser({
          email: this.email,
          password: this.password,
          permissions: this.permissions
        }).then(() => (this.registered = true));
      }
    },
    clearData() {
      this.email = "";
      this.password = "";
      this.permissions = "";
      this.registered = false;
    },
    ...mapActions([
      "createUser"
    ])
  },
  computed: {
    ...mapState(["logged"]),
    isValid() {
      return this.email && this.password && this.permissions;
    }
  }
};
</script>
