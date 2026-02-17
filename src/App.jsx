import React, { useState } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import ResultsDisplay from './components/ResultsDisplay';
import About from './components/About';
import Feedback from './components/Feedback';
import './App.css';

function App() {
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');

  const handleAnalysisComplete = (results) => {
    setAnalysisResults(results);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setAnalysisResults(null);
    setIsAnalyzing(false);
  };

  const handleNavigate = (tab) => {
    setActiveTab(tab);
    // Reset analysis results when navigating away from upload
    if (tab !== 'upload') {
      setAnalysisResults(null);
      setIsAnalyzing(false);
    }
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'about':
        return <About />;
      case 'feedback':
        return <Feedback />;
      case 'upload':
      default:
        return !analysisResults ? (
          <UploadSection 
            onAnalysisComplete={handleAnalysisComplete}
            isAnalyzing={isAnalyzing}
            setIsAnalyzing={setIsAnalyzing}
          />
        ) : (
          <ResultsDisplay 
            results={analysisResults}
            onReset={handleReset}
          />
        );
    }
  };

  return (
    <div className="app">
      <Header activeTab={activeTab} onNavigate={handleNavigate} />
      
      <main className="main-content">
        {renderContent()}
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>© 2026 skilledge. AI-powered resume analysis.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
