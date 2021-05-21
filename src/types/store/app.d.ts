import { DefineComponent } from "vue";

export declare module AppStore {
  interface Route {
    path: string;
    name: string;
    component: DefineComponent;
    meta: {
      title: string;
      desc: string;
      active: boolean;
    };
  }

  interface State {
    canvas: Route[];
  }
}
