<template>
  <v-list class="pt-0" dense>
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
</template>

<script>
export default {
  name: "NavDrawerContentsNotLogged",
  props: {
    navigateTo: Function
  }
};
</script>
