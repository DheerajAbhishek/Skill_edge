import React, { useState, useEffect } from 'react';
import { RefreshCw, Download, TrendingUp, Award, Briefcase, Target } from 'lucide-react';
import ScoreCircle from './ScoreCircle';
import SkillsAnalysis from './SkillsAnalysis';
import InterviewQuestions from './InterviewQuestions';
import CoursesRecommendation from './CoursesRecommendation';
import VisualizationCharts from './VisualizationCharts';
import VideoRecommendations from './VideoRecommendations';
import TrendingSkills from './TrendingSkills';
import JobOpportunities from './JobOpportunities';
import { generateAIQuestions } from '../utils/groqAPI';
import { getCoursesByField, resumeVideos, interviewVideos } from '../utils/coursesData';
import { getTrendingSkills, getJobRecommendations, getJobSearchUrls } from '../utils/jobsAndTrends';
import './ResultsDisplay.css';

const ResultsDisplay = ({ results, onReset }) => {
  const [aiQuestions, setAiQuestions] = useState(null);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  useEffect(() => {
    if (results && results.detectedSkills.length > 0) {
      loadAIQuestions();
    }
  }, [results]);

  const loadAIQuestions = async () => {
    setLoadingQuestions(true);
    try {
      const questions = await generateAIQuestions(
        results.resumeText,
        results.detectedSkills,
        results.field,
        results.experience.level
      );
      setAiQuestions(questions);
    } catch (error) {
      console.error('Error loading AI questions:', error);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const { basicInfo, field, experience, score, detectedSkills, recommendedSkills } = results;
  const matchingSkills = recommendedSkills.filter(skill =>
    detectedSkills.some(ds => ds.toLowerCase().includes(skill.toLowerCase()))
  );
  const missingSkills = recommendedSkills.filter(skill =>
    !detectedSkills.some(ds => ds.toLowerCase().includes(skill.toLowerCase()))
  );

  return (
    <div className="results-container container fade-in">
      {/* Header Actions */}
      <div className="results-header">
        <h1>Resume Analysis Results</h1>
        <button className="btn-primary" onClick={onReset}>
          <RefreshCw size={18} />
          Analyze Another Resume
        </button>
      </div>

      {/* Basic Info Card */}
      <div id="basic-info" className="info-card card">
        <div className="info-gradient-bg"></div>
        <h3>Hello, {basicInfo.name || 'Candidate'}!</h3>
        <p>Here's what we found in your resume</p>
        
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Name</span>
            <span className="info-value">{basicInfo.name || 'Not found'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email</span>
            <span className="info-value">{basicInfo.email || 'Not found'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Phone</span>
            <span className="info-value">{basicInfo.phone || 'Not found'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Pages</span>
            <span className="info-value">{results.numPages}</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card card">
          <div className="metric-icon" style={{ background: 'linear-gradient(135deg, #0A84FF, #5E5CE6)' }}>
            <Target size={24} />
          </div>
          <div className="metric-content">
            <h4>{score.percentage.toFixed(0)}%</h4>
            <p>Resume Score</p>
            <span className="metric-badge" style={{ background: score.color }}>{score.rating}</span>
          </div>
        </div>

        <div className="metric-card card">
          <div className="metric-icon" style={{ background: 'linear-gradient(135deg, #BF5AF2, #FF375F)' }}>
            <TrendingUp size={24} />
          </div>
          <div className="metric-content">
            <h4>{detectedSkills.length}</h4>
            <p>Skills Found</p>
          </div>
        </div>

        <div className="metric-card card">
          <div className="metric-icon" style={{ background: 'linear-gradient(135deg, #30D158, #64D2FF)' }}>
            <Award size={24} />
          </div>
          <div className="metric-content">
            <h4>{matchingSkills.length}/{recommendedSkills.length}</h4>
            <p>Skills Match</p>
          </div>
        </div>

        <div className="metric-card card">
          <div className="metric-icon" style={{ background: 'linear-gradient(135deg, #FF9F0A, #FFD60A)' }}>
            <Briefcase size={24} />
          </div>
          <div className="metric-content">
            <h4>{experience.level}</h4>
            <p>Experience Level</p>
          </div>
        </div>
      </div>

      {/* Experience Analysis */}
      <div id="experience" className="section">
        <div className="section-heading-wrapper">
          <div className="section-heading">
            <h2>Experience Level Analysis</h2>
          </div>
        </div>
        <div className="experience-card card">
          <div className="experience-header">
            <h3>{experience.level}</h3>
            <span className="experience-score">Score: {experience.score}/100</span>
          </div>
          
          <div className="experience-details">
            <div className="detail-row">
              <span>Years Mentioned:</span>
              <strong>{experience.details.yearsMentioned || 0} years</strong>
            </div>
            <div className="detail-row">
              <span>Work Duration:</span>
              <strong>~{experience.details.workDurationYears || 0} years</strong>
            </div>
            {experience.details.graduationYear && (
              <div className="detail-row">
                <span>Graduation Year:</span>
                <strong>{experience.details.graduationYear}</strong>
              </div>
            )}
            <div className="detail-row">
              <span>Internship:</span>
              <strong>{experience.details.hasInternship ? 'Yes' : 'No'}</strong>
            </div>
            <div className="detail-row">
              <span>Job Indicators:</span>
              <strong>{experience.details.jobCount}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Field Prediction */}
      <div className="section">
        <div className="section-heading-wrapper">
          <div className="section-heading">
            <h2>Predicted Career Field</h2>
          </div>
        </div>
        <div className="field-card card">
          <div className="field-badge">{field}</div>
          <p>Based on your skills and experience, we predict you're looking for roles in <strong>{field}</strong></p>
        </div>
      </div>

      {/* Skills Analysis */}
      <div id="skills">
        <SkillsAnalysis 
          detectedSkills={detectedSkills}
          recommendedSkills={recommendedSkills}
          matchingSkills={matchingSkills}
          missingSkills={missingSkills}
        />
      </div>

      {/* Trending Skills 2026 */}
      <div id="trending">
        <TrendingSkills 
          field={field}
          skills={getTrendingSkills(field)}
          detectedSkills={detectedSkills}
        />
      </div>

      {/* Course Recommendations */}
      <div id="courses">
        <CoursesRecommendation 
          field={field}
          courses={getCoursesByField(field)}
        />
      </div>

      {/* Resume Score Breakdown */}
      <div id="score" className="section">
        <div className="section-heading-wrapper">
          <div className="section-heading">
            <h2>Resume Score Breakdown</h2>
          </div>
        </div>
        
        {/* Score Visual at Top */}
        <div className="score-visual-top">
          <ScoreCircle percentage={score.percentage} color={score.color} />
        </div>

        {/* Section Analysis Below */}
        <div className="score-sections">
          <h4>Section Analysis</h4>
          <div className="sections-list">
            {score.sections.map((section, idx) => (
              <div key={idx} className={`section-row ${section.hasIt ? 'has-it' : 'missing'}`}>
                <span className="section-icon">{section.hasIt ? '✓' : '✗'}</span>
                <span className="section-name">{section.name}</span>
                <span className="section-points">{section.points} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Analytics */}
      <VisualizationCharts 
        skills={detectedSkills}
        recommendedSkills={recommendedSkills}
        detectedSkills={detectedSkills}
        scoreData={score}
      />

      {/* Job Opportunities */}
      <div id="jobs">
        <JobOpportunities 
          jobs={getJobRecommendations(field, experience.level, detectedSkills)}
          getJobUrls={getJobSearchUrls}
        />
      </div>

      {/* Interview Questions */}
      <div id="interview">
        <InterviewQuestions 
          aiQuestions={aiQuestions}
          loadingQuestions={loadingQuestions}
          field={field}
          skills={detectedSkills}
        />
      </div>

      {/* Video Recommendations */}
      <div id="videos">
        <VideoRecommendations 
          resumeVideos={resumeVideos}
          interviewVideos={interviewVideos}
        />
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn-primary" onClick={onReset}>
          Analyze Another Resume
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
