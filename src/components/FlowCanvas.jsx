"use client";
import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { nodeTypesMap, nodeRegistry } from "../nodes";

const STORAGE_KEY = "chatbot-flow";

export default function FlowCanvas({ setSelectedNode }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // 🔹 Load saved flow once on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { nodes: savedNodes, edges: savedEdges } = JSON.parse(saved);
        if (Array.isArray(savedNodes)) setNodes(savedNodes);
        if (Array.isArray(savedEdges)) setEdges(savedEdges);
      } catch (err) {
        console.error("Error parsing saved flow:", err);
      }
    }
  }, [setNodes, setEdges]);

  // 🔹 Connect nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // 🔹 Allow drag-over
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // 🔹 Handle drop from NodesPanel
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const nodeDef = nodeRegistry.find((n) => n.type === type);
      if (!nodeDef) return;

      const reactFlowBounds = event.target.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = nodeDef.create({ x: position.x, y: position.y });
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  // 🔹 Handle node selection
  const onNodeClick = useCallback(
    (_, node) => setSelectedNode(node),
    [setSelectedNode]
  );

  // 🔹 Validate before saving
  const validateFlow = () => {
    const connectedTargets = new Set(edges.map((e) => e.target));
    const unconnectedNodes = nodes.filter((n) => !connectedTargets.has(n.id));
    return unconnectedNodes.length <= 1; // ✅ only one unconnected allowed
  };

  // 🔹 Save to localStorage
  const handleSave = () => {
    if (!validateFlow()) {
      alert("Error: Multiple nodes have no incoming connections ❌");
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, edges }));
    alert("Flow saved ✅");
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypesMap}
      fitView
    >
      <Background />
      <Controls />
      <button
        style={{
          position: "absolute",
          right: 20,
          top: 20,
          zIndex: 10,
          padding: "6px 12px",
        }}
        onClick={handleSave}
      >
        Save Flow
      </button>
    </ReactFlow>
  );
}
