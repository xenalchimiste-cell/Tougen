import React from 'react';

const Header = () => {
  const links = ['Accueil', 'Personnages', 'Histoire', 'Manga'];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      padding: '2rem 4rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100,
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)'
    }}>
      <div style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: '0.1em'
      }}>
        TOUGEN ANKI
      </div>
      
      <nav>
        <ul style={{
          display: 'flex',
          gap: '2rem',
          listStyle: 'none',
          margin: 0,
          padding: 0
        }}>
          {links.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                transition: 'color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.color = 'var(--color-primary)'}
              onMouseOut={(e) => e.target.style.color = 'white'}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

