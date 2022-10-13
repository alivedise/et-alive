<template>
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
    <Picker ref="picker" @choose="$updateActiveEcho" />
  </v-sheet>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Picker from '@/components/CalculatorEchoPicker.vue';
import AppEcho from '@/components/AppEcho.vue';

export default {
  name: 'CompEchoList',
  components: {
    Picker,
    AppEcho,
  },
  data: () => ({
    active: -1,
  }),
  computed: {
    ...mapState(['calculator']),
  },
  methods: {
    ...mapActions('calculator', ['updateActiveEcho']),
    pick(i) {
      this.active = i;
      this.$refs.picker.open();
    },
    $updateActiveEcho(e) {
      this.updateActiveEcho({ index: this.active, echo: e });
      this.active = -1;
      this.$emit('update');
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

.echo-name {
  background-color: rgba(0, 0, 255, 0.3) !important;
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
