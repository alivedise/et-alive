<template>
  <div class="machine-base">
    <v-col id="mach-layout" align="center" justify="center">
      <v-card
        v-for="m, i in new Array(2)"
        :key=i
        @click="pick(i)"
        outlined
      >
        <AppEcho
          v-if="machList[i]"
          width="1000"
          height="300"
          :name="machList[i].name"
          position="top -100px center"
        />
        <v-container v-else>
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
    </v-col>
    <Picker ref="picker" @choose="$updateActiveMach" />
  </div>
</template>

<script>
import { directive as onClickaway } from "vue-clickaway";
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import Picker from './CalculatorMachPicker.vue';
import AppEcho from './AppEcho.vue';

export default {
  name: "CalculatorMachList",
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
  },
  data: () => ({
    active: -1,
  }),
  computed: {
    ...mapState(['calculator']),
    ...mapGetters('calculator', ['main', 'support', 'machList']),
    ...mapGetters('mach', ['machMapById']),
  },
  methods: {
    ...mapActions('calculator', ['updateActiveMach']),
    pick(i) {
      this.active = i;
      this.$refs.picker.open();
    },
    $updateActiveMach(e) {
      this.updateActiveMach({ index: this.active, mach: e });
      this.$emit('update');
      this.active = -1;
    },
  },
};
</script>

<style lang="less" scoped>
.machine-base {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

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

#mach-layout {
  .card {
    background-color: grey;
  }
  display: grid;
  max-width: 1000px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "sub1 sub1 sub1"
    "sub2 sub2 sub2";

    > div {
      &:nth-child(1) {
        grid-area: sub1;
      }
      .grid(5)
    }
}

#mach-layout-with-sub {
  .card {
    background-color: grey;
  }
  display: grid;
  max-width: 800px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "sub1 sub1 sub1"
    "sub2 sub2 sub2"
    "sub3 sub4 sub5";

    > div {
      &:nth-child(1) {
        grid-area: sub1;
      }
      .grid(5)
    }
}
</style>
