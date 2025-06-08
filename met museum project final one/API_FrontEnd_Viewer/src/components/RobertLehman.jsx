import React, { useState } from 'react';

const RobertLehman = () => {
  const [artworks, setArtworks] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const exhibitionId = 15;

  const fetchArtworks = async () => {
    try {
      const res = await fetch(`http://localhost:5000/exhibitions/${exhibitionId}/artworks`);
      const data = await res.json();
      setArtworks(data);
      setShowPanel(true);
    } catch (err) {
      console.error('Failed to fetch artworks:', err);
    }
  };

  const fetchArtworkDetails = async (objectID) => {
    try {
      const res = await fetch(`http://localhost:5000/artworks/${objectID}`);
      const data = await res.json();
      setSelectedArtwork(data);
    } catch (err) {
      console.error('Failed to fetch artwork details:', err);
    }
  };

  return (
    <>
      <button
        onClick={fetchArtworks}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Robert Lehman Collection
      </button>

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: showPanel ? 0 : '-420px',
          width: '400px',
          height: '100vh',
          backgroundColor: '#111',
          color: 'white',
          padding: '1rem',
          overflowY: 'auto',
          zIndex: 1000,
          transition: 'left 0.3s ease-in-out',
        }}
      >
        <button
          onClick={() => {
            setShowPanel(false);
            setSelectedArtwork(null);
          }}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: '#0dcaf0',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        <h2 style={{ color: '#0dcaf0', marginTop: 0 }}>Robert Lehman Collection</h2>
        <p>{artworks.length} artworks found</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {artworks.map((art) => (
            <li key={art.objectID} style={{ marginBottom: '1rem' }}>
              <div
                onClick={() => fetchArtworkDetails(art.objectID)}
                style={{
                  backgroundColor: '#222',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                <strong>{art.title}</strong>
                <p style={{ fontSize: '0.9rem' }}>By {art.artist}</p>
                {art.primaryImage ? (
                  <img
                    src={art.primaryImage}
                    alt={art.title}
                    style={{
                      width: '100%',
                      maxHeight: '150px',
                      objectFit: 'cover',
                      marginTop: '0.5rem',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      marginTop: '0.5rem',
                      height: '150px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#333',
                      color: '#999',
                      fontSize: '0.9rem',
                      fontStyle: 'italic',
                      borderRadius: '4px',
                    }}
                  >
                    No image available
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedArtwork && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '400px',
            height: '100vh',
            backgroundColor: '#222',
            color: 'white',
            padding: '1rem',
            overflowY: 'auto',
            zIndex: 1001,
            boxShadow: '-3px 0 10px rgba(0,0,0,0.4)',
          }}
        >
          <button
            onClick={() => setSelectedArtwork(null)}
            style={{
              float: 'right',
              color: '#0dcaf0',
              background: 'none',
              border: 'none',
              fontSize: '1.2rem',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>

          <h2>{selectedArtwork.title}</h2>
          {selectedArtwork.primaryImage ? (
            <img
              src={selectedArtwork.primaryImage}
              alt={selectedArtwork.title}
              style={{ width: '100%', marginBottom: '1rem' }}
            />
          ) : (
            <div
              style={{
                marginBottom: '1rem',
                height: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#444',
                color: '#ccc',
                fontSize: '1rem',
                fontStyle: 'italic',
                borderRadius: '4px',
              }}
            >
              No image available
            </div>
          )}
          <p><strong>Date:</strong> {selectedArtwork.objectDate}</p>
          <p><strong>Medium:</strong> {selectedArtwork.medium}</p>
          <p><strong>Dimensions:</strong> {selectedArtwork.dimensions}</p>
          <p><strong>Credit Line:</strong> {selectedArtwork.creditLine}</p>
          <p><strong>Accession Year:</strong> {selectedArtwork.accessionYear}</p>
          <p><strong>Artists:</strong></p>
          <ul>
            {selectedArtwork.artists.map((a, index) => (
              <li key={index}>
                {a.name} ({a.nationality}) – {a.lifespan}
              </li>
            ))}
          </ul>
          <a
            href={`https://www.metmuseum.org/art/collection/search/${selectedArtwork.objectID}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '1rem',
              backgroundColor: '#0dcaf0',
              color: '#000',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            View on Met Museum →
          </a>
        </div>
      )}
    </>
  );
};

export default RobertLehman;