import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, BookOpen, Target, Wrench } from 'lucide-react';
import { generateResumeBasedQuestions } from '../utils/skillQuestionsDB';
import { getFieldStandardQuestions } from '../utils/fieldQuestionsDB';
import './InterviewQuestions.css';

const InterviewQuestions = ({ aiQuestions, loadingQuestions, field, skills }) => {
    const [expandedAI, setExpandedAI] = useState({});
    const [expandedStandard, setExpandedStandard] = useState({});
    const [expandedSkill, setExpandedSkill] = useState({});

    const toggleAI = (index) => {
        setExpandedAI(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const toggleStandard = (index) => {
        setExpandedStandard(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const toggleSkill = (index) => {
        setExpandedSkill(prev => ({ ...prev, [index]: !prev[index] }));
    };

    // Get questions from both databases
    const fieldQuestions = getFieldStandardQuestions(field);
    const skillQuestions = generateResumeBasedQuestions(skills);

    return (
        <div className="section interview-section">
            <div className="section-heading-wrapper">
                <div className="section-heading">
                    <h2>Interview Preparation</h2>
                </div>
            </div>
            <p className="section-subtitle" style={{ textAlign: 'center' }}>AI-generated questions tailored for {field} roles</p>

            {/* AI-Powered Personalized Questions */}
            {aiQuestions && aiQuestions.length > 0 && (
                <div className="questions-group">
                    <div className="group-header ai-header">
                        <Sparkles size={20} />
                        <div className="header-content">
                            <h3><Target size={18} style={{ display: 'inline-block', marginRight: '8px' }} /> PERSONALIZED QUESTIONS (AI-POWERED)</h3>
                            <p className="header-subtitle">Questions based on YOUR resume - projects, certifications & skills</p>
                        </div>
                    </div>

                    <div className="questions-list">
                        {aiQuestions.map((q, idx) => (
                            <div key={idx} className="question-card card">
                                <div
                                    className="question-header"
                                    onClick={() => toggleAI(idx)}
                                >
                                    <span className="question-number ai-number"><Target size={16} style={{ display: 'inline-block', marginRight: '4px' }} /> Q{idx + 1}</span>
                                    <h4>{q.question}</h4>
                                    {expandedAI[idx] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>

                                {expandedAI[idx] && (
                                    <div className="question-details">
                                        {q.context && (
                                            <div className="detail-section">
                                                <strong>Why this question:</strong>
                                                <p>{q.context}</p>
                                            </div>
                                        )}
                                        {q.expected_points && (
                                            <div className="detail-section answer-points">
                                                <strong>Key points to cover:</strong>
                                                <p>{q.expected_points}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {loadingQuestions && (
                <div className="loading-questions card">
                    <div className="loading-spinner"></div>
                    <p>Generating personalized questions based on your resume...</p>
                </div>
            )}

            {/* Standard Field-Based Questions */}
            <div className="questions-group">
                <div className="group-header standard-header">
                    <BookOpen size={20} />
                    <div className="header-content">
                        <h3><BookOpen size={18} style={{ display: 'inline-block', marginRight: '8px' }} /> STANDARD INTERVIEW QUESTIONS</h3>
                        <p className="header-subtitle">Common questions for {field} roles</p>
                    </div>
                </div>

                <div className="questions-list">
                    {fieldQuestions.slice(0, 5).map((q, idx) => (
                        <div key={idx} className="question-card card">
                            <div
                                className="question-header"
                                onClick={() => toggleStandard(idx)}
                            >
                                <span className="question-number standard-number">Question {idx + 1}</span>
                                <h4>{q.q}</h4>
                                {expandedStandard[idx] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>

                            {expandedStandard[idx] && (
                                <div className="question-details">
                                    <div className="detail-section answer-section">
                                        <strong>Answer:</strong>
                                        <p>{q.a}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Skill-Specific Questions */}
            {skillQuestions.length > 0 && (
                <div className="questions-group">
                    <div className="group-header skill-header">
                        <Target size={20} />
                        <div className="header-content">
                            <h3><Wrench size={18} style={{ display: 'inline-block', marginRight: '8px' }} /> SKILL-SPECIFIC QUESTIONS</h3>
                            <p className="header-subtitle">Based on the skills detected in your resume</p>
                        </div>
                    </div>

                    <div className="questions-list skill-list">
                        {skillQuestions.map((q, idx) => (
                            <div key={idx} className="question-card card skill-card">
                                <div
                                    className="question-header"
                                    onClick={() => toggleSkill(idx)}
                                >
                                    <h4 className="skill-question-title">{q.q}</h4>
                                    {expandedSkill[idx] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </div>

                                {expandedSkill[idx] && (
                                    <div className="question-details">
                                        <div className="detail-section answer-section">
                                            <strong>Answer:</strong>
                                            <p>{q.a}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InterviewQuestions;
