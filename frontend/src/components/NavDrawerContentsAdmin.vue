<template>
  <v-list class="pt-0" dense>
    <v-list-tile key="list" @click="navigateTo('accommodations')">
      <v-list-tile-action>
        <v-icon>list</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title>Ver alojamientos aprobados</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile
      key="unapproved-list"
      @click="navigateTo('unapproved-accommodations')"
    >
      <v-list-tile-action>
        <v-icon>list</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title>Aprobar alojamientos</v-list-tile-title>
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
    <v-list-tile key="user-creation" @click="navigateTo('new-user')">
      <v-list-tile-action>
        <v-icon>person_add</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title>Crear nuevo usuario</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  name: "NavDrawerContentsLogged",
  props: {
    navigateTo: Function
  }
};
</script>
