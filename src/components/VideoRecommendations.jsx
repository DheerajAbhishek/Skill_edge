import React from 'react';
import { Youtube } from 'lucide-react';
import './VideoRecommendations.css';

const VideoRecommendations = ({ resumeVideos, interviewVideos }) => {
    const randomResumeVideo = resumeVideos[Math.floor(Math.random() * resumeVideos.length)];
    const randomInterviewVideo = interviewVideos[Math.floor(Math.random() * interviewVideos.length)];

    return (
        <div className="video-recommendations">
            {/* Resume Writing Tips */}
            <div className="section">
                <div className="section-heading-wrapper">
                    <div className="section-heading">
                        <h2>Resume Writing Tips</h2>
                    </div>
                </div>
                <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '2rem' }}>Expert advice to perfect your resume</p>

                <div className="video-container card">
                    <iframe
                        width="100%"
                        height="500"
                        src={randomResumeVideo}
                        title="Resume Writing Tips"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            {/* Interview Mastery */}
            <div className="section">
                <div className="section-heading-wrapper">
                    <div className="section-heading">
                        <h2>Interview Mastery</h2>
                    </div>
                </div>
                <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '2rem' }}>Tips to ace your interviews</p>

                <div className="video-container card">
                    <iframe
                        width="100%"
                        height="500"
                        src={randomInterviewVideo}
                        title="Interview Preparation"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default VideoRecommendations;
