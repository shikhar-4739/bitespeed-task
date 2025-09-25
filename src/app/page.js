"use client";
import React, { useState, useEffect } from "react";
import FlowCanvas from "@/components/FlowCanvas";
import SettingsPanel from "@/components/SettingsPanel";
import NodesPanel from "@/components/NodesPanel";
import Navbar from "@/components/Navbar";
import "./globals.css";

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [lastSavedPayload, setLastSavedPayload] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("flowData");
    if (saved) {
      const { nodes: savedNodes, edges: savedEdges, savedAt } = JSON.parse(saved);
      setNodes(savedNodes || []);
      setEdges(savedEdges || []);
      setLastSavedPayload({ nodes: savedNodes, edges: savedEdges, savedAt });
    }
  }, []);

  const handleSave = (payload) => {
    setLastSavedPayload(payload);
    localStorage.setItem("flowData", JSON.stringify(payload));
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="content-container">
        <div className="flow-canvas-container">
          <FlowCanvas
            nodes={nodes}
            setNodes={setNodes}
            edges={edges}
            setEdges={setEdges}
            setSelectedNode={setSelectedNode}
          />
        </div>

        {/* right sidebar panel */}
        <div className="sidebar-panel">
          {selectedNode ? (
            <SettingsPanel
              selectedNode={selectedNode}
              setNodes={setNodes}
              nodes={nodes}
              onBack={() => setSelectedNode(null)}
            />
          ) : (
            <NodesPanel setNodes={setNodes} />
          )}
        </div>
      </div>
    </div>
  );
}