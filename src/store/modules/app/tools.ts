import { AppStore } from "@/types/store/app";
import { Tools } from "@/store/config";

const tools: AppStore.Tool[] = [
  {
    id: 1,
    name: "移动工具",
    icon: "move",
    active: true,
  },
  {
    id: 2,
    name: "横排文字工具",
    icon: "text_cursor",
    active: false,
  },
];

export const toolsStore = {
  state: {
    /**
     * 工具栏
     */
    tools,
  },
  mutations: {
    [Tools.activeTool](state: AppStore.State, id: number): void {
      state.tools.forEach((tool) => {
        tool.active = tool.id === id;
      });
    },
  },
};
