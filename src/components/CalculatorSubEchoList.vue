<template>
  <div class="sub-echo-base">
    <v-col
      id="sub-echo-layout"
      align="center"
      justify="center"
      v-if="!$vuetify.breakpoint.mobile"
    >
      <SubEchoLimitChooser :value="calculator.subEchoLimit" @change="$updateSubEchoLimit" />
      <v-card
        v-for="e, i in subEchoList"
        :key=i
        @click="pick(i)"
        outlined
        :disabled="i >= calculator.subEchoLimit"
      >
        <AppEcho
          width="100"
          height="100"
          v-if="e.id" :eid="e.id"
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
    <v-container v-else>
      <v-row>
        <SubEchoLimitChooser horizontal :value="calculator.subEchoLimit" @change="$updateSubEchoLimit" />
      </v-row>
      <v-row class="mb-6">
        <v-col sm="2">
          <v-card
            v-for="e, i in subEchoList"
            :key=i
            @click="pick(i)"
            outlined
            :disabled="i >= calculator.subEchoLimit"
          >
            <AppEcho
              width="100%"
              height="100"
              v-if="e.id" :eid="e.id"
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
      </v-row>
    </v-container>
    <Picker ref="picker" @choose="$updateActiveMach" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import Picker from './CalculatorEchoPicker.vue';
import AppEcho from './AppEcho.vue';
import LIMIT from '@/constants/echoLimit';
import SubEchoLimitChooser from './SubEchoLimitChooser.vue';

export default {
  name: 'CalculatorSubEchoList',
  components: {
    Picker,
    AppEcho,
    SubEchoLimitChooser,
  },
  data: () => ({
    active: -1,
    LIMIT,
  }),
  computed: {
    ...mapState(['calculator']),
    ...mapGetters('echo', ['echoMapById']),
    ...mapGetters('calculator', ['subEchoList']),
  },
  methods: {
    ...mapActions('calculator', ['updateActiveEcho']),
    ...mapMutations('calculator', ['updateSubEchoLimit']),
    pick(i) {
      this.active = i;
      this.$refs.picker.open(true);
    },
    $updateActiveMach(e) {
      this.updateActiveEcho({ index: this.active + LIMIT.MAIN_ECHO_LIMIT, echo: e });
      this.$emit('update');
      this.active = -1;
    },
    $updateSubEchoLimit(e) {
      this.updateSubEchoLimit(e);
      this.$emit('update');
      this.active = -1;
    },
  },
};
</script>

<style lang="less" scoped>
.sub-echo-base {
  width: 100%;
  height: auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

@media (min-width:961px) {
  .sub-echo-base {
    position: absolute;
    bottom: 0;
  }
}

#sub-echo-layout {
  display: flex;
  max-width: 400px;
}
</style>
