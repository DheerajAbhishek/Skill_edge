import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { parsePDF, extractBasicInfo } from '../utils/pdfParser';
import { detectSkills, predictField, getRecommendedSkills } from '../utils/skillDetector';
import { calculateResumeScore, detectExperienceLevel } from '../utils/resumeScorer';
import './UploadSection.css';

const UploadSection = ({ onAnalysisComplete, isAnalyzing, setIsAnalyzing }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    setIsAnalyzing(true);

    try {
      // Parse PDF
      const { text, numPages } = await parsePDF(file);
      
      // Extract basic info
      const basicInfo = extractBasicInfo(text);
      
      // Detect skills
      const detectedSkills = detectSkills(text);
      
      // Predict field
      const field = predictField(detectedSkills);
      
      // Get recommended skills
      const recommendedSkills = getRecommendedSkills(field);
      
      // Calculate score
      const scoreResults = calculateResumeScore(text);
      
      // Detect experience level
      const experienceResults = detectExperienceLevel(text, numPages);
      
      // Prepare results
      const results = {
        fileName: file.name,
        resumeText: text,
        numPages,
        basicInfo,
        detectedSkills,
        field,
        recommendedSkills,
        score: scoreResults,
        experience: experienceResults
      };
      
      onAnalysisComplete(results);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Failed to analyze resume. Please ensure it\'s a valid text-based PDF.');
      setIsAnalyzing(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      fileInputRef.current.files = event.dataTransfer.files;
      handleFileSelect({ target: { files: [file] } });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="upload-section container">
      <div className="section-heading-wrapper fade-in">
        <div className="section-heading">
          <h2>Upload Your Resume</h2>
        </div>
      </div>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.125rem', marginBottom: '32px' }}>Get AI-powered insights, skill recommendations, and personalized career guidance</p>

      <div 
        className="upload-card card fade-in"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => !isAnalyzing && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          disabled={isAnalyzing}
        />
        
        {isAnalyzing ? (
          <div className="upload-content">
            <div className="loading-spinner"></div>
            <h3>Analyzing Your Resume...</h3>
            <p>This may take a few moments</p>
          </div>
        ) : (
          <div className="upload-content">
            <div className="upload-icon">
              <Upload size={48} />
            </div>
            <h3>Drop your PDF here or click to browse</h3>
            <p>Upload your resume in PDF format</p>
          </div>
        )}
      </div>

      <div className="features-grid fade-in">
        <div className="feature-item">
          <div className="feature-icon">🎯</div>
          <h4>Smart Analysis</h4>
          <p>AI-powered skill detection and scoring</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">💡</div>
          <h4>Personalized Tips</h4>
          <p>Get tailored recommendations</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">📊</div>
          <h4>Detailed Insights</h4>
          <p>Comprehensive resume breakdown</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🚀</div>
          <h4>Career Guidance</h4>
          <p>Job matches and interview prep</p>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
