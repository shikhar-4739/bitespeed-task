import TextMessageNode from "./TextMessageNode";
import { createTextMessageNode, TEXT_MESSAGE_TYPE } from "./textFactory";

export const nodeRegistry = [
  {
    type: TEXT_MESSAGE_TYPE,
    title: "Text Message",
    icon: "📝",
    create: createTextMessageNode,
    component: TextMessageNode,
  },
];

export const nodeTypesMap = nodeRegistry.reduce((acc, item) => {
  acc[item.type] = item.component;
  return acc;
}, {});
