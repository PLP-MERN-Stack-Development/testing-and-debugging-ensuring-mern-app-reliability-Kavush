import React from 'react';
import ReactDOM from 'react-dom/client';
import BugList from './components/BugList';

// Simple inline styles
const styles = {
  body: {
    margin: 0,
    padding: '20px',
    fontFamily: "Arial, sans-serif",
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  },
  heading: {
    color: '#333',
    marginBottom: '1rem',
    textAlign: 'center'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '0.5rem'
  }
};

// Apply body styles
Object.assign(document.body.style, styles.body);

const App = () => {
  const testServerConnection = async () => {
    try {
      const response = await fetch('/api/health');
      const data = await response.json();
      alert(`Server response: ${data.status}\nDatabase: ${data.database}`);
    } catch (error) {
      alert('Failed to connect to server. Make sure the server is running on port 5000.');
    }
  };

  const testBugsAPI = async () => {
    try {
      const response = await fetch('/api/bugs');
      const data = await response.json();
      alert(`Bugs API working! Found ${data.length} bugs`);
    } catch (error) {
      alert(`Bugs API error: ${error.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🐛 Bug Tracker App</h1>
      <p>MERN Stack Application - Fully Operational! 🚀</p>
      
      <div style={{ 
        background: '#f8f9fa', 
        padding: '1rem', 
        borderRadius: '8px', 
        margin: '1rem 0',
        borderLeft: '4px solid #28a745'
      }}>
        <h3>Server Status: ✅ Connected</h3>
        <div>
          <button onClick={testServerConnection} style={styles.button}>
            Test Server Connection
          </button>
          <button onClick={testBugsAPI} style={styles.button}>
            Test Bugs API
          </button>
        </div>
      </div>

      {/* Add BugList Component */}
      <BugList />

      <div style={{ marginTop: '2rem' }}>
        <h2>📋 Development Progress</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ padding: '0.5rem 0', fontSize: '1.1rem' }}>
            <span style={{marginRight: '0.5rem'}}>✅</span>
            Project setup complete
          </li>
          <li style={{ padding: '0.5rem 0', fontSize: '1.1rem' }}>
            <span style={{marginRight: '0.5rem'}}>✅</span>
            Client and server connected
          </li>
          <li style={{ padding: '0.5rem 0', fontSize: '1.1rem' }}>
            <span style={{marginRight: '0.5rem'}}>✅</span>
            Database integration complete
          </li>
          <li style={{ padding: '0.5rem 0', fontSize: '1.1rem' }}>
            <span style={{marginRight: '0.5rem'}}>✅</span>
            Bug tracking features
          </li>
          <li style={{ padding: '0.5rem 0', fontSize: '1.1rem' }}>
            <span style={{marginRight: '0.5rem'}}>⏳</span>
            User authentication
          </li>
          <li style={{ padding: '0.5rem 0', fontSize: '1.1rem' }}>
            <span style={{marginRight: '0.5rem'}}>⏳</span>
            Create bug functionality
          </li>
        </ul>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);