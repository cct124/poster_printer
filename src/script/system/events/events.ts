import { VALIDCHANNELS } from "./config";

export default class IpcEvent {
  private ipcEventMap: Map<VALIDCHANNELS, Set<Function>>;

  constructor(maps?: [VALIDCHANNELS, Set<Function>][]) {
    this.ipcEventMap = maps ? new Map(maps) : new Map();
  }
}
