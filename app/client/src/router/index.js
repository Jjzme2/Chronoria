import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Home Page
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    // Catch All
    {
      path: "/:catchAll(.*)",
      name: "error",
      redirect: { name: "home" },
    },
  ],
});

export default router;
