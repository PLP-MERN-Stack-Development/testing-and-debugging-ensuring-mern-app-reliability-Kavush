import React, { useState, useEffect } from 'react';

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await fetch('/api/bugs');
        if (!response.ok) {
          throw new Error('Failed to fetch bugs');
        }
        const data = await response.json();
        setBugs(data);
      } catch (err) {
        setError(err.message);
        // Fallback data
        setBugs([
          { 
            _id: '1', 
            title: 'Login button not working', 
            description: 'The login button does nothing when clicked',
            status: 'open', 
            priority: 'high',
            createdAt: new Date().toISOString()
          },
          { 
            _id: '2', 
            title: 'Mobile responsive issue', 
            description: 'Layout breaks on mobile devices',
            status: 'in-progress', 
            priority: 'medium',
            createdAt: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBugs();
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading bugs...</div>;
  }

  if (error) {
    return (
      <div style={{ color: 'red', padding: '1rem' }}>
        Error: {error}
        <p>Using sample data for demonstration</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>🐛 Current Bugs ({bugs.length})</h2>
      
      {bugs.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <h3>🎉 No bugs found!</h3>
          <p>Everything is working perfectly!</p>
        </div>
      ) : (
        <div>
          {bugs.map(bug => (
            <div 
              key={bug._id}
              style={{
                border: '1px solid #ddd',
                padding: '1rem',
                margin: '0.5rem 0',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
                {bug.title}
              </h3>
              <p style={{ margin: '0.25rem 0', color: '#666' }}>
                {bug.description}
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  backgroundColor: bug.status === 'open' ? '#ffebee' : '#e8f5e8',
                  color: bug.status === 'open' ? '#c62828' : '#2e7d32',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: 'bold'
                }}>
                  Status: {bug.status}
                </span>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  backgroundColor: bug.priority === 'high' ? '#ffebee' : '#fff3e0',
                  color: bug.priority === 'high' ? '#c62828' : '#ef6c00',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: 'bold'
                }}>
                  Priority: {bug.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BugList;