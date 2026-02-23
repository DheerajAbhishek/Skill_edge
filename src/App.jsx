import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import SideNav from './components/SideNav';
import UploadSection from './components/UploadSection';
import ResultsDisplay from './components/ResultsDisplay';
import About from './components/About';
import Feedback from './components/Feedback';
import Profile from './components/Profile';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function MainDashboard() {
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'about':
                return <About />;
            case 'feedback':
                return <Feedback />;
            case 'profile':
                return <Profile />;
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
            <SideNav
                activeTab={activeTab}
                onNavigate={handleNavigate}
                hasResults={analysisResults !== null && activeTab === 'upload'}
            />

            <div className="app-content">
                <Header />

                <main className="main-content">
                    {renderContent()}
                </main>

                <footer className="footer">
                    <div className="container">
                        <p>© 2026 skilledge. AI-powered resume analysis.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={
                        <ProtectedRoute>
                            <MainDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
