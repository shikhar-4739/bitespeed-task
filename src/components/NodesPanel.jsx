"use client";
import React from "react";
import { nodeRegistry } from "../nodes";

export default function NodesPanel() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="nodes-panel"
      style={{
        padding: "16px",
        height: "100%",
        overflow: "auto",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="panel-header"
        style={{
          marginBottom: "20px",
          paddingBottom: "12px",
          borderBottom: "1px solid #eaeaea",
        }}
      >
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            color: "#333",
            margin: 0,
          }}
        >
          Select a Node
        </h3>
      </div>

      <div className="nodes-container">
        {nodeRegistry.map((node) => (
          <div
            key={node.type}
            className="node-item"
            draggable
            onDragStart={(event) => onDragStart(event, node.type)}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 16px",
              margin: "8px 0",
              background: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              cursor: "grab",
              transition: "all 0.2s ease",
              border: "1px solid #e0e0e0",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow =
                "0 4px 8px rgba(0,0,0,0.15)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              className="node-icon"
              style={{
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "12px",
                fontSize: "18px",
                background: "#f0f7ff",
                borderRadius: "6px",
                color: "#2563eb",
              }}
            >
              {node.icon}
            </div>
            <div className="node-info">
              <div style={{ fontWeight: "500" }}>{node.title}</div>
              {node.description && (
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#666",
                    marginTop: "2px",
                  }}
                >
                  {node.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div
        className="panel-footer"
        style={{
          marginTop: "16px",
          fontSize: "0.8rem",
          color: "#666",
          padding: "0 8px",
        }}
      >
        Tip: Connect nodes to build your flow
      </div>
    </div>
  );
}
