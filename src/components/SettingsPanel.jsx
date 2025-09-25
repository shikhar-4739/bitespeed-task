"use client";
import React, { useEffect, useState } from "react";

export default function SettingsPanel({ selectedNode, onBack }) {
  const [localData, setLocalData] = useState({});

  // Update local data when selected node changes
  useEffect(() => {
    if (selectedNode && selectedNode.data) {
      setLocalData(selectedNode.data);
    }
  }, [selectedNode]);

  if (!selectedNode) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Update local state immediately for responsive UI
    setLocalData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update the actual node data
    if (selectedNode.updateNodeData) {
      selectedNode.updateNodeData({ [name]: value });
    } else {
      console.error("updateNodeData function is not available");
    }
  };

  return (
    <div className="settings-panel" style={{
      padding: "16px",
      height: "100%"
    }}>
      <div className="panel-header">
        <button 
          onClick={onBack} 
          className="button secondary"
          style={{ 
            padding: '6px 12px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            background: 'transparent',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontSize: '0.9rem'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#f5f5f5'}
          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <span style={{ marginRight: '6px' }}>←</span> Back to Nodes
        </button>
      </div>
      
      <div className="settings-title" style={{
        fontSize: '1.2rem',
        fontWeight: '600',
        marginBottom: '20px',
        color: '#333',
        borderBottom: '1px solid #eee',
        paddingBottom: '12px'
      }}>
        Node Settings
      </div>
      
      <div className="settings-block" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '18px'
      }}>
        <div className="form-group">
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            fontSize: '0.95rem',
            color: '#444'
          }}>
            Label:
          </label>
          <input
            type="text"
            name="label"
            value={localData.label || ""}
            onChange={handleChange}
            style={{ 
              width: "100%", 
              padding: "10px 12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              fontSize: "0.95rem",
              boxSizing: "border-box",
              transition: "border-color 0.2s ease",
              outline: "none"
            }}
            onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
            onBlur={(e) => e.target.style.borderColor = "#ddd"}
          />
        </div>
        
        <div className="form-group">
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            fontSize: '0.95rem',
            color: '#444'
          }}>
            Text:
          </label>
          <textarea
            name="text"
            value={localData.text || ""}
            onChange={handleChange}
            style={{ 
              width: "100%", 
              minHeight: "120px",
              padding: "10px 12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              fontSize: "0.95rem",
              fontFamily: "inherit",
              resize: "vertical",
              boxSizing: "border-box",
              transition: "border-color 0.2s ease",
              outline: "none"
            }}
            onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
            onBlur={(e) => e.target.style.borderColor = "#ddd"}
          />
        </div>
      </div>
    </div>
  );
}