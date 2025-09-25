import { nanoid } from "nanoid";
import CustomNode from "./CustomNode";

// Node types for ReactFlow
export const nodeTypesMap = {
  message: CustomNode,
};

// Node registry for node creation 
export const nodeRegistry = [
  {
    type: "message",
    label: "Message Node",
    icon: "💬",
    title: "Text Message",
    create: (position) => ({
      id: nanoid(),
      type: "message",
      position,
      data: {
        label: "Send Message",
        text: "text",
      },
    }),
  },
];