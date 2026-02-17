import React from 'react';
import { Briefcase, ExternalLink } from 'lucide-react';
import './JobOpportunities.css';

const JobOpportunities = ({ jobs, getJobUrls }) => {
  return (
    <div className="section">
      <div className="section-heading-wrapper">
        <div className="section-heading">
          <h2>Job Opportunities</h2>
        </div>
      </div>
      <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '2rem' }}>Roles that match your skills and experience level</p>

      <div className="jobs-grid">
        {jobs.map((job, idx) => {
          const urls = getJobUrls(job.title);
          return (
            <div key={idx} className="job-card card">
              <h3>{job.title}</h3>
              <div className="job-badges">
                <span className="job-level">{job.level}</span>
                <span className="job-salary">{job.salary}</span>
              </div>
              <p className="job-description">{job.description}</p>
              <div className="job-skills">
                <strong>Skills:</strong> {job.skills.join(', ')}
              </div>
              <div className="job-platforms">
                <a href={urls.naukri} target="_blank" rel="noopener noreferrer" className="platform-btn">
                  <ExternalLink size={14} />
                  Naukri
                </a>
                <a href={urls.linkedin} target="_blank" rel="noopener noreferrer" className="platform-btn">
                  <ExternalLink size={14} />
                  LinkedIn
                </a>
                <a href={urls.indeed} target="_blank" rel="noopener noreferrer" className="platform-btn">
                  <ExternalLink size={14} />
                  Indeed
                </a>
                <a href={urls.glassdoor} target="_blank" rel="noopener noreferrer" className="platform-btn">
                  <ExternalLink size={14} />
                  Glassdoor
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobOpportunities;
