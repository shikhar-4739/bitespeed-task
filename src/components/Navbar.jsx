import React from 'react';

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
      height: '60px',
      width: '100%',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
        <div>
          <h1 style={{ 
            margin: 0, 
            fontSize: '1.2rem', 
            fontWeight: 600, 
            color: '#111827' 
          }}>
            BiteSpeed Frontend Task
          </h1>
        </div>
    </nav>
  );
}