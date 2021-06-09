export default class Canvas {
  public canvasElement: HTMLCanvasElement;
  public context2D: CanvasRenderingContext2D;
  private background: string;
  constructor({
    width = 300,
    height = 300,
    elementOptions = {},
    canvasOptions = {},
    background = "#ffffff",
  }: {
    width?: number;
    height?: number;
    elementOptions?: ElementCreationOptions;
    canvasOptions?: CanvasRenderingContext2DSettings;
    background?: string;
  } = {}) {
    this.canvasElement = document.createElement("canvas", elementOptions);
    this.canvasElement.width = width;
    this.canvasElement.height = height;
    this.background = background;
    // eslint-disable-next-line
    this.context2D = this.canvasElement.getContext("2d", canvasOptions)!;
    this.context2D.fillStyle = this.background;
    this.context2D.fillRect(0, 0, width, height);
  }

  private init() {
    console.log();
  }
}
