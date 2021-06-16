import CanvasClass from "@/plugin/canvas/Canvas";

enum LayerType {
  background = "background",
  image = "image",
  text = "text",
}

export default class Layer {
  private canvas: CanvasClass;
  private index = 0;
  layers: Layer.LayerMeta[] = [];
  constructor({ canvas }: Layer.Constructor) {
    this.canvas = canvas;
  }

  /**
   * 创建背景图层
   */
  createBackground(backgroundColor: string): Layer {
    if (this.layers.map((l) => l.type).includes(LayerType.background))
      return this;
    this.index++;

    this.layers.push({
      index: this.index,
      type: LayerType.background,
      meta: {
        color: backgroundColor,
      },
    });

    return this;
  }
}
