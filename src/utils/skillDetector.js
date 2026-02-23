// Comprehensive skills patterns for detection
export const skillsPatterns = {
    // Programming Languages
    'Python': [/\bpython\b/i],
    'Java': [/\bjava\b(?!script)/i],
    'JavaScript': [/\bjavascript\b/i, /\bjs\b/i, /\bnode\.?js\b/i, /\breact\.?js\b/i],
    'C': [/\bc\b(?!\+\+|#|sharp)/i, /\bc\s+programming\b/i],
    'C++': [/\bc\+\+\b/i, /\bcpp\b/i],
    'C#': [/\bc#\b/i, /\bcsharp\b/i],
    'PHP': [/\bphp\b/i],
    'Ruby': [/\bruby\b/i],
    'Go': [/\bgolang\b/i, /\bgo\s+lang\b/i],
    'Rust': [/\brust\b/i],
    'Swift': [/\bswift\b/i],
    'Kotlin': [/\bkotlin\b/i],
    'TypeScript': [/\btypescript\b/i, /\bts\b/i],
    'Scala': [/\bscala\b/i],
    'R': [/\br\s+programming\b/i, /\br\s+language\b/i],

    // Web Technologies
    'HTML': [/\bhtml\b/i, /\bhtml5\b/i],
    'CSS': [/\bcss\b/i, /\bcss3\b/i, /\bsass\b/i, /\bscss\b/i],
    'React': [/\breact\b/i, /\breactjs\b/i],
    'Angular': [/\bangular\b/i, /\bangularjs\b/i],
    'Vue': [/\bvue\b/i, /\bvuejs\b/i],
    'Node.js': [/\bnode\b/i, /\bnodejs\b/i],
    'Django': [/\bdjango\b/i],
    'Flask': [/\bflask\b/i],
    'Spring': [/\bspring\b/i, /\bspring\s*boot\b/i],
    'Express': [/\bexpress\b/i, /\bexpressjs\b/i],
    'Bootstrap': [/\bbootstrap\b/i],
    'Tailwind': [/\btailwind\b/i, /\btailwindcss\b/i],
    'Next.js': [/\bnext\b/i, /\bnextjs\b/i],

    // Mobile
    'Android': [/\bandroid\b/i],
    'iOS': [/\bios\b/i, /\biphone\b/i],
    'Flutter': [/\bflutter\b/i],
    'React Native': [/\breact\s*native\b/i],

    // Databases
    'SQL': [/\bsql\b/i, /\bplsql\b/i],
    'MySQL': [/\bmysql\b/i],
    'PostgreSQL': [/\bpostgres\b/i, /\bpostgresql\b/i],
    'MongoDB': [/\bmongo\b/i, /\bmongodb\b/i],
    'Redis': [/\bredis\b/i],
    'Oracle': [/\boracle\b/i],
    'Firebase': [/\bfirebase\b/i],
    'Elasticsearch': [/\belastic\b/i, /\belasticsearch\b/i],

    // Cloud & DevOps
    'AWS': [/\baws\b/i, /\bamazon\s*web\s*services\b/i, /\bec2\b/i, /\bs3\b/i],
    'Azure': [/\bazure\b/i, /\bmicrosoft\s*azure\b/i],
    'GCP': [/\bgcp\b/i, /\bgoogle\s*cloud\b/i],
    'Docker': [/\bdocker\b/i],
    'Kubernetes': [/\bkubernetes\b/i, /\bk8s\b/i],
    'Jenkins': [/\bjenkins\b/i],
    'Git': [/\bgit\b/i, /\bgithub\b/i, /\bgitlab\b/i],
    'CI/CD': [/\bci\/cd\b/i, /\bcicd\b/i],
    'Terraform': [/\bterraform\b/i],
    'Linux': [/\blinux\b/i, /\bubuntu\b/i],

    // Data Science & ML
    'Machine Learning': [/\bmachine\s*learning\b/i, /\bml\b/i],
    'Deep Learning': [/\bdeep\s*learning\b/i, /\bneural\s*network\b/i],
    'TensorFlow': [/\btensorflow\b/i],
    'PyTorch': [/\bpytorch\b/i],
    'Keras': [/\bkeras\b/i],
    'Scikit-learn': [/\bscikit\b/i, /\bsklearn\b/i],
    'Pandas': [/\bpandas\b/i],
    'NumPy': [/\bnumpy\b/i],
    'Data Analysis': [/\bdata\s*analysis\b/i],
    'NLP': [/\bnlp\b/i, /\bnatural\s*language\b/i],
    'Computer Vision': [/\bcomputer\s*vision\b/i, /\bopencv\b/i],
    'Tableau': [/\btableau\b/i],
    'Power BI': [/\bpower\s*bi\b/i, /\bpowerbi\b/i],

    // Other
    'REST API': [/\brest\b/i, /\brest\s*api\b/i, /\brestful\b/i],
    'GraphQL': [/\bgraphql\b/i],
    'Microservices': [/\bmicroservice/i],
    'Agile': [/\bagile\b/i],
    'Scrum': [/\bscrum\b/i]
};

export const detectSkills = (text) => {
    const detectedSkills = [];
    const textLower = text.toLowerCase();

    for (const [skillName, patterns] of Object.entries(skillsPatterns)) {
        for (const pattern of patterns) {
            if (pattern.test(textLower)) {
                detectedSkills.push(skillName);
                break;
            }
        }
    }

    return [...new Set(detectedSkills)].sort();
};

export const predictField = (skills) => {
    const fieldKeywords = {
        'Data Science': ['tensorflow', 'keras', 'pytorch', 'machine learning', 'deep learning', 'pandas', 'numpy'],
        'Web Development': ['react', 'django', 'node.js', 'angular', 'vue', 'php', 'javascript'],
        'Mobile Development': ['android', 'ios', 'flutter', 'react native', 'swift', 'kotlin'],
        'Cloud Computing': ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform'],
        'DevOps': ['docker', 'kubernetes', 'jenkins', 'ci/cd', 'terraform', 'linux'],
        'Data Analysis': ['tableau', 'power bi', 'sql', 'excel', 'data analysis'],
        'Machine Learning': ['tensorflow', 'pytorch', 'scikit-learn', 'machine learning', 'nlp']
    };

    let maxMatches = 0;
    let predictedField = 'General IT';

    for (const [field, keywords] of Object.entries(fieldKeywords)) {
        const matches = keywords.filter(keyword =>
            skills.some(skill => skill.toLowerCase().includes(keyword.toLowerCase()))
        ).length;

        if (matches > maxMatches) {
            maxMatches = matches;
            predictedField = field;
        }
    }

    return predictedField;
};

export const getRecommendedSkills = (field) => {
    const recommendations = {
        'Data Science': ['Data Visualization', 'Statistical Modeling', 'Data Mining', 'ML Algorithms', 'Keras', 'PyTorch', 'TensorFlow', 'Flask', 'Streamlit'],
        'Web Development': ['React', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Docker', 'REST API', 'GraphQL', 'AWS'],
        'Mobile Development': ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'REST API', 'Git'],
        'Cloud Computing': ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Linux', 'CI/CD', 'Python'],
        'DevOps': ['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Ansible', 'AWS', 'Linux', 'Python', 'Bash'],
        'Data Analysis': ['SQL', 'Python', 'Tableau', 'Power BI', 'Excel', 'Statistics', 'Data Visualization'],
        'Machine Learning': ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Deep Learning', 'NLP', 'MLOps', 'Docker']
    };

    return recommendations[field] || ['Git', 'Linux', 'Problem Solving', 'Communication'];
};
