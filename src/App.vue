<template>
  <v-app>
    <v-app-bar
      app
      dark
    >
      <h3 class="d-flex align-center">
        ETADB
      </h3>
      <v-tabs>
        <v-tab to="/revive">回想</v-tab>
        <v-tab to="/calculator">計算機</v-tab>
      </v-tabs>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/alivedise/et-alive"
        target="_blank"
        text
      >
        <span class="mr-2">v0.0.1 build-{{buildID}}</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <v-footer>
      <v-col
        class="text-center"
        cols="12"
      >
        <h5>The copyright of the data used on this site is owned by the following companies</h5>
        </h5>©光焰網路科技</h5>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  mounted() {
    window.app = this;
    this.fetchData().then(() => {
      setTimeout(() => {
        if (window.location.hash === '#/') {
          this.$router.push('/calculator');
        }
        const { data } = this.$route.params;
        if (data) {
          this.loadData(data);
        }
      }, 1000);
    });
  },
  computed: {
    buildID() {
      return process.env.VUE_APP_GIT_HASH;
    },
  },
  methods: {
    ...mapActions(['fetchData']),
    ...mapActions('calculator', ['loadData']),
  },
};
</script>
