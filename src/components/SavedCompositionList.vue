<template>
  <v-navigation-drawer
    v-model="drawer"
    absolute
    temporary
    :style="{ 'z-index': 9999 }"
    v-show="composition.manager.compositions.length"
  >
    <v-list
      nav
      dense
    >
      <v-list-item :class="{
        primary: composition.session === comp.id,
      }" link v-for="comp in composition.manager.compositions" :key="comp.id" @click="load(comp)">
        <v-list-item-icon>
          <v-chip
            class="job text-center"
            small
            label
            :class="{
              primary: composition.session === comp.id,
            }"
            :color="ATTRIBUTES[comp.attribute] ? ATTRIBUTES[comp.attribute].color : 'black'"
          >
            {{ comp.preview.split('/')[0][0] }}
          </v-chip>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{comp.name || '(未命名)'}}</v-list-item-title>
          <v-list-item-subtitle>{{`${comp.preview.split('/').slice(1)}`}}</v-list-item-subtitle>
          <v-list-item-subtitle>{{ new Date(comp.timestamp).toLocaleDateString() }} {{new Date(comp.timestamp).toLocaleTimeString()}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import ATTRIBUTES from '@/constants/attributes';
import { mapState } from 'vuex';

export default {
  name: "SavedCompositionList",
  computed: {
    ...mapState(['composition']),
  },
  data() {
    return {
      drawer: false,
      ATTRIBUTES,
    };
  },
  methods: {
    load(comp) {
      this.drawer = false;
      if (this.active === comp.id) {
        this.$emit('close');
        return;
      }
      this.$emit('load', comp);
    },
  },
};
</script>

<style>
.job {
  min-width: 36px;
  text-align: center;
}
</style>
