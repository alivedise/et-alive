<template>
  <v-img
    v-bind="$props"
    v-if="echoName"
    :src="mappedSrc"
    :alt="echoName"
  >
    <slot />
    <v-chip label outlined v-if="rawData" small>
      <v-icon color="red">
        mdi-heart
      </v-icon>
      {{rawData.attack}}
    </v-chip>
    <v-chip label outlined v-if="rawData" small>
      <v-icon color="yellow">
        mdi-sword
      </v-icon>
      {{rawData.attack}}
    </v-chip>
    <v-chip v-if="rawData" class="name" label light>
      {{echoName}}
    </v-chip>
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
    rawData() {
      return this.echoMapById[+this.eid];
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
};
</script>

<style less scoped>
.name {
  position: absolute;
  bottom: 0;
  right: 0;
  opacity: 0.5;
}

</style>