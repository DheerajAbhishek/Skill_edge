// ⚠️ WARNING: API KEY HARDCODED FOR TEAM REVIEW ONLY
// In production, this should be in environment variables or backend
const GROQ_API_KEY = 'YOUR_GROQ_API_KEY_HERE'; // TODO: Replace with your actual key

export const callGroqAPI = async (prompt, maxTokens = 1500) => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are an expert technical interviewer. Generate insightful, practical interview questions that test real understanding. Be specific and technical.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: maxTokens,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Groq API exception:', error);
    return null;
  }
};

export const generateAIQuestions = async (resumeText, skills, field, level) => {
  const details = extractResumeDetails(resumeText);
  
  const projectsText = details.projects.length > 0 
    ? details.projects.map(p => `- ${p}`).join('\n')
    : 'No specific projects mentioned';
  
  const certsText = details.certifications.length > 0
    ? details.certifications.map(c => `- ${c}`).join('\n')
    : 'No certifications mentioned';
  
  const skillsText = skills.slice(0, 10).join(', ');
  
  const prompt = `Based on this candidate's resume, generate 5 highly personalized technical interview questions.

**Candidate Profile:**
- Target Role: ${field}
- Experience Level: ${level}
- Key Skills: ${skillsText}

**Projects from Resume:**
${projectsText}

**Certifications:**
${certsText}

**Instructions:**
1. Ask specific questions about their projects (architecture, challenges, decisions)
2. Ask about skills they've listed - test depth of knowledge
3. If they have certifications, ask relevant questions
4. Match question difficulty to their experience level (${level})
5. Make questions conversational like a real interview

**Output Format (JSON array):**
[
  {
    "question": "Your specific question here",
    "context": "Why this question is relevant to their resume",
    "expected_points": "Key points a good answer should cover"
  }
]

Generate exactly 5 questions in valid JSON format:`;

  const response = await callGroqAPI(prompt);
  
  if (response) {
    try {
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error('JSON parse error:', e);
    }
  }
  
  return null;
};

export const generateSkillDeepDiveQuestions = async (skill, level) => {
  const prompt = `Generate 2 interview questions for a ${level} candidate about ${skill}.

**Requirements:**
1. First question: Conceptual understanding
2. Second question: Practical application/scenario

**Output Format (JSON array):**
[
  {
    "question": "Question text",
    "difficulty": "easy/medium/hard",
    "answer_points": "Key points for a good answer"
  }
]

Generate exactly 2 questions in valid JSON:`;

  const response = await callGroqAPI(prompt, 500);
  
  if (response) {
    try {
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error('JSON parse error:', e);
    }
  }
  
  return null;
};

const extractResumeDetails = (resumeText) => {
  const details = {
    projects: [],
    certifications: [],
    companies: []
  };
  
  const lines = resumeText.split('\n');
  const resumeLower = resumeText.toLowerCase();
  
  // Extract Projects
  let projectSection = false;
  let currentProject = [];
  const projectPatterns = [
    /projects?\s*:?\s*$/i,
    /academic\s*projects?\s*:?\s*$/i,
    /personal\s*projects?\s*:?\s*$/i
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const lineLower = line.toLowerCase();
    
    if (projectPatterns.some(p => p.test(lineLower))) {
      projectSection = true;
      continue;
    }
    
    if (projectSection && /^(education|experience|skills|certification|achievement)/i.test(lineLower)) {
      projectSection = false;
      if (currentProject.length > 0) {
        details.projects.push(currentProject.join(' '));
        currentProject = [];
      }
    }
    
    if (projectSection && line) {
      if (line.match(/^[•\-\*▪●]/) || (line.length < 80 && i > 0)) {
        if (currentProject.length > 0) {
          details.projects.push(currentProject.join(' '));
        }
        currentProject = [line.replace(/^[•\-\*▪●]\s*/, '')];
      } else if (currentProject.length > 0) {
        currentProject.push(line);
      }
    }
  }
  
  if (currentProject.length > 0) {
    details.projects.push(currentProject.join(' '));
  }
  
  // Extract Certifications
  const certPatterns = [
    /certified\s+(?:in\s+)?([^,\n.]+)/gi,
    /certification\s*(?:in|:)?\s*([^,\n.]+)/gi,
    /certificate\s+(?:in|of)\s+([^,\n.]+)/gi
  ];
  
  certPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(resumeLower)) !== null) {
      const cert = match[1].trim();
      if (cert.length > 3 && cert.length < 100) {
        details.certifications.push(cert.charAt(0).toUpperCase() + cert.slice(1));
      }
    }
  });
  
  // Deduplicate and limit
  details.projects = [...new Set(details.projects)].slice(0, 5);
  details.certifications = [...new Set(details.certifications)].slice(0, 5);
  
  return details;
};
