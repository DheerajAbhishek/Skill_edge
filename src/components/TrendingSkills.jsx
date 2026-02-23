import React from 'react';
import { TrendingUp, Zap, Check } from 'lucide-react';
import './TrendingSkills.css';

const TrendingSkills = ({ field, skills, detectedSkills }) => {
    const skillsMatch = (userSkills, skill) => {
        return userSkills.some(s =>
            s.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(s.toLowerCase())
        );
    };

    return (
        <div className="section">
            <div className="section-heading-wrapper">
                <div className="section-heading">
                    <h2>Trending Skills 2026</h2>
                </div>
            </div>
            <p className="section-subtitle" style={{ textAlign: 'center' }}>Skills in high demand for your field</p>

            <div className="trending-grid">
                {/* Hot Skills */}
                <div className="trending-column card hot-column">
                    <div className="column-header hot">
                        <Zap size={20} />
                        <div>
                            <h4>Hot Skills</h4>
                            <p>High demand right now</p>
                        </div>
                    </div>
                    <div className="skills-list">
                        {skills.hot.map((skill, idx) => (
                            <div
                                key={idx}
                                className={`trending-skill ${skillsMatch(detectedSkills, skill) ? 'has-skill' : ''}`}
                            >
                                {skillsMatch(detectedSkills, skill) && <Check size={16} />}
                                <span>{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Growing Skills */}
                <div className="trending-column card growing-column">
                    <div className="column-header growing">
                        <TrendingUp size={20} />
                        <div>
                            <h4>Growing Skills</h4>
                            <p>Rising in demand</p>
                        </div>
                    </div>
                    <div className="skills-list">
                        {skills.growing.map((skill, idx) => (
                            <div
                                key={idx}
                                className={`trending-skill ${skillsMatch(detectedSkills, skill) ? 'has-skill' : ''}`}
                            >
                                {skillsMatch(detectedSkills, skill) && <Check size={16} />}
                                <span>{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Essential Skills */}
                <div className="trending-column card essential-column">
                    <div className="column-header essential">
                        <Check size={20} />
                        <div>
                            <h4>Essential Skills</h4>
                            <p>Must-have foundations</p>
                        </div>
                    </div>
                    <div className="skills-list">
                        {skills.essential.map((skill, idx) => (
                            <div
                                key={idx}
                                className={`trending-skill ${skillsMatch(detectedSkills, skill) ? 'has-skill' : ''}`}
                            >
                                {skillsMatch(detectedSkills, skill) && <Check size={16} />}
                                <span>{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendingSkills;
