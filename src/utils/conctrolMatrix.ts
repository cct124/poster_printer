enum EventType {
  wheel = "wheel",
  keydown = "keydown",
  keyup = "keyup",
  mousedown = "mousedown",
  mouseup = "mouseup",
}

export default class ConctrolMatrix {
  private container: HTMLElement;
  private targer: HTMLElement;
  private matrixOrigin = [1, 0, 0, 1, 0, 0];
  private keyboard = {
    AltLeft: false,
    mousedown: false,
  };
  private deviceListener: {
    target: Window | HTMLElement;
    type: EventType;
    // eslint-disable-next-line
    listener: (ev: any) => void;
    remove?: () => void;
  }[] = [];
  private floatPrecision = 1000;
  matrix: number[];
  scaleStep;

  constructor({
    container,
    targer,
    scaleStep = 0.15,
  }: {
    /**
     * 容器
     */
    container: HTMLElement;
    /**
     * 需要 matrix 控制的目标
     */
    targer: HTMLElement;

    /**
     * 缩放系数
     */
    scaleStep?: number;
  }) {
    this.container = container;
    this.targer = targer;
    this.scaleStep = scaleStep;

    this.matrix = new Proxy(this.matrixOrigin, {
      get: (target: number[], p: string | symbol, receiver: number[]) =>
        this.matrixProxyGet(target, p, receiver),
      set: (
        target: number[],
        p: string | symbol,
        value: number,
        receiver: number[]
      ) => this.matrixProxySet(target, p, value, receiver),
    });

    this.setTargerMatrix(this.matrixOrigin);

    this.inputDeviceListener();
  }

  /**
   * 将target位移到container的中间
   */
  center(): void {
    const x = this.container.offsetWidth / 2 - this.targer.offsetWidth / 2;
    const y = this.container.offsetHeight / 2 - this.targer.offsetHeight / 2;
    this.matrix[4] = x;
    this.matrix[5] = y;
  }

  /**
   * 设置 matrix 的值
   * @param matrix
   * @returns
   */
  set(matrix: number[]): number[] {
    this.matrix = matrix;
    this.setTargerMatrix(this.matrix);
    return this.matrix;
  }

  /**
   *  matrix Proxy 的get函数
   * @param target
   * @param p
   * @param receiver
   * @returns
   */
  private matrixProxyGet(
    target: number[],
    p: string | symbol,
    receiver: number[]
  ) {
    return Reflect.get(target, p, receiver);
  }

  /**
   *  matrix Proxy 的set函数
   * @param target
   * @param p
   * @param value
   * @param receiver
   * @returns
   */
  private matrixProxySet(
    target: number[],
    p: string | symbol,
    value: number,
    receiver: number[]
  ): boolean {
    if (parseInt(p as string) > 5)
      throw new Error("index cannot be greater than 5");
    const Result = Reflect.set(target, p, this.fp(value), receiver);
    this.setTargerMatrix(receiver);
    return Result;
  }

  /**
   * 设置 Matrix 元素的 style 属性上
   * @param matrix
   */
  private setTargerMatrix(matrix: number[]) {
    this.targer.style.transform = `matrix(${matrix.join()})`;
  }

  /**
   * 监听输入设备事件
   */
  private inputDeviceListener() {
    this.listeners(this.container, EventType.wheel, this.mouseWheel);
    this.listeners(window, EventType.keydown, this.altLeftHandle);
    this.listeners(window, EventType.keyup, this.altLeftHandle);
    this.listeners(this.container, EventType.mousedown, this.mousedownHandle);
    this.listeners(this.container, EventType.mouseup, this.mousedownHandle);

    this.deviceListener.forEach((handle) => {
      handle.target.addEventListener(handle.type, (...args) => {
        handle.listener.apply(this, args);
      });

      handle.remove = () => {
        handle.target.removeEventListener(handle.type, handle.listener);
      };
    });
  }

  /**
   * 销毁所有监听的事件
   */
  private destroyedInputDeviceListener() {
    this.deviceListener.forEach((handle) => {
      if (handle.remove) handle.remove();
    });
  }

  /**
   * 监听输入设备事件
   */
  private listeners(
    target: HTMLElement | Window,
    type: EventType,
    // eslint-disable-next-line
    listener: (ev: any) => void
  ) {
    this.deviceListener.push({ target, type, listener });
  }

  /**
   * 鼠标滚轮事件
   */
  private mouseWheel(ev: WheelEvent) {
    if (this.keyboard.AltLeft) {
      /**
       * 放大
       */
      if (ev.deltaY < 0) {
        this.matrix[0] += this.matrix[0] * this.scaleStep;
        this.matrix[3] += this.matrix[3] * this.scaleStep;
        /**
         * 缩小
         */
      } else {
        this.matrix[0] -= this.matrix[0] * this.scaleStep;
        this.matrix[3] -= this.matrix[3] * this.scaleStep;
      }
    }
  }

  /**
   * 左Alt键
   * @param ev
   * @returns
   */
  private altLeftHandle(ev: KeyboardEvent) {
    if (this.keyboard.AltLeft === (ev.type === EventType.keydown)) return;
    this.keyboard.AltLeft = ev.type === EventType.keydown;
  }

  /**
   * 鼠标左键
   * @param ev
   * @returns
   */
  private mousedownHandle(ev: MouseEvent) {
    console.log(ev);
    
    if (ev.buttons !== 1) return;
    if (this.keyboard.mousedown === (ev.type === EventType.mousedown)) return;
    this.keyboard.mousedown = ev.type === EventType.mousedown;

    console.log(this.keyboard.mousedown);
  }

  /**
   * 保留三位小数
   * @param val
   * @returns
   */
  private fp(val: number) {
    return Math.round(val * this.floatPrecision) / this.floatPrecision;
  }
}
