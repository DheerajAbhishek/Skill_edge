import React, { useRef } from 'react';
import { Upload, Target, Lightbulb, BarChart3, Rocket } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { parsePDF, extractBasicInfo } from '../utils/pdfParser';
import { detectSkills, predictField, getRecommendedSkills } from '../utils/skillDetector';
import { calculateResumeScore, detectExperienceLevel } from '../utils/resumeScorer';
import './UploadSection.css';

const UploadSection = ({ onAnalysisComplete, isAnalyzing, setIsAnalyzing }) => {
    const fileInputRef = useRef(null);
    const { currentUser } = useAuth();

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file');
            return;
        }

        // Check file size (700 KB limit for Firestore Base64)
        const maxSize = 700 * 1024; // 700 KB
        if (file.size > maxSize) {
            alert('File is too large! Please upload a PDF under 700 KB.');
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

            // Save to Firebase if user is logged in
            if (currentUser) {
                try {
                    // Convert PDF to Base64 String
                    const base64String = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = error => reject(error);
                    });

                    // Save metadata and Base64 string directly to Firestore
                    await addDoc(collection(db, 'resumes'), {
                        userId: currentUser.uid,
                        fileName: file.name,
                        resumeBase64: base64String, // Store file as Base64 instead of URL
                        score: scoreResults?.score || 0, // Fallback if score engine errors
                        role: field || 'Unknown Role', // Save predicted field/role
                        analysisData: {
                            basicInfo,
                            detectedSkills,
                            recommendedSkills,
                            experience: experienceResults,
                            scoreDetails: scoreResults
                        },
                        uploadedAt: serverTimestamp()
                    });
                } catch (fbError) {
                    console.error('Error saving to Firebase:', fbError);
                    // We don't block the UI if Firebase save fails, we just log it
                }
            }

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
                    <div className="feature-icon"><Target size={32} color="#0A84FF" /></div>
                    <h4>Smart Analysis</h4>
                    <p>AI-powered skill detection and scoring</p>
                </div>
                <div className="feature-item">
                    <div className="feature-icon"><Lightbulb size={32} color="#FF9F0A" /></div>
                    <h4>Personalized Tips</h4>
                    <p>Get tailored recommendations</p>
                </div>
                <div className="feature-item">
                    <div className="feature-icon"><BarChart3 size={32} color="#30D158" /></div>
                    <h4>Detailed Insights</h4>
                    <p>Comprehensive resume breakdown</p>
                </div>
                <div className="feature-item">
                    <div className="feature-icon"><Rocket size={32} color="#BF5AF2" /></div>
                    <h4>Career Guidance</h4>
                    <p>Job matches and interview prep</p>
                </div>
            </div>
        </div>
    );
};

export default UploadSection;
