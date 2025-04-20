import React from 'react';

function SinAcceso() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '2rem 3rem',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <h2 style={{ color: '#1f2937', fontSize: '1.5rem', marginBottom: '1rem' }}>
          No tienes acceso a esta página
        </h2>
      </div>
    </div>
  );
}

export default SinAcceso;
