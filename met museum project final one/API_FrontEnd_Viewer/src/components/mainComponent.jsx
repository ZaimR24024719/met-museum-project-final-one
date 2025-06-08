import React from 'react';

const HomePage = () => {
  const floors = [1, 2];

  return (
    <div
      style={{
        fontFamily: 'Segoe UI, sans-serif',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundImage: 'url(/museum.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
        position: 'relative'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <header style={{ background: 'transparent', padding: '1rem' }}>
          <h1>🖼️ Inside The Met 🖼️</h1>
        </header>

        <main style={{ padding: '2rem', flex: 1 }}>
          <h2>Select a Floor</h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center'
            }}
          >
            {floors.map((floor) => (
              <a
                key={floor}
                href={`/floor${floor}`}
                style={{
                  background: '#0d6efd',
                  color: '#fff',
                  padding: '0.75rem 2rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '1.2rem',
                  width: '200px',
                  textAlign: 'center',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                }}
              >
                Floor {floor}
              </a>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;