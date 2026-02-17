import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import './SkillsAnalysis.css';

const SkillsAnalysis = ({ detectedSkills, recommendedSkills, matchingSkills, missingSkills }) => {
    const matchPercentage = recommendedSkills.length > 0
        ? (matchingSkills.length / recommendedSkills.length) * 100
        : 0;

    return (
        <div className="section">
            <div className="section-heading-wrapper">
                <div className="section-heading">
                    <h2>Skills Analysis</h2>
                </div>
            </div>

            {/* Skills Overview */}
            <div className="skills-overview card">
                <h3>Your Current Skills</h3>
                <p className="skills-count">{detectedSkills.length} skills detected from your resume</p>

                <div className="skills-tags">
                    {detectedSkills.slice(0, 20).map((skill, idx) => (
                        <span key={idx} className="skill-tag detected">
                            {skill}
                        </span>
                    ))}
                    {detectedSkills.length > 20 && (
                        <span className="skill-tag more">+{detectedSkills.length - 20} more</span>
                    )}
                </div>
            </div>

            {/* Skills Match Progress */}
            <div className="skills-match card">
                <div className="match-header">
                    <h3>Skills Match for Recommended Field</h3>
                    <span className="match-percentage">{matchPercentage.toFixed(0)}% Match</span>
                </div>

                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${matchPercentage}%` }}
                    ></div>
                </div>

                <p className="match-info">
                    You have <strong>{matchingSkills.length}</strong> out of <strong>{recommendedSkills.length}</strong> recommended skills
                </p>
            </div>

            {/* Skills Breakdown */}
            <div className="skills-breakdown">
                <div className="skill-column card">
                    <div className="skill-header matching">
                        <CheckCircle size={20} />
                        <h4>Skills You Have ({matchingSkills.length})</h4>
                    </div>
                    <div className="skill-list">
                        {matchingSkills.length > 0 ? (
                            matchingSkills.map((skill, idx) => (
                                <div key={idx} className="skill-item matching">
                                    <CheckCircle size={16} />
                                    <span>{skill}</span>
                                </div>
                            ))
                        ) : (
                            <p className="empty-message">No matching skills found</p>
                        )}
                    </div>
                </div>

                <div className="skill-column card">
                    <div className="skill-header missing">
                        <AlertCircle size={20} />
                        <h4>Skills to Learn ({missingSkills.length})</h4>
                    </div>
                    <div className="skill-list">
                        {missingSkills.length > 0 ? (
                            missingSkills.map((skill, idx) => (
                                <div key={idx} className="skill-item missing">
                                    <XCircle size={16} />
                                    <span>{skill}</span>
                                </div>
                            ))
                        ) : (
                            <p className="empty-message">Great! You have all recommended skills</p>
                        )}
                    </div>
                </div>
            </div>

            {missingSkills.length > 0 && (
                <div className="skill-tip card">
                    <AlertCircle size={24} color="var(--system-blue)" />
                    <p>
                        <strong>Tip:</strong> Adding the missing skills to your resume will increase your chances of getting noticed by recruiters.
                        Consider taking courses or working on projects that help you gain these skills.
                    </p>
                </div>
            )}
        </div>
    );
};

export default SkillsAnalysis;
