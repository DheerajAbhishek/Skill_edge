import React from 'react';
import './Header.css';

const Header = ({ activeTab, onNavigate }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="brand-logo">SKILLEDGE</h1>
        <p className="brand-tagline">
          AI-Powered Resume Intelligence that analyzes skills, predicts career paths, and prepares you for interviews.
        </p>
        
        <nav className="nav-buttons">
          <button 
            className={`nav-btn ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => onNavigate('upload')}
          >
            Upload
          </button>
          <button 
            className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => onNavigate('about')}
          >
            About
          </button>
          <button 
            className={`nav-btn ${activeTab === 'feedback' ? 'active' : ''}`}
            onClick={() => onNavigate('feedback')}
          >
            Feedback
          </button>
          <button 
            className={`nav-btn ${activeTab === 'signout' ? 'active' : ''}`}
            onClick={() => alert('Sign out functionality - Demo only')}
          >
            Sign Out
          </button>
          <button className="nav-btn user-btn">
            Demo User
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
