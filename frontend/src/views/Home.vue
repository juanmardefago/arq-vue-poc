<template>
  <div class="home">
    <div class="top-bar">
      <v-toolbar dark color="primary">
        <v-toolbar-side-icon @click="toggleNavDrawer" />
        <v-toolbar-title class="white--text">Alojamientos ARQ</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list v-if="logged" class="pt-0" dense>
          <v-list-tile key="form" @click="navigateTo('accommodations-form')">
            <v-list-tile-action>
              <v-icon>edit</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Agregar alojamiento</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile key="list" @click="navigateTo('accommodations')">
            <v-list-tile-action>
              <v-icon>list</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Ver alojamientos</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-list v-if="!logged" class="pt-0" dense>
          <v-list-tile key="form" @click="navigateTo('signin')">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Ingresa</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile key="list" @click="navigateTo('signup')">
            <v-list-tile-action>
              <v-icon>person_add</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Registrate</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.replace({ name: path });
    },
    toggleNavDrawer() {
      this.drawer = !this.drawer;
    }
  },
  computed: mapState(["logged"])
};
</script>

<style scoped></style>
