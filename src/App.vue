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

      <v-alert
        class="update-container"
        v-if="updateExists"
      >
        <v-btn @click="refreshApp" class="primary">
          Update
        </v-btn>
      </v-alert>

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
        </h5>©ORLESH</h5>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      refreshing: false,
      registration: null,
      updateExists: false,
    };
  },
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
          const session = this.composition.manager.getLatestId();
          if (session !== null) {
            this.updateSession(+session);
          }
        }
      }, 1000);
    });
  },
  computed: {
    ...mapState(['composition']),
    buildID() {
      return process.env.VUE_APP_GIT_HASH;
    },
  },
  methods: {
    ...mapActions(['fetchData']),
    ...mapActions('calculator', ['loadData']),
    ...mapMutations('composition', ['updateSession']),
    updateAvailable(event) {
      this.registration = event.detail;
      this.updateExists = true;
    },
    refreshApp() {
      this.updateExists = false;
      // Make sure we only send a 'skip waiting' message if the SW is waiting
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      // Send message to SW to skip the waiting and activate the new SW
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    },
  },
  created() {
    if (window.$_serviceWorkerUpdate) {
      this.updateAvailable({
        detail: window.$_serviceWorkerUpdate,
      });
    } else {
      document.addEventListener(
        'serviceWorkerUpdateEvent', this.updateAvailable, { once: true }
      );
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // We'll also need to add 'refreshing' to our data originally set to false.
        if (this.refreshing) {
          return;
        }
        this.refreshing = true;
        // Here the actual reload of the page occurs
        window.location.reload();
      });
    }
  },
};
</script>
