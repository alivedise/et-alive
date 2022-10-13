<template>
  <v-alert dense text type="success" v-show="showHint" width="auto">
    是否回復上次配置資料？
    <v-btn @click="load"> 是 </v-btn>
    <v-btn @click="displayLoadLocalData = false"> 否 </v-btn>
  </v-alert>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'LatestDataLoader',
  data: () => ({
    displayLoadLocalData: true,
  }),
  computed: {
    ...mapState(['composition']),
    ...mapGetters('calculator', ['urldata']),
    showHint() {
      return this.displayLoadLocalData && this.composition.manager.hasLocalData;
    },
  },
  methods: {
    load() {
      this.displayLoadLocalData = false;
      this.$emit('load');
    },
  },
  watch: {
    urldata(v) {
      if (this.$route.params?.data) {
        this.displayLoadLocalData = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>
