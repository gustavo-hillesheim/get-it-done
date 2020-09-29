import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import PageLayout from "../views/PageLayout.vue";
import TaskBoardPage from "../views/TaskBoardPage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "layout",
    component: PageLayout,
    children: [
      {
        path: "board",
        name: "board",
        component: TaskBoardPage,
      },
      {
        path: "**",
        redirect: "board",
      },
    ],
  },
  {
    path: "**",
    redirect: "board",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
