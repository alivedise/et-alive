<template>
  <v-img
    v-bind="$props"
    v-if="echoName"
    :src="mappedSrc"
    :alt="echoName"
  >
    <slot />
  </v-img>
</template>

<script>
// import { mapState, mapGetters } from 'vuex';
import { sify } from 'chinese-conv';
import { mapGetters } from 'vuex';

export default {
  name: 'AppEcho',
  props: ['eid', 'name', 'width', 'height', 'position'],
  computed: {
    ...mapGetters('echo', ['echoMapById']),
    mappedSrc() {
      return this.localSrc;
    },
    echoName() {
      return this.name || this.echoMapById[+this.eid]?.name;
    },
    localSrc() {
      if (!this.echoName) {
        return;
      }
      return require(`@/images/${this.sify(this.echoName)}.png`);
    },
  },
  methods: {
    sify(x) {
      return sify(x);
    },
  },
}
</script>

<style>

</style>