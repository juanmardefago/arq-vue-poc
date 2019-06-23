<template>

</template>

<template>
  <div class="home">
    <div class="top-bar">
      <v-toolbar dark color="primary">
        <v-toolbar-side-icon
          @click="toggleNavDrawer"
        />
        <v-toolbar-title class="white--text">Alojamientos ARQ</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="mini"
        absolute
        temporary
      >
        <v-list class="pt-0" dense>
          <v-list-tile
            key="form"
             @click="navigateTo('accommodations-form')"
          >
            <v-list-tile-action>
              <v-icon>edit</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Agregar alojamiento</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            key="list"
            @click="navigateTo('accommodations')"
          >
            <v-list-tile-action>
              <v-icon>list</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Ver alojamientos</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </div>
    <router-view />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data () {
    return {
      drawer: false,
    }
  },
  methods: {
    navigateTo (path) {
      this.$router.push(path);
    },
    toggleNavDrawer () {
      this.drawer = !this.drawer;
    },
  }
};
</script>

<style scoped></style>
