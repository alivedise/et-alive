<template>
  <v-bottom-sheet v-model="opened" width="100%" scrollable>
    <v-sheet
      class="text-center bottom-sheet"
      height="500px"
      width="100%"
    >
      <v-icon
        class="mt-6"
        text
        color="red"
        @click="close"
        left
      >
        mdi-close
      </v-icon>
      <v-subheader>Choose Echo</v-subheader>
      <attribute-chooser :value="attribute" @change="update" />
      <v-container>
        <v-row>
          <v-card
            v-for="e in filterEcho"
            :key="e.name"
            @click="choose(e)"
          >
            <AppEcho :name="e.name" width="300" height="50" />
            {{e.name}}
          </v-card>
        </v-row>
      </v-container>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import { mapState } from 'vuex';
import AppEcho from '@/components/AppEcho.vue';
import AttributeChooser from '@/components/AttributeChooser.vue';
import ATTRIBUTES from '@/constants/attributes.js';

export default {
  name: 'CalculatorEchoPicker',
  data: () => ({
    opened: false,
    attribute: -1,
    filterSubEcho: false,
  }),
  components: {
    AppEcho,
    AttributeChooser,
  },
  methods: {
    open(sub = false) {
      this.filterSubEcho = !!sub;
      this.attribute = this.calculator.attribute;
      this.opened = true;
    },
    close() {
      this.attribute = -1;
      this.opened = false;
    },
    choose(e) {
      this.$emit('choose', e);
      this.close();
    },
    update(i) {
      if (typeof i === 'undefined') {
        this.attribute = -1;
        return;
      }
      this.attribute = i;
    },
  },
  computed: {
    ...mapState(['echo', 'calculator']),
    filterEcho() {
      return this.echo.data.filter((d) => {
        if (this.filterSubEcho
          && (d.series.indexOf('神眠') < 0 && d.series.indexOf('天司') < 0 && d.series.indexOf('星垣') < 0)) {
          return false;
        }
        if (!this.filterSubEcho
          && (d.series.indexOf('神眠') >= 0 || d.series.indexOf('天司') >= 0)) {
          return false;
        }
        if (this.attribute === -1) {
          return true;
        }
        return ATTRIBUTES.getIndex(d.attribute) === this.attribute;
      });
    },
  },
};
</script>

<style lang="less">
.bottom-sheet {
  overflow-y: scroll !important;
}
</style>
