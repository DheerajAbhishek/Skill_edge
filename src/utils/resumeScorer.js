export const calculateResumeScore = (resumeText) => {
  let score = 0;
  const textLower = resumeText.toLowerCase();
  const sections = [];
  
  // Objective/Summary - 6 points
  if (/\b(objective|summary|profile|about\s*me)\b/.test(textLower)) {
    score += 6;
    sections.push({ name: 'Objective/Summary', points: 6, hasIt: true });
  } else {
    sections.push({ name: 'Objective/Summary', points: 0, hasIt: false });
  }
  
  // Education - 12 points
  if (/\b(education|school|college|university|degree|bachelor|master|b\.?tech|m\.?tech)\b/.test(textLower)) {
    score += 12;
    sections.push({ name: 'Education', points: 12, hasIt: true });
  } else {
    sections.push({ name: 'Education', points: 0, hasIt: false });
  }
  
  // Experience - 16 points
  if (/\b(experience|work\s*experience|employment|work\s*history)\b/.test(textLower)) {
    score += 16;
    sections.push({ name: 'Experience', points: 16, hasIt: true });
  } else {
    sections.push({ name: 'Experience', points: 0, hasIt: false });
  }
  
  // Internships - 6 points
  if (/\b(internship|internships|intern)\b/.test(textLower)) {
    score += 6;
    sections.push({ name: 'Internships', points: 6, hasIt: true });
  } else {
    sections.push({ name: 'Internships', points: 0, hasIt: false });
  }
  
  // Skills - 7 points
  if (/\b(skills|skill|technical\s*skills|core\s*competencies)\b/.test(textLower)) {
    score += 7;
    sections.push({ name: 'Skills', points: 7, hasIt: true });
  } else {
    sections.push({ name: 'Skills', points: 0, hasIt: false });
  }
  
  // Hobbies - 4 points
  if (/\b(hobbies|hobby)\b/.test(textLower)) {
    score += 4;
    sections.push({ name: 'Hobbies', points: 4, hasIt: true });
  } else {
    sections.push({ name: 'Hobbies', points: 0, hasIt: false });
  }
  
  // Interests - 5 points
  if (/\b(interests|interest)\b/.test(textLower)) {
    score += 5;
    sections.push({ name: 'Interests', points: 5, hasIt: true });
  } else {
    sections.push({ name: 'Interests', points: 0, hasIt: false });
  }
  
  // Achievements - 13 points
  if (/\b(achievements|achievement|accomplishments|awards)\b/.test(textLower)) {
    score += 13;
    sections.push({ name: 'Achievements', points: 13, hasIt: true });
  } else {
    sections.push({ name: 'Achievements', points: 0, hasIt: false });
  }
  
  // Certifications - 12 points
  if (/\b(certifications|certification|certified|certificate)\b/.test(textLower)) {
    score += 12;
    sections.push({ name: 'Certifications', points: 12, hasIt: true });
  } else {
    sections.push({ name: 'Certifications', points: 0, hasIt: false });
  }
  
  // Projects - 19 points
  if (/\b(projects|project|portfolio)\b/.test(textLower)) {
    score += 19;
    sections.push({ name: 'Projects', points: 19, hasIt: true });
  } else {
    sections.push({ name: 'Projects', points: 0, hasIt: false });
  }
  
  const percentage = Math.min((score / 100) * 100, 100);
  
  let rating = 'Needs Improvement';
  let color = '#FF453A';
  if (percentage >= 80) {
    rating = 'Excellent';
    color = '#30D158';
  } else if (percentage >= 60) {
    rating = 'Good';
    color = '#FF9F0A';
  } else if (percentage >= 40) {
    rating = 'Average';
    color = '#FFD60A';
  }
  
  return {
    score,
    percentage,
    rating,
    color,
    sections
  };
};

export const detectExperienceLevel = (resumeText, numPages) => {
  let score = 0;
  const details = {
    yearsMentioned: 0,
    workDurationYears: 0,
    graduationYear: null,
    hasInternship: false,
    jobCount: 0,
    dateRanges: []
  };
  
  // Extract years of experience mentioned
  const yearPatterns = [
    /(\d+)\+?\s*years?\s+(?:of\s+)?experience/gi,
    /experience\s+(?:of\s+)?(\d+)\+?\s*years?/gi,
    /(\d+)\+?\s*yrs?\s+(?:of\s+)?experience/gi
  ];
  
  yearPatterns.forEach(pattern => {
    const matches = resumeText.matchAll(pattern);
    for (const match of matches) {
      const years = parseInt(match[1]);
      if (years > details.yearsMentioned) {
        details.yearsMentioned = years;
        score += Math.min(years * 10, 40);
      }
    }
  });
  
  // Extract work duration from date ranges
  const dateRangePattern = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})\s*[-–—to]+\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)?\s*(\d{4}|Present|Current|Now)/gi;
  
  const matches = resumeText.matchAll(dateRangePattern);
  for (const match of matches) {
    const startYear = parseInt(match[2]);
    const endYear = match[4].match(/\d{4}/) ? parseInt(match[4]) : 2026;
    const duration = endYear - startYear;
    
    if (duration >= 0 && duration <= 50) {
      details.dateRanges.push({ start: startYear, end: endYear, duration });
      details.workDurationYears += duration;
    }
  }
  
  if (details.workDurationYears > 0) {
    score += Math.min(details.workDurationYears * 7, 35);
  }
  
  // Detect graduation year
  const gradPattern = /(?:graduated|graduation|degree|bachelor|master).*?(\d{4})/gi;
  const gradMatches = resumeText.matchAll(gradPattern);
  for (const match of gradMatches) {
    const year = parseInt(match[1]);
    if (year >= 1980 && year <= 2026) {
      details.graduationYear = year;
      const yearsSinceGrad = 2026 - year;
      score += Math.min(yearsSinceGrad * 2, 20);
      break;
    }
  }
  
  // Detect internships
  if (/\b(internship|intern)\b/i.test(resumeText)) {
    details.hasInternship = true;
    score += 10;
  }
  
  // Count job positions
  const jobIndicators = resumeText.match(/\b(developer|engineer|analyst|manager|consultant|designer|architect|lead|senior)/gi);
  details.jobCount = jobIndicators ? Math.min(jobIndicators.length, 5) : 0;
  score += details.jobCount * 3;
  
  // Page count factor
  if (numPages >= 2) {
    score += 5;
  }
  
  // Determine level
  let level = 'Fresher';
  if (score >= 60 || details.yearsMentioned >= 5 || details.workDurationYears >= 5) {
    level = 'Experienced';
  } else if (score >= 30 || details.yearsMentioned >= 2 || details.workDurationYears >= 2 || details.hasInternship) {
    level = 'Intermediate';
  }
  
  return {
    level,
    score: Math.min(score, 100),
    details
  };
};
