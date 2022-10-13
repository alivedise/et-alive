<template>
  <v-container>
    <v-container>
      <v-row class="test">
        <CompMachList @update="updateUrl" />
        <SubEchoList @update="updateUrl" />
        <CompEchoList @update="updateUrl" />
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
import { mapActions, mapGetters, mapState } from 'vuex';
import CompMachList from './CompMachList.vue';
import SubEchoList from './CalculatorSubEchoList.vue';
import CompEchoList from './CompEchoList.vue';

export default {
  name: 'AdvancedCalculator',
  directives: {
    onClickaway,
  },
  components: {
    CompMachList,
    CompEchoList,
    SubEchoList,
  },
  computed: {
    ...mapState(['calculator']),
    ...mapGetters('calculator', ['urldata']),
  },
  mounted() {
    // xxx: workaround not sure where to put global access router method.
    window.___saver = this;
  },
  methods: {
    ...mapActions('calculator', ['updateActiveEcho', 'loadData']),
    ...mapActions('composition', ['saveData']),
    updateUrl() {
      this.$router.replace({
        name: 'AdvacnedCalculatorData',
        params: { data: this.urldata },
      });
      this.saveData(this.urldata);
    },
  },
};
</script>

<style lang="less" scoped>
.test {
  position: relative;
}
</style>
