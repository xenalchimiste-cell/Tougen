import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      padding: '4rem 2rem',
      background: '#050505',
      borderTop: '1px solid #222',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{
        fontSize: '2rem',
        fontFamily: 'var(--font-serif)',
        marginBottom: '1rem',
        color: 'white'
      }}>
        TOUGEN ANKI
      </div>
      
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Le sang ne ment jamais.
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
        {['Twitter', 'Instagram', 'Discord'].map(social => (
          <a key={social} href="#" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.3s' }}
             onMouseOver={e => e.target.style.color = 'var(--color-primary)'}
             onMouseOut={e => e.target.style.color = '#888'}>
            {social}
          </a>
        ))}
      </div>
      
      <div style={{ color: '#444', fontSize: '0.8rem' }}>
        © {new Date().getFullYear()} Fan Project - Inspiré par l'œuvre de Yura Urushibara.
      </div>
    </footer>
  );
};

export default Footer;

