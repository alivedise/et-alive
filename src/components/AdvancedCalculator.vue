<template>
  <v-container>
    <v-container>
      <v-row class="test">
        <CompMachList @update="updateUrl" />
        <v-sheet class="echo-layout" height="600px">
          <v-card
            width="180px"
            class="flex"
            :key="i"
            outlined
            v-for="e, i in calculator.echo"
            :data-index="i"
            @click="pick(i)"
          >
            <AppEcho v-if="e.id" :eid="e.id" width="180" />
            <v-container v-else fill-height>
              <v-row justify="center" align="center">
                <v-icon
                  x-large
                  color="silver darken-2"
                >
                  mdi-plus
                </v-icon>
              </v-row>
            </v-container>
          </v-card>
        </v-sheet>
      </v-row>
    </v-container>
    <Picker ref="picker" @choose="$updateActiveEcho" />
  </v-container>
</template>

<script>
import { directive as onClickaway } from "vue-clickaway";
import { mapActions, mapGetters, mapState } from 'vuex';
import Picker from './CalculatorEchoPicker.vue';
import CompMachList from './CompMachList.vue';
import AppEcho from './AppEcho.vue';

export default {
  name: "AdvancedCalculator",
  props: {
    compositionDataManager: {
      type: Object,
    },
  },
  directives: {
    onClickaway,
  },
  components: {
    Picker,
    AppEcho,
    CompMachList,
  },
  data: () => ({
    active: -1,
  }),
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
    pick(i) {
      this.active = i;
      this.$refs.picker.open();
    },
    $updateActiveEcho(e) {
      this.updateActiveEcho({ index: this.active, echo: e });
      this.updateUrl();
      this.active = -1;
      console.log(e);
    },
    $loadDataFromURL() {
      let { data } = this.$route.params;
      if (!data) {
        if (window.localStorage.getItem("gbmac-latest-id")) {
          this.displayLoadLocalData = true;
        }
        return;
      }
      this.loadData(data);
    },
    updateUrl() {
      this.$router.replace({
        name: "AdvacnedCalculatorData",
        params: { data: this.urldata },
      });
      this.saveData(this.urldata);
    },
  },
};
</script>

<style lang="less" scoped>
.grid(@n, @i:2) when (@i <= @n) {
  &:nth-child(@{i}) {
    grid-area: ~"sub@{i}";
  }
  .grid(@n,(@i + 1));
}

.test {
  position: relative;
}

.echo-name {
  background-color: rgba(0, 0, 255, 0.3) !important;
}
.machine-layout {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.echo-layout {
  .card {
    background-color: grey;
  }
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "sub1 . . . . sub8"
    "sub1 sub4 . . sub6 sub8"
    "sub2 sub4 . . sub6 sub9"
    "sub2 sub5 . . sub7 sub9"
    "sub3 sub5 . . sub7 sub10"
    "sub3 . . . . sub10";

    > div {
      backface-visibility: hidden;
      perspective: 2500px;
      &:nth-child(1) {
        grid-area: sub1;
      }
      &:nth-child(-n+5) {
        transform: rotateY(15deg);
      }
      &:nth-child(n+5) {
        transform: rotateY(-15deg);
      }
      &:nth-child(2) {
        transform: translate(-10px) rotateY(20deg);
      }
      &:nth-child(9) {
        transform: translate(10px) rotateY(-20deg);
      }
      .grid(10)
    }
}
</style>
