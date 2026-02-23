import React, { useState } from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import './CoursesRecommendation.css';

const CoursesRecommendation = ({ field, courses }) => {
    const [numRecommendations, setNumRecommendations] = useState(5);

    // Shuffle courses
    const shuffledCourses = [...courses].sort(() => Math.random() - 0.5);
    const displayedCourses = shuffledCourses.slice(0, numRecommendations);

    return (
        <div className="section">
            <div className="section-heading-wrapper">
                <div className="section-heading">
                    <h2>Recommended Courses</h2>
                </div>
            </div>
            <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '2rem' }}>Curated learning resources to boost your skills</p>

            <div className="courses-slider card">
                <label htmlFor="course-slider">Number of recommendations</label>
                <div className="slider-container">
                    <span>1</span>
                    <input
                        id="course-slider"
                        type="range"
                        min="1"
                        max="10"
                        value={numRecommendations}
                        onChange={(e) => setNumRecommendations(parseInt(e.target.value))}
                        className="course-slider"
                    />
                    <span>10</span>
                </div>
                <div className="slider-value">{numRecommendations} course{numRecommendations > 1 ? 's' : ''}</div>
            </div>

            <div className="courses-list">
                {displayedCourses.map((course, idx) => (
                    <a
                        key={idx}
                        href={course.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="course-card card"
                    >
                        <div className="course-content">
                            <div className="course-number">{idx + 1}</div>
                            <div className="course-info">
                                <h4>{course.name}</h4>
                                {course.link.includes('free') && (
                                    <span className="free-badge">FREE</span>
                                )}
                            </div>
                            <ExternalLink size={20} className="course-icon" />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default CoursesRecommendation;
