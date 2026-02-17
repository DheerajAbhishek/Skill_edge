import React, { useState } from 'react';
import { MessageSquare, Star } from 'lucide-react';
import './Feedback.css';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    experience: '',
    accuracy: '',
    features: '',
    improvements: '',
    recommend: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingClick = (rating) => {
    setFormData({
      ...formData,
      rating: rating
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your feedback! (This is a demo - no data is actually stored)');
    console.log('Feedback submitted:', formData);
  };

  return (
    <div className="feedback-page">
      <div className="container">
        <div className="section-heading-wrapper">
          <div className="section-heading">
            <h2>Share Your Feedback</h2>
          </div>
        </div>

        <p className="feedback-intro">
          We'd love to hear about your experience with SKILLEDGE! Your feedback helps us improve and serve you better.
        </p>

        <div className="feedback-container card">
          <form onSubmit={handleSubmit} className="feedback-form">
            {/* Basic Info */}
            <div className="form-section">
              <h3><MessageSquare size={20} /> Contact Information</h3>
              
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Rating */}
            <div className="form-section">
              <h3><Star size={20} /> Overall Rating</h3>
              <p className="section-description">How would you rate your overall experience with SKILLEDGE?</p>
              
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={40}
                    className={`star ${formData.rating >= star ? 'filled' : ''}`}
                    onClick={() => handleRatingClick(star)}
                    fill={formData.rating >= star ? '#FF9F0A' : 'none'}
                    color="#FF9F0A"
                  />
                ))}
              </div>
            </div>

            {/* Experience Questions */}
            <div className="form-section">
              <div className="form-group">
                <label htmlFor="experience">How was your experience using SKILLEDGE?</label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Tell us about your experience..."
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="accuracy">How accurate was the resume analysis?</label>
                <select
                  id="accuracy"
                  name="accuracy"
                  value={formData.accuracy}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="very-accurate">Very Accurate</option>
                  <option value="accurate">Accurate</option>
                  <option value="somewhat-accurate">Somewhat Accurate</option>
                  <option value="not-accurate">Not Accurate</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="features">Which feature did you find most valuable?</label>
                <select
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a feature</option>
                  <option value="skills-analysis">Skills Analysis</option>
                  <option value="ai-questions">AI Interview Questions</option>
                  <option value="career-prediction">Career Path Prediction</option>
                  <option value="trending-skills">Trending Skills</option>
                  <option value="job-opportunities">Job Opportunities</option>
                  <option value="course-recommendations">Course Recommendations</option>
                  <option value="resume-scoring">Resume Scoring</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="improvements">What improvements would you suggest?</label>
                <textarea
                  id="improvements"
                  name="improvements"
                  value={formData.improvements}
                  onChange={handleChange}
                  placeholder="Any suggestions for improvement..."
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label htmlFor="recommend">Would you recommend SKILLEDGE to others?</label>
                <select
                  id="recommend"
                  name="recommend"
                  value={formData.recommend}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="definitely">Definitely Yes</option>
                  <option value="probably">Probably Yes</option>
                  <option value="maybe">Maybe</option>
                  <option value="probably-not">Probably Not</option>
                  <option value="definitely-not">Definitely Not</option>
                </select>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Submit Feedback
            </button>

            <p className="demo-note">
              * This is a demo form. No data will be stored or transmitted.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
