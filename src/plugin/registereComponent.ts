import { App, Component } from "vue";
import SvgIcon from "@/components/Basic/SvgIcon/index.vue"; // svg component
import { PrInput } from "@/components/Form";

const components = [
  ["SvgIcon", SvgIcon],
  ["PrInput", PrInput],
];

export function registereComponent(app: App<Element>): void {
  components.forEach((item) => {
    app.component(item[0] as string, item[1] as Component);
  });
}
