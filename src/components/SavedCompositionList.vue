<template>
  <v-navigation-drawer
    v-model="drawer"
    absolute
    temporary
    :style="{ 'z-index': 9999 }"
    v-show="compositionDataManager.compositions.length"
  >
    <v-list
      nav
      dense
    >
      <v-list-item :class="{
        primary: active === comp.id,
      }" link v-for="comp in compositionDataManager.compositions" :key="comp.id" @click="load(comp)">
        <v-list-item-icon>
          <v-chip class="job text-center" small label :class="{
            primary: active === comp.id,
          }">
            {{ comp.preview.split('/')[1][0] }}
          </v-chip>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{comp.name || '(未命名)'}}</v-list-item-title>
          <v-list-item-subtitle>{{`${comp.preview.split('/')[0]}/${comp.preview.split('/')[1]}`}}</v-list-item-subtitle>
          <v-list-item-subtitle>{{ new Date(comp.timestamp).toLocaleDateString() }} {{new Date(comp.timestamp).toLocaleTimeString()}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SavedCompositionList",
  props: {
    compositionDataManager: {
      type: Object,
    },
  },
  data() {
    return {
      active: -1,
      drawer: false,
    }
  },
  methods: {
    load(comp) {
      this.drawer = false;
      if (this.active === comp.id) {
        this.$emit('close');
        return;
      }
      this.active = comp.id;
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