// Simple flow validation
export function validateFlow(nodes, edges) {
  // Check if any node has no outgoing connection
  for (let node of nodes) {
    const hasOutgoing = edges.some((e) => e.source === node.id);
    const hasIncoming = edges.some((e) => e.target === node.id);

    if (!hasIncoming && nodes.length > 1) {
      return { ok: false, error: `Node "${node.data.label}" is not connected.` };
    }

    if (!hasOutgoing && nodes.length > 1) {
      return { ok: false, error: `Node "${node.data.label}" has no outgoing edge.` };
    }
  }

  return { ok: true };
}
