<template>
  <div>
    <v-sheet color="white" elevation="1" height="100">
      <v-chip
        color="grey"
        label
        :text-color="category === key ? 'black':'white'"
        v-for="(value, key) in position"
        :key="key"
        :outlined="category === key"
        @click="updateCategory(`/revive/${key}`)"
      >
        <v-img height="30px" width="30px" :src="value.icon" />
        {{ $t(value.original) }}
      </v-chip>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="search"
              @change="updateQuery"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            />
          </v-col>
          <v-col>
            <v-chip-group
              v-model="labelFilter"
              @change="updateQuery"
              column
              multiple
            >
              <v-chip
                filter
                outlined
              >
                特定部件威力提升
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-skeleton-loader
      :loading="loading"
      type="table"
      :types="{
        'table-row': 'table-cell@12',
        'table-tbody': 'table-row-divider@20',
      }"
    >
      <v-data-table
        :headers="headers"
        :items="mappedParts"
        :items-per-page="20"
        item-key="key"
        class="elevation-1"
        :search="keyword"
        :sort-by="'attribute'"
        :sort-desc="true"
        :footer-props="{
          itemsPerPageOptions: [20, 30, 50, -1],
        }"
      >
        <template v-slot:item.image="{ item }">
        <v-img height="50" width="300" :src="require(`@/images/${sify(item.name)}.png`)" />
        </template>
      </v-data-table>
    </v-skeleton-loader>
  </div>
</template>

<script>
import axios from "axios";
import { sify } from 'chinese-conv';

export default {
  name: "ReviveDatabase",

  data: () => ({
    search: "",
    parts: [],
    partTypeMap: [],
    loading: true,
    showPositionPicker: false,
    headers: [
      { text: "ID", value: "id" },
      { text: "屬性", value: "attribute" },
      { text: "圖示", value: "image", sortable: false },
      { text: "名稱", value: "name" },
      { text: "耐力", value: "hp" },
      { text: "攻擊", value: "attack" },
    ],
    position: [],
    labelFilter: [],
    sify,
  }),

  computed: {
    mappedParts() {
      return this.parts.map((p) => {
        return {
          ...p,
          image: `@/images/${sify(p.name)}.png`,
        };
      });
    },

    category() {
      return this.$route.params.category;
    },

    filter() {
      return this.$route.query.label;
    },

    keyword() {
      return this.$route.query.keyword;
    },
  },

  watch: {
    keyword(val) {
      this.search = val;
    },
  },

  methods: {
    updateQuery() {
      this.$router.push({
        query: {
          keyword: this.search,
          label: this.labelFilter.join(','),
        },
      });
    },
    updateCategory(link) {
      if (this.category && link.indexOf(this.category) >= 0) {
        this.$router.push('/revive');
      } else {
        this.$router.push(link);
      }
    },
  },

  mounted() {
    window.app1 = this;
    this.$vuetify.theme.dark = false;
    const prefix = process.env.NODE_ENV === "production" ? "/et-alive/" : "/";
    axios
      .get(`${prefix}etdata.json`, {
        responseType: "json",
      })
      .then((data) => {
        this.loading = false;
        this.parts = data.data.data;
      });
    this.search = this.keyword;
    this.labelFilter = this.filter ? this.filter.split(',').map(i => +i) : [];
  },
};
</script>

<style lang="less" scoped>
.rainbow {
  @rainbow-colors: red, orange, yellow, green, blue;
  background: linear-gradient(to left, @rainbow-colors) !important;
}
</style>
