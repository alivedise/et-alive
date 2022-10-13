import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/revive',
  },
  {
    path: '/revive',
    name: 'Revive',
    component: () => import(/* webpackChunkName: "revive" */ '../components/ReviveDatabase.vue'),
    children: [
      {
        path: ':category',
        name: 'ReviveCategory',
        component: () => import(/* webpackChunkName: "revive" */ '../components/ReviveDatabase.vue'),
      },
    ],
  },
  {
    path: '/calculator',
    name: 'AdvacnedCalculator',
    component: () => import(/* webpackChunkName: "calculator" */ '../components/CalculatorContainer.vue'),
    children: [
      {
        path: ':data',
        name: 'AdvacnedCalculatorData',
        component: () => import(/* webpackChunkName: "calculator" */ '../components/CalculatorContainer.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
