import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { FileText, Calendar, ExternalLink, Trophy, AlertCircle } from 'lucide-react';
import './Profile.css';

const Profile = () => {
    const { currentUser } = useAuth();
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResumes = async () => {
            if (!currentUser) return;

            try {
                setLoading(true);
                const resumesRef = collection(db, 'resumes');
                // Note: orderBy requires a composite index if used with 'where' in Firestore.
                // If sorting fails, we might just sort on the client side for simplicity.
                const q = query(
                    resumesRef,
                    where('userId', '==', currentUser.uid)
                );

                const querySnapshot = await getDocs(q);
                const fetchedResumes = [];
                querySnapshot.forEach((doc) => {
                    fetchedResumes.push({ id: doc.id, ...doc.data() });
                });

                // Sort descending by uploadedAt on the client to avoid needing a Firestore composite index immediately
                fetchedResumes.sort((a, b) => b.uploadedAt?.toMillis() - a.uploadedAt?.toMillis());

                setResumes(fetchedResumes);
            } catch (err) {
                console.error("Error fetching resumes: ", err);
                setError('Failed to load past resumes.');
            } finally {
                setLoading(false);
            }
        };

        fetchResumes();
    }, [currentUser]);

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Unknown Date';
        const date = timestamp.toDate();
        return new Intl.DateTimeFormat('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        }).format(date);
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-success';
        if (score >= 60) return 'text-warning';
        return 'text-danger';
    };

    if (loading) {
        return (
            <div className="profile-container fade-in">
                <div className="profile-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading your profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container fade-in">
            <div className="profile-header">
                <div className="profile-avatar">
                    {currentUser?.displayName ? currentUser.displayName.charAt(0).toUpperCase() : <FileText />}
                </div>
                <div className="profile-info">
                    <h2>{currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}</h2>
                    <p>{currentUser?.email}</p>
                </div>
            </div>

            <div className="profile-content">
                <div className="section-title">
                    <h3>Your Uploaded Resumes</h3>
                    <span className="badge">{resumes.length} {resumes.length === 1 ? 'Resume' : 'Resumes'}</span>
                </div>

                {error && (
                    <div className="profile-error">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                {resumes.length === 0 && !error ? (
                    <div className="empty-state">
                        <FileText size={48} className="empty-icon" />
                        <h3>No resumes found</h3>
                        <p>Upload your first resume to see your analysis history here.</p>
                    </div>
                ) : (
                    <div className="resume-grid">
                        {resumes.map((resume) => (
                            <div key={resume.id} className="resume-card card">
                                <div className="resume-card-header">
                                    <div className="resume-icon-wrapper">
                                        <FileText size={24} className="resume-icon" />
                                    </div>
                                    <div className="resume-score">
                                        <Trophy size={16} className={getScoreColor(resume.score)} />
                                        <span className={`score-value ${getScoreColor(resume.score)}`}>
                                            {resume.score !== undefined && resume.score !== null ? `${resume.score}/100` : 'N/A'}
                                        </span>
                                    </div>
                                </div>

                                <h4 className="resume-filename" title={resume.fileName}>
                                    {resume.fileName}
                                </h4>

                                {resume.role && (
                                    <div className="resume-role" style={{ marginTop: '4px', marginBottom: '12px' }}>
                                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-tertiary)', padding: '4px 8px', borderRadius: '4px' }}>
                                            {resume.role}
                                        </span>
                                    </div>
                                )}

                                <div className="resume-meta">
                                    <div className="meta-item">
                                        <Calendar size={14} />
                                        <span>{formatDate(resume.uploadedAt)}</span>
                                    </div>
                                </div>

                                <div className="resume-actions">
                                    <a
                                        href={resume.resumeBase64 || '#'}
                                        download={resume.fileName}
                                        className="view-btn"
                                    >
                                        <ExternalLink size={16} />
                                        Download PDF
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
};

export default Profile;
