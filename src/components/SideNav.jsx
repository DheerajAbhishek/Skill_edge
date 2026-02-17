import React, { useState, useEffect } from 'react';
import { User, Target, TrendingUp, BookOpen, BarChart3, Briefcase, MessageCircle, Youtube } from 'lucide-react';
import './SideNav.css';

const SideNav = () => {
  const [activeSection, setActiveSection] = useState('');

  const sections = [
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
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
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
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <nav className="side-nav">
      <div className="side-nav-content">
        {sections.map((section) => {
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
    </nav>
  );
};

export default SideNav;
