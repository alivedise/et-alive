<template>
  <v-container>
    <v-row>
      <v-btn
        @click.stop="showDrawer"
        v-show="composition.manager.compositions.length"
      >
        已儲存配置列表
      </v-btn>
      <v-btn
        @click="download"
      >
        下載配置圖
      </v-btn>
      <v-btn
        @click="copy"
      >
        取得分享網址
        <v-icon v-if="copied" color="green">
          mdi-check
        </v-icon>
      </v-btn>
      <v-btn
        @click="createNew"
        color="secondary"
      >
        新建
      </v-btn>
      <LatestDataLoader @load="loadLocal" />
    </v-row>
    <SavedCompositionList
      :drawer="drawer"
      ref="list"
      @load="load"
    />
    <AdvancedCalculator
      ref="calculator"
      @active="setActive"
    />
  </v-container>
</template>

<script>
import SavedCompositionList from '@/components/SavedCompositionList.vue';
import AdvancedCalculator from '@/components/AdvancedCalculator.vue';
import LatestDataLoader from '@/components/LatestDataLoader.vue';
import { mapState } from 'vuex';

export default {
  name: 'CalculatorContainer',
  components: {
    SavedCompositionList,
    AdvancedCalculator,
    LatestDataLoader,
  },
  data() {
    return {
      drawer: false,
      forceRefresed: false,
      copied: false,
    };
  },
  watch: {
    '$route.path'() {
      this.copied = false;
    },
  },
  computed: {
    ...mapState(['composition']),
  },
  methods: {
    copy() {
      const input = document.createElement('input');
      document.body.appendChild(input);
      input.value = window.location.href;
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      this.copied = true;
    },
    showDrawer() {
      this.$refs.list.drawer = true;
    },
    createNew() {
      this.$refs.calculator.emptyData();
    },
    load(data) {
      this.$refs.calculator.loadSpecificData(data);
    },
    loadLocal() {
      this.$refs.calculator.loadLocalData();
    },
    setActive(active) {
      this.$refs.list.active = active;
    },
    download() {
      this.$refs.calculator.download();
    },
    refresh() {
      this.$router.push({
        query: {
          t: new Date().getTime(),
        },
      }).then(() => {
        return this.$router.push({
          query: {},
        });
      }).then(() => {
        this.forceRefresed = true;
      });
    },
  },
};
</script>

<style>

</style>
