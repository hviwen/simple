import BaseLayout from "@/layouts/base-layout/index.vue";
import BlankLayout from "@/layouts/blank-layout/index.vue";

export const layouts = {
  base: BaseLayout,
  blank: BlankLayout,
};

export const views = {
  // 403: () => import("@/views/_builtin/403/index.vue"),
  // 404: () => import("@/views/_builtin/404/index.vue"),
  // 500: () => import("@/views/_builtin/500/index.vue"),
  // "iframe-page": () => import("@/views/_builtin/iframe-page/[url].vue"),
  // login: () => import("@/views/_builtin/login/index.vue"),
  home: () => import("@/views/home/index.vue"),
}