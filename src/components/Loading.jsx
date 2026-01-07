import React from 'react';

const Loading = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: '#000',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      color: 'var(--color-primary)',
      fontSize: '2rem',
      fontFamily: 'var(--font-serif)'
    }}>
      Loading...
    </div>
  );
};

export default Loading;

