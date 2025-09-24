"use client";
import React from "react";

export default function SettingsPanel({ selectedNode, setNodes, nodes, onBack }) {
  // Find the latest node data from nodes array
  const node = nodes.find((n) => n.id === selectedNode.id) || selectedNode;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNodes((nds) =>
      nds.map((n) =>
        n.id === node.id ? { ...n, data: { ...n.data, [name]: value } } : n
      )
    );
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
            value={node.data.label || ""}
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
            value={node.data.text || ""}
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

        {/* Additional fields section */}
        {Object.entries(node.data || {}).map(([key, value]) => {
          // Skip label and text as they're already handled
          if (key === 'label' || key === 'text') return null;
          
          // Only render string/number values that can be edited in a text field
          if (typeof value !== 'string' && typeof value !== 'number') return null;
          
          return (
            <div className="form-group" key={key}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                fontSize: '0.95rem',
                color: '#444',
                textTransform: 'capitalize'
              }}>
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
              </label>
              <input
                type="text"
                name={key}
                value={value || ""}
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
          );
        })}
      </div>
      
      <div className="settings-actions" style={{
        marginTop: '24px',
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <button
          style={{
            padding: '8px 16px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#2563eb'}
          onMouseOut={(e) => e.currentTarget.style.background = '#3b82f6'}
          onClick={() => alert('Changes applied!')}
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
}