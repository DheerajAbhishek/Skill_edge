import React from 'react';
import { Sparkles, Brain, Target, Zap } from 'lucide-react';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <div className="container">
                <div className="section-heading-wrapper">
                    <div className="section-heading">
                        <h2>About SKILLEDGE</h2>
                    </div>
                </div>

                <div className="about-content">
                    <div className="about-intro card">
                        <p className="intro-text">
                            SKILLEDGE is an advanced AI-powered resume intelligence platform designed to revolutionize the way you prepare for your career journey.
                            Our cutting-edge technology analyzes your resume, predicts your ideal career path, and prepares you for success in interviews.
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card card">
                            <div className="feature-icon">
                                <Brain size={32} color="#9b6bff" />
                            </div>
                            <h3>AI-Powered Analysis</h3>
                            <p>
                                Using advanced natural language processing and machine learning algorithms, we extract and analyze 100+ skills
                                from your resume to provide comprehensive insights into your professional profile.
                            </p>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon">
                                <Target size={32} color="#0A84FF" />
                            </div>
                            <h3>Career Path Prediction</h3>
                            <p>
                                Our intelligent system predicts your ideal career field based on your skills, experience, and industry trends.
                                Get personalized job recommendations and trending skills for 2026.
                            </p>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon">
                                <Sparkles size={32} color="#30D158" />
                            </div>
                            <h3>Interview Preparation</h3>
                            <p>
                                Receive AI-generated personalized interview questions, field-specific standard questions, and skill-based
                                technical questions to ace your next interview with confidence.
                            </p>
                        </div>

                        <div className="feature-card card">
                            <div className="feature-icon">
                                <Zap size={32} color="#FF9F0A" />
                            </div>
                            <h3>Instant Insights</h3>
                            <p>
                                Get real-time resume scoring, skills gap analysis, course recommendations, and visual analytics - all
                                processed instantly with 100% client-side execution for maximum privacy.
                            </p>
                        </div>
                    </div>

                    <div className="about-mission card">
                        <h3>Our Mission</h3>
                        <p>
                            At SKILLEDGE, we believe everyone deserves access to intelligent career guidance. Our mission is to democratize
                            professional development by providing free, AI-powered tools that help job seekers understand their strengths,
                            identify growth opportunities, and prepare effectively for their dream careers.
                        </p>
                    </div>

                    <div className="about-tech card">
                        <h3>Technology Stack</h3>
                        <ul className="tech-list">
                            <li><strong>React 18:</strong> Modern, responsive frontend framework</li>
                            <li><strong>PDF.js:</strong> Client-side PDF parsing for instant analysis</li>
                            <li><strong>Groq AI:</strong> LLaMA 3.3-70b-versatile for intelligent question generation</li>
                            <li><strong>Recharts:</strong> Beautiful data visualizations</li>
                            <li><strong>100% Client-Side:</strong> Your data never leaves your device</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
