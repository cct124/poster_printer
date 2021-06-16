import { App, Component } from "vue";
import SvgIcon from "@/components/Basic/SvgIcon/index.vue"; // svg component
import { PrInput } from "@/components/Form";
import { PrButton } from "@/components/Basic";
import { LayerContainer } from "@/components/WorkArea";

const components = [
  ["SvgIcon", SvgIcon],
  ["PrInput", PrInput],
  ["PrButton", PrButton],
  ["LayerContainer", LayerContainer],
];

/**
 * 注册全局组件
 * @param app
 */
export function registereComponent(app: App<Element>): void {
  components.forEach((item) => {
    app.component(item[0] as string, item[1] as Component);
  });
}
