<template>
  <v-container id="my-build">
    <CalculatorPortfolio v-if="echo.ready && mach.ready" />
    <v-container>
      <v-row class="test" v-if="echo.ready && mach.ready">
        <CompMachList @update="updateUrl" />
        <SubEchoList @update="updateUrl" />
        <CompEchoList @update="updateUrl" />
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import domtoimage from 'dom-to-image';
import { directive as onClickaway } from 'vue-clickaway';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import CompMachList from './CompMachList.vue';
import SubEchoList from './CalculatorSubEchoList.vue';
import CompEchoList from './CompEchoList.vue';
import CalculatorPortfolio from './CalculatorPortfolio.vue';

export default {
  name: 'AdvancedCalculator',
  directives: {
    onClickaway,
  },
  components: {
    CompMachList,
    CompEchoList,
    SubEchoList,
    CalculatorPortfolio,
  },
  computed: {
    ...mapState(['calculator', 'composition', 'echo', 'mach']),
    ...mapGetters('calculator', ['urldata']),
  },
  mounted() {
    // xxx: workaround not sure where to put global access router method.
    window.___saver = this;
  },
  methods: {
    ...mapActions('calculator', ['updateActiveEcho', 'loadData']),
    ...mapActions('composition', ['saveData']),
    ...mapMutations('composition', ['updateSession']),
    updateUrl() {
      this.$router.replace({
        name: 'AdvacnedCalculatorData',
        params: { data: this.urldata },
      });
      this.saveData(this.urldata);
    },
    download() {
      domtoimage
        .toJpeg(document.getElementById('my-build'))
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `build-${new Date().getTime()}.jpeg`;
          link.href = dataUrl;
          link.click();
        });
    },
    loadLocalData() {
      this.updateSession(+this.composition.manager.getLatestId());

      this.$router.replace(
        {
          name: "AdvacnedCalculatorData",
          params: { data: this.composition.manager.getLatestData() },
        },
        () => {
          this.loadData(this.composition.manager.getLatestData());
          this.$emit("active", this.composition.session);
        },
      );
    },
    emptyData() {
      this.$router.replace(
        {
          name: "AdvacnedCalculatorData",
          params: { data: '' },
        },
        () => {
          this.$nextTick(() => {
            window.location.reload();
          });
        },
      );
    },
    loadSpecificData(data) {
      this.displayLoadLocalData = false;
      this.updateSession(+data.id);
      if (this.urldata === data.data) {
        return;
      }
      this.loading = true;
      this.$router.replace(
        {
          name: "AdvacnedCalculatorData",
          params: { data: data.data },
        },
        () => {
          this.$nextTick(() => {
            this.loadData(data.data);
            this.loading = false;
          });
        },
      );
    },
  },
};
</script>

<style lang="less" scoped>
.test {
  position: relative;
}
</style>
