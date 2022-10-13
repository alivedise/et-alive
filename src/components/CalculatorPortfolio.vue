<template>
  <v-container clas>
    <v-row class="mb-6">
      <v-col lg="3">
        <v-card
          flat
          class="mx-auto"
          :color="guessAttributeColor"
          dark
          max-width="400"
          height="120"
        >
          <v-card-title>
            {{main.nick}}
          <v-icon
          >
            mdi-cross
          </v-icon>
          {{support.nick}}
          </v-card-title>
          <v-card-actions>
            <v-list-item class="grow">
              <v-row
                align="center"
                justify="end"
              >
                <v-icon class="mr-1" color="red">
                  mdi-heart
                </v-icon>
                <span class="subheading mr-2">{{constHp}}</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1" color="yellow">
                  mdi-sword
                </v-icon>
                <span class="subheading">{{constAttack}}</span>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col lg="3">
        <v-card
          class="mx-auto"
          dark
          color="dark"
          height="120"
        >
          <v-card-text>
            <v-container>
              <v-row align="center" justify="center">
                <v-col>
                  <v-row class="text-h5">
                    {{attackBoost}}%
                  </v-row>
                  <v-row class="text-h7">
                    攻擊力
                  </v-row>
                </v-col>
                <v-col>
                  <v-row class="text-h5">
                    {{skillBoost}}%
                  </v-row>
                  <v-row class="text-h7">
                    技能攻擊
                  </v-row>
                </v-col>
                <v-col>
                  <v-row class="text-h5">
                    {{burstBoost}}%
                  </v-row>
                  <v-row class="text-h7">
                    爆發攻擊
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="action">
            <attribute-chooser :value="calculator.attribute" @change="$updateAttribute" />
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col lg="1">
        <v-card height="120" color="lime">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-row>
                    <v-badge color="primary" :content="'DA'" :offset-y="35">
                      <v-progress-circular
                        :indeterminate="false"
                        :rotate="90"
                        :size="50"
                        :width="12"
                        :value="daBoost"
                        color="primary"
                      >
                        <div class="text-h4">{{daBoost}}</div>%
                      </v-progress-circular>
                    </v-badge>
                  </v-row>
                  <v-row>
                    <v-badge color="orange" :content="'TA'" :offset-y="35">
                      <v-progress-circular
                        :indeterminate="false"
                        :rotate="90"
                        :size="50"
                        :width="12"
                        :value="taBoost"
                        color="orange"
                      >
                        <div class="text-h4">{{taBoost}}</div>%
                      </v-progress-circular>
                    </v-badge>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="2">
        <v-card
          class="mx-auto"
          light
          height="120"
          max-width="400"
        >
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-row>
                    <v-badge color="secondary" :content="'技能破限'" :offset-y="35">
                      <v-progress-circular
                        :indeterminate="false"
                        :rotate="90"
                        :size="50"
                        :width="12"
                        :value="skillLimitBoost"
                        color="secondary"
                      >
                        <div class="text-h4">{{skillLimitBoost}}</div>%
                      </v-progress-circular>
                    </v-badge>
                  </v-row>
                  <v-row>
                    <v-badge color="purple" :content="'爆發破限'" :offset-y="35">
                      <v-progress-circular
                        :indeterminate="false"
                        :rotate="90"
                        :size="50"
                        :width="12"
                        :value="burstLimitBoost"
                        color="purple"
                      >
                        <div class="text-h4">{{burstLimitBoost}}</div>%
                      </v-progress-circular>
                    </v-badge>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="3">
        <v-card
          flat
          class="mx-auto"
          color="silver"
          max-width="400"
          height="120"
        >
          <v-card-text>
            <v-sparkline
              v-show="!$vuetify.breakpoint.mobile"
              :value="hpCurveArray"
              :gradient="['#f72047', '#ffd200', '#1feaea']"
              :smooth="false"
              line-width="2"
              height="35"
              stroke-linecap="round"
              gradient-direction="top"
              :fill="false"
              type="trend"
              :auto-line-width="false"
              auto-draw
            ></v-sparkline>
          </v-card-text>
          <v-slider
            :min="1"
            class="slider"
            :value="calculator.hp"
            :thumb-label="true"
            @change="updateHp"
          />
          <v-card-actions>
            <v-list-item class="grow">
              <v-row
                align="center"
                justify="end"
              >
                <v-icon class="mr-1" color="yellow">
                  mdi-decagram
                </v-icon>
                <span class="subheading mr-2">{{criBoost}}%</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1" color="green">
                  mdi-arrow-up-right-bold
                </v-icon>
                <span class="subheading mr-2">{{calmBoost}}%</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1" color="red">
                  mdi-arrow-down-right-bold
                </v-icon>
                <span class="subheading">{{backwaterBoost}}%</span>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import AttributeChooser from '@/components/AttributeChooser.vue';

export default {
  name: 'CalculatorPortfolio',
  components: {
    AttributeChooser,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['calculator']),
    ...mapGetters('calculator', [
      'leaders', 'main', 'support', 'guessAttributeColor',
      'constHp', 'constAttack', 'attackBoost', 'skillBoost', 'burstBoost', 'daBoost', 'taBoost',
      'skillLimitBoost', 'burstLimitBoost', 'calmBoost', 'backwaterBoost', 'hpCurveArray',
      'criBoost',
    ]),
  },
  methods: {
    ...mapMutations('calculator', ['updateAttribute', 'updateHp']),
    $updateAttribute(i) {
      this.updateAttribute(i);
      window.___saver.updateUrl();
    },
  },
};
</script>

<style>
.flex {
  display: flex;
}
.slider {
  position: absolute;
  bottom: -35px;
  width: 100%;
}
</style>
