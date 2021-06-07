import { DefineComponent } from "vue";

export declare module AppStore {
  interface CreateCanvas {
    backgroundColor: string;
    height: number;
    title: string;
    width: number;
    widthUnit: string;
  }

  interface Canvas {
    id: number;
    name: string;
    desc: string;
    active: boolean;
    meta: CreateCanvas;
  }

  interface Tool {
    id: number;
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
