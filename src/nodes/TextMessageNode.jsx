"use client";
import React from "react";
import { Handle, Position } from "@xyflow/react";

export default function TextMessageNode({ data, isConnectable }) {
  return (
    <div style={{
      padding: 12,
      borderRadius: 8,
      background: "#fff",
      boxShadow: "0 4px 14px rgba(16,24,40,0.06)",
      minWidth: 200,
      lineHeight: 1.35,
    }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{data.label || "Message"}</div>
      <div style={{ whiteSpace: "pre-wrap", color: "#111827" }}>{data.text || "..."}</div>

      <Handle type="target" position={Position.Top} style={{ background: "#9ca3af" }} isConnectable={isConnectable} />
      <Handle type="source" position={Position.Bottom} style={{ background: "#9ca3af" }} isConnectable={isConnectable} />
    </div>
  );
}
