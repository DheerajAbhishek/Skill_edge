import React, { useState, useEffect } from 'react';
import { Upload, Info, MessageSquare, User, Target, TrendingUp, BookOpen, BarChart3, Briefcase, MessageCircle, Youtube, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './SideNav.css';

const SideNav = ({ activeTab, onNavigate, hasResults }) => {
    const [activeSection, setActiveSection] = useState('');
    const { currentUser, logout } = useAuth();

    // Main navigation items (always visible)
    const mainNavItems = [
        { id: 'upload', label: 'Dashboard', icon: Upload, type: 'page' },
        { id: 'profile', label: 'Profile', icon: User, type: 'page' },
        { id: 'about', label: 'About', icon: Info, type: 'page' },
        { id: 'feedback', label: 'Feedback', icon: MessageSquare, type: 'page' }
    ];

    // Results sections (only visible when results are shown)
    const resultSections = [
        { id: 'basic-info', label: 'Basic Info', icon: User },
        { id: 'experience', label: 'Experience', icon: Target },
        { id: 'skills', label: 'Skills', icon: TrendingUp },
        { id: 'trending', label: 'Trending', icon: TrendingUp },
        { id: 'courses', label: 'Courses', icon: BookOpen },
        { id: 'score', label: 'Score', icon: BarChart3 },
        { id: 'jobs', label: 'Jobs', icon: Briefcase },
        { id: 'interview', label: 'Interview', icon: MessageCircle },
        { id: 'videos', label: 'Videos', icon: Youtube }
    ];

    useEffect(() => {
        if (!hasResults) return;

        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;

            for (const section of resultSections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasResults]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    const handleNavigation = (item) => {
        if (item.type === 'page') {
            onNavigate(item.id);
        } else {
            scrollToSection(item.id);
        }
    };

    return (
        <nav className="side-nav">
            <div className="side-nav-header">
                <div className="side-nav-logo">
                    <Upload size={24} />
                </div>
                <div className="side-nav-user">
                    <span className="user-role">
                        {currentUser?.displayName
                            ? currentUser.displayName.split(' ')[0]
                            : currentUser?.email?.split('@')[0] || 'User'}
                    </span>
                </div>
            </div>

            <div className="side-nav-content">
                {/* Main Navigation */}
                <div className="nav-section">
                    {mainNavItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                className={`side-nav-item ${activeTab === item.id ? 'active' : ''}`}
                                onClick={() => handleNavigation(item)}
                                title={item.label}
                            >
                                <Icon size={20} />
                                <span className="side-nav-label">{item.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Results Sections (only when results are shown) */}
                {hasResults && (
                    <>
                        <div className="nav-divider"></div>
                        <div className="nav-section">
                            <div className="nav-section-title">Analysis</div>
                            {resultSections.map((section) => {
                                const Icon = section.icon;
                                return (
                                    <button
                                        key={section.id}
                                        className={`side-nav-item ${activeSection === section.id ? 'active' : ''}`}
                                        onClick={() => scrollToSection(section.id)}
                                        title={section.label}
                                    >
                                        <Icon size={20} />
                                        <span className="side-nav-label">{section.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>

            <div className="side-nav-footer">
                <button
                    className="side-nav-item"
                    onClick={async () => {
                        try {
                            await logout();
                        } catch (error) {
                            console.error('Failed to log out', error);
                        }
                    }}
                    title="Sign Out"
                >
                    <LogOut size={20} />
                    <span className="side-nav-label">Sign Out</span>
                </button>
            </div>
        </nav>
    );
};

export default SideNav;
