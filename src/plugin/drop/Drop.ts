interface Constructor {
  /**
   * 容器
   */
  container: HTMLElement;
}

export default class Drop {
  private container;
  constructor({ container }: Constructor) {
    this.container = container;
    this.container.addEventListener("drop", (ev) => this.dropEvent(ev));

    this.container.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  }

  private dropEvent(ev: DragEvent) {
    console.log(this);
    console.log(ev);
  }
}
