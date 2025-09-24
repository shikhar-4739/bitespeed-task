export const TEXT_MESSAGE_TYPE = "textMessage";

export function createTextMessageNode({ x = 0, y = 0, id = null } = {}) {
  const uid = id || `text-${Math.random().toString(36).slice(2, 9)}`;
  return {
    id: uid,
    type: TEXT_MESSAGE_TYPE,
    position: { x, y },
    data: { label: "Text Message", text: "Hello!" },
  };
}
