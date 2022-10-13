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
      <v-subheader>Choose Mach</v-subheader>
      <attribute-chooser :value="attribute" @change="update" />
      <v-container>
        <v-row>
          <v-card
            v-for="e in filterMach"
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
  name: 'CalculatorMachPicker',
  data: () => ({
    opened: false,
    attribute: -1,
  }),
  components: {
    AppEcho,
    AttributeChooser,
  },
  methods: {
    open() {
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
    ...mapState(['mach', 'calculator']),
    filterMach() {
      return this.mach.data.filter((d) => {
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
