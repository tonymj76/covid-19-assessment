<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">

        <!-- <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
      </div>
      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'App',

  components: {
    HelloWorld
  },

  data: () => ({
    //
  })
};
</script>

<style lang="scss">
  #app {
    background-image: url('./assets/sty.jpg');
    z-index: -999;
    height: 100vh;
    width: 100;
  }
</style>
