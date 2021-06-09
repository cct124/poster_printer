export default class ConctrolMatrix {
  private container: HTMLElement;
  private targer: HTMLElement;
  constructor({
    container,
    targer,
  }: {
    container: HTMLElement;
    targer: HTMLElement;
  }) {
    this.container = container;
    this.targer = targer;
  }
}
