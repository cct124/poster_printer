import { DefineComponent } from "vue";

export declare module AppStore {
  interface Canvas {
    id: number;
    name: string;
    desc: string;
    active: boolean;
  }

  interface State {
    canvas: Canvas[];
    destroyCanvas: Canvas[];
    activeCanvasHistory: Set<number>;
  }

  interface TabsActiveChange {
    name: string;
    active: boolean;
  }
}
