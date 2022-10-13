<template>
  <v-btn-toggle dense :value="value" light v-on="$listeners">
    <v-btn
      class="toggle"
      width="16px"
      height="15px"
      v-for="a, i in ATTRIBUTES.LIST"
      :key="i"
    >
      <v-card-text
        :style="{color: ATTRIBUTES[a].color}"
      >
        {{a}}
      </v-card-text>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
import ATTRIBUTES from '@/constants/attributes.json';

export default {
  name: 'AttributeChooser',
  props: {
    value: {
      default: -1,
    },
  },
  components: {
  },
  data() {
    return {
      ATTRIBUTES,
    };
  },
  computed: {
  },
};
</script>

<style lang="less">
.flex {
  display: flex;
}
.toggle {
  min-width: 40px !important;
}
/deep/ .v-item--active {
  border-color: red !;
}
</style>
