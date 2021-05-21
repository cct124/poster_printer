import { Router } from "vue-router";

/**
 * 路由守卫
 * @param router
 */
export function beforeEach(router: Router): void {
  router.beforeEach((to) => {
    if (to.meta && to.meta.background)
      document.body.style.setProperty(
        "--background-color",
        to.meta.background as string
      );
  });
}
