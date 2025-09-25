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

export default function FlowCanvas({ setSelectedNode, selectedNode }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Load saved flow once on mount
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

  // Connect nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const defaultEdgeOptions = {
    style: { stroke: "#4b5563", strokeWidth: 2 },
    markerEnd: {
      type: "arrowclosed", // solid arrow
      color: "#4b5563",
    },
  };

  // Handle drop from NodesPanel
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

  // Handle node selection
  const onNodeClick = useCallback(
    (_, node) => {
      setSelectedNode({
        id: node.id,
        data: node.data,
        type: node.type,
        updateNodeData: (newData) => {
          setNodes((nds) =>
            nds.map((n) =>
              n.id === node.id ? { ...n, data: { ...n.data, ...newData } } : n
            )
          );
        },
      });
    },
    [setSelectedNode, setNodes]
  );

  // 🔹 Validate before saving
  const validateFlow = () => {
    const connectedTargets = new Set(edges.map((e) => e.target));
    const unconnectedNodes = nodes.filter((n) => !connectedTargets.has(n.id));
    return unconnectedNodes.length <= 1; 
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

  // Update the FlowCanvas when nodes change in parent component
  useEffect(() => {
    if (selectedNode && selectedNode.updated) {
      // Trigger a re-render to show updated node
      setNodes([...nodes]);
    }
  }, [selectedNode, nodes, setNodes]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
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
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        style={{ background: "#f9fafb" }}
      >
        <Background />
        <Controls />
        <button
          style={{
            position: "absolute",
            right: 20,
            top: 20,
            zIndex: 10,
            padding: "8px 16px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontWeight: "500",
            cursor: "pointer",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
          onClick={handleSave}
        >
          Save Flow
        </button>
      </ReactFlow>
    </div>
  );
}
