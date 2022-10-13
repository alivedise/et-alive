<template>
  <v-btn-toggle dense :value="value" v-on="$listeners"
    :class="{vertical: !horizontal}"
  >
    <v-btn
      class="toggle"
      v-for="a, i in new Array(SUB_ECHO_MAX + 1).fill('')"
      :key="i"
      :value="i"
    >
      <v-card-text>
        {{i}}
      </v-card-text>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
const SUB_ECHO_MAX = 3;

export default {
  name: 'SubEchoLimitChooser',
  props: {
    value: {
      default: -1,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
  components: {
  },
  data() {
    return {
      SUB_ECHO_MAX,
    };
  },
  computed: {
  },
};
</script>

<style lang="less" scoped>
.flex {
  display: flex;
}
.v-btn-toggle.vertical {
  flex-direction: column !important;
}
.toggle {
  width: 12px !important;
}
</style>
