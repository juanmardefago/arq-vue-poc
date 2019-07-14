<template>
  <div class="home">
    <div class="top-bar">
      <v-toolbar dark color="primary">
        <v-toolbar-side-icon @click="toggleNavDrawer" />
        <v-toolbar-title class="white--text">Alojamientos ARQ</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <NavDrawerContentsAdmin
          v-if="logged && permissions === 'admin'"
          :navigateTo="navigateTo"
        />
        <NavDrawerContentsUser
          v-if="logged && permissions === 'user'"
          :navigateTo="navigateTo"
        />
        <NavDrawerContentsNotLogged v-if="!logged" :navigateTo="navigateTo" />
      </v-navigation-drawer>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavDrawerContentsNotLogged from "@/components/NavDrawerContentsNotLogged";
import NavDrawerContentsUser from "@/components/NavDrawerContentsUser";
import NavDrawerContentsAdmin from "@/components/NavDrawerContentsAdmin";

export default {
  name: "Home",
  components: {
    NavDrawerContentsAdmin,
    NavDrawerContentsUser,
    NavDrawerContentsNotLogged
  },
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
  computed: mapState(["logged", "permissions"])
};
</script>

<style scoped></style>
