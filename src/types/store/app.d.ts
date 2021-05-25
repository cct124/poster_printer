import { DefineComponent } from "vue";

export declare module AppStore {
  interface Canvas {
    id: number;
    name: string;
    desc: string;
    active: boolean;
  }

  interface Tool {
    name: string;
    icon: string;
    active: boolean;
  }

  interface State {
    canvas: Canvas[];
    destroyCanvas: Canvas[];
    activeCanvasHistory: Set<number>;
    tools: Tool[];
  }

  interface TabsActiveChange {
    name: string;
    active: boolean;
  }
}
