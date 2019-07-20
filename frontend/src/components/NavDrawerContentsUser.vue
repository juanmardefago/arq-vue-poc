<template>
  <v-list class="pt-0" dense>
    <v-list-tile key="list" @click="navigateTo('accommodations')">
      <v-list-tile-action>
        <v-icon>list</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title>Ver alojamientos</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile key="form" @click="navigateTo('accommodations-form')">
      <v-list-tile-action>
        <v-icon>edit</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title>Agregar alojamiento</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-list-tile
      key="signout"
      @click="
        signout();
        navigateTo('signin');
      "
    >
      <v-list-tile-action>
        <v-icon>keyboard_backspace</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title>Cerrar sesión</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "NavDrawerContentsLogged",
  props: {
    navigateTo: Function
  },
  methods: {
    ...mapMutations(["signout"])
  }
};
</script>
