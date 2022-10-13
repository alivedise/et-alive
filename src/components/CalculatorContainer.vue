<template>
  <v-container>
    <v-btn
      @click.stop="showDrawer"
      v-show="compositionDataManager.compositions.length"
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
      @click="refresh"
      color="secondary"
      v-show="false"
    >
      強制更新資料
    </v-btn>
    <v-btn v-if="name" outlined>
      {{name}}
    </v-btn>
    <SavedCompositionList
      :drawer="drawer"
      ref="list"
      :compositionDataManager="compositionDataManager"
      @load="load"
    />
    <CalculatorPortfolio />
    <AdvancedCalculator
      ref="calculator"
      :compositionDataManager="compositionDataManager"
      @active="setActive"
      @namechange="setName"
    />
  </v-container>
</template>

<script>
import SavedCompositionList from '@/components/SavedCompositionList.vue';
import AdvancedCalculator from '@/components/AdvancedCalculator.vue';
import MachineDataManager from '@/models/CompositionDataManager';
import CalculatorPortfolio from '@/components/CalculatorPortfolio.vue';

export default {
  name: 'CalculatorContainer',
  components: {
    SavedCompositionList,
    AdvancedCalculator,
    CalculatorPortfolio,
  },
  data() {
    return {
      compositionDataManager: new MachineDataManager(),
      drawer: false,
      forceRefresed: false,
      copied: false,
      name: '',
    };
  },
  watch: {
    '$route.path'() {
      this.copied = false;
    },
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
    setName(name) {
      this.name = name;
    },
    load(data) {
      this.$refs.calculator.loadMachineData(data);
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
