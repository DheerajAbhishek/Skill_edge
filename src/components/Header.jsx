import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="brand-logo">SKILLEDGE</h1>
        <p className="brand-tagline">
          AI-Powered Resume Intelligence that analyzes skills, predicts career paths, and prepares you for interviews.
        </p>
      </div>
    </header>
  );
};

export default Header;
