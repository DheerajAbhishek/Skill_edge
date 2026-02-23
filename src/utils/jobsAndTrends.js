export const trendingSkillsByField = {
    'Data Science': {
        hot: ['LLMs', 'GenAI', 'PyTorch', 'Langchain', 'Vector Databases'],
        growing: ['MLOps', 'Feature Store', 'Model Deployment', 'AutoML', 'Data Versioning'],
        essential: ['Python', 'SQL', 'Statistics', 'Machine Learning', 'Data Visualization']
    },

    'Web Development': {
        hot: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Server Components', 'Edge Functions'],
        growing: ['Astro', 'SolidJS', 'tRPC', 'Prisma', 'WebAssembly'],
        essential: ['React', 'JavaScript', 'HTML/CSS', 'REST APIs', 'Git']
    },

    'Mobile Development': {
        hot: ['Flutter', 'Jetpack Compose', 'SwiftUI', 'React Native', 'Kotlin Multiplatform'],
        growing: ['Compose Multiplatform', 'Firebase', 'GraphQL', 'WebSockets', 'AR Kit'],
        essential: ['iOS/Android', 'Mobile UI/UX', 'REST APIs', 'State Management', 'Git']
    },

    'Cloud Computing': {
        hot: ['FinOps', 'Platform Engineering', 'GitOps', 'Serverless', 'AI/ML Cloud Services'],
        growing: ['Multi-cloud', 'Cloud Native', 'Service Mesh', 'Observability', 'Edge Computing'],
        essential: ['AWS', 'Azure', 'Kubernetes', 'Terraform', 'Docker']
    },

    'DevOps': {
        hot: ['Platform Engineering', 'GitOps', 'OpenTelemetry', 'Crossplane', 'Backstage'],
        growing: ['ArgoCD', 'Flux', 'Cilium', 'Istio', 'Dapr'],
        essential: ['Kubernetes', 'Docker', 'CI/CD', 'Terraform', 'Monitoring']
    },

    'Data Analysis': {
        hot: ['dbt', 'Snowflake', 'Looker', 'Mode Analytics', 'Hex'],
        growing: ['Reverse ETL', 'Data Observability', 'Metrics Layer', 'Data Contracts', 'DataOps'],
        essential: ['SQL', 'Python', 'Tableau', 'Power BI', 'Excel']
    },

    'Data Analyst': {
        hot: ['dbt', 'Snowflake', 'Looker', 'Mode Analytics', 'Hex'],
        growing: ['Reverse ETL', 'Data Observability', 'Metrics Layer', 'Data Contracts', 'DataOps'],
        essential: ['SQL', 'Python', 'Tableau', 'Power BI', 'Excel']
    },

    'Machine Learning': {
        hot: ['LLM Fine-tuning', 'RAG', 'Prompt Engineering', 'Langchain', 'Vector DBs'],
        growing: ['MLOps', 'Model Monitoring', 'Feature Stores', 'RLHF', 'Multimodal Models'],
        essential: ['Python', 'TensorFlow/PyTorch', 'ML Algorithms', 'Statistics', 'Data Preprocessing']
    }
};

export const getTrendingSkills = (field) => {
    return trendingSkillsByField[field] || trendingSkillsByField['Cloud Computing'];
};

export const jobRecommendationsByField = {
    'Data Science': [
        {
            title: 'Data Scientist',
            level: 'Entry-Mid',
            salary: '8 - 20 LPA',
            description: 'Build predictive models and analyze large datasets to drive business decisions.',
            skills: ['Python', 'ML', 'Statistics', 'SQL', 'Pandas']
        },
        {
            title: 'ML Engineer',
            level: 'Mid-Senior',
            salary: '15 - 35 LPA',
            description: 'Design and deploy machine learning models at scale.',
            skills: ['Python', 'TensorFlow', 'MLOps', 'Docker', 'AWS']
        },
        {
            title: 'Data Analyst',
            level: 'Fresher-Entry',
            salary: '4 - 10 LPA',
            description: 'Analyze data and create visualizations to support business insights.',
            skills: ['SQL', 'Excel', 'Tableau', 'Python', 'Statistics']
        },
        {
            title: 'Research Scientist',
            level: 'Senior',
            salary: '25 - 50 LPA',
            description: 'Conduct cutting-edge research in AI and machine learning.',
            skills: ['Deep Learning', 'Research', 'PyTorch', 'Mathematics', 'Publications']
        },
        {
            title: 'AI Engineer',
            level: 'Mid-Senior',
            salary: '18 - 40 LPA',
            description: 'Develop and deploy AI applications and LLM-powered solutions.',
            skills: ['LLMs', 'Python', 'RAG', 'Langchain', 'APIs']
        }
    ],

    'Web Development': [
        {
            title: 'Frontend Developer',
            level: 'Fresher-Entry',
            salary: '4 - 12 LPA',
            description: 'Build responsive and interactive user interfaces.',
            skills: ['React', 'JavaScript', 'HTML/CSS', 'TypeScript', 'Git']
        },
        {
            title: 'Full Stack Developer',
            level: 'Entry-Mid',
            salary: '8 - 20 LPA',
            description: 'Develop both frontend and backend of web applications.',
            skills: ['React', 'Node.js', 'MongoDB', 'REST APIs', 'AWS']
        },
        {
            title: 'Backend Developer',
            level: 'Entry-Mid',
            salary: '6 - 18 LPA',
            description: 'Design and implement server-side logic and APIs.',
            skills: ['Node.js', 'Python', 'SQL', 'REST APIs', 'Microservices']
        },
        {
            title: 'Web Architect',
            level: 'Senior',
            salary: '20 - 40 LPA',
            description: 'Design scalable web application architectures.',
            skills: ['System Design', 'Cloud', 'Microservices', 'Leadership', 'Architecture']
        },
        {
            title: 'UI/UX Developer',
            level: 'Entry-Mid',
            salary: '5 - 15 LPA',
            description: 'Create beautiful and intuitive user experiences.',
            skills: ['Figma', 'React', 'CSS', 'Design Systems', 'Accessibility']
        }
    ],

    'Mobile Development': [
        {
            title: 'Android Developer',
            level: 'Fresher-Entry',
            salary: '4 - 12 LPA',
            description: 'Build native Android applications using Kotlin.',
            skills: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'REST APIs', 'Git']
        },
        {
            title: 'iOS Developer',
            level: 'Entry-Mid',
            salary: '6 - 18 LPA',
            description: 'Develop native iOS applications with Swift.',
            skills: ['Swift', 'SwiftUI', 'iOS SDK', 'Xcode', 'Core Data']
        },
        {
            title: 'Flutter Developer',
            level: 'Entry-Mid',
            salary: '5 - 15 LPA',
            description: 'Create cross-platform mobile apps with Flutter.',
            skills: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'State Management']
        },
        {
            title: 'React Native Developer',
            level: 'Entry-Mid',
            salary: '6 - 16 LPA',
            description: 'Build cross-platform mobile apps using React Native.',
            skills: ['React Native', 'JavaScript', 'Redux', 'Native Modules', 'APIs']
        },
        {
            title: 'Mobile Architect',
            level: 'Senior',
            salary: '18 - 35 LPA',
            description: 'Design and lead mobile application development.',
            skills: ['Mobile Architecture', 'Leadership', 'iOS/Android', 'Performance', 'Security']
        }
    ],

    'Cloud Computing': [
        {
            title: 'Cloud Engineer',
            level: 'Fresher-Entry',
            salary: '5 - 12 LPA',
            description: 'Deploy and manage cloud infrastructure and services.',
            skills: ['AWS', 'Azure', 'Linux', 'Networking', 'Python']
        },
        {
            title: 'Cloud Architect',
            level: 'Senior',
            salary: '20 - 40 LPA',
            description: 'Design scalable, secure, and cost-effective cloud solutions.',
            skills: ['Cloud Architecture', 'Multi-cloud', 'Security', 'Cost Optimization', 'Leadership']
        },
        {
            title: 'Cloud Administrator',
            level: 'Fresher',
            salary: '3.5 - 8 LPA',
            description: 'Manage and monitor cloud resources and services.',
            skills: ['AWS', 'Azure', 'Linux', 'Networking', 'Monitoring']
        },
        {
            title: 'DevOps Engineer',
            level: 'Entry-Mid',
            salary: '8 - 18 LPA',
            description: 'Build and maintain CI/CD pipelines and automate infrastructure.',
            skills: ['CI/CD', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins']
        },
        {
            title: 'Site Reliability Engineer',
            level: 'Mid-Senior',
            salary: '15 - 30 LPA',
            description: 'Ensure reliability and performance of large-scale distributed systems.',
            skills: ['Kubernetes', 'Monitoring', 'Automation', 'Incident Management', 'Python']
        }
    ],

    'DevOps': [
        {
            title: 'DevOps Engineer',
            level: 'Entry-Mid',
            salary: '8 - 18 LPA',
            description: 'Automate infrastructure and deployment processes.',
            skills: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'AWS']
        },
        {
            title: 'Platform Engineer',
            level: 'Mid-Senior',
            salary: '15 - 30 LPA',
            description: 'Build internal developer platforms and tools.',
            skills: ['Kubernetes', 'Platform Engineering', 'IaC', 'GitOps', 'Backstage']
        },
        {
            title: 'SRE (Site Reliability Engineer)',
            level: 'Mid-Senior',
            salary: '15 - 32 LPA',
            description: 'Ensure system reliability and performance.',
            skills: ['SRE', 'Kubernetes', 'Monitoring', 'Python', 'Incident Management']
        },
        {
            title: 'Cloud DevOps Engineer',
            level: 'Entry-Mid',
            salary: '10 - 20 LPA',
            description: 'Manage cloud infrastructure with DevOps practices.',
            skills: ['AWS', 'Terraform', 'Docker', 'CI/CD', 'Monitoring']
        },
        {
            title: 'DevOps Architect',
            level: 'Senior',
            salary: '22 - 45 LPA',
            description: 'Design enterprise DevOps strategies and tooling.',
            skills: ['Architecture', 'Multi-cloud', 'Security', 'Leadership', 'Strategy']
        }
    ],

    'Data Analysis': [
        {
            title: 'Data Analyst',
            level: 'Fresher-Entry',
            salary: '4 - 10 LPA',
            description: 'Analyze data and create reports for business insights.',
            skills: ['SQL', 'Excel', 'Tableau', 'Python', 'Statistics']
        },
        {
            title: 'Business Analyst',
            level: 'Entry-Mid',
            salary: '6 - 15 LPA',
            description: 'Bridge business needs with technical solutions.',
            skills: ['SQL', 'Business Intelligence', 'Communication', 'Requirements', 'Analytics']
        },
        {
            title: 'BI Developer',
            level: 'Entry-Mid',
            salary: '7 - 16 LPA',
            description: 'Build business intelligence dashboards and reports.',
            skills: ['Power BI', 'Tableau', 'SQL', 'ETL', 'Data Modeling']
        },
        {
            title: 'Analytics Engineer',
            level: 'Mid',
            salary: '10 - 22 LPA',
            description: 'Transform data and build analytics infrastructure.',
            skills: ['SQL', 'dbt', 'Python', 'Data Warehouse', 'ETL']
        },
        {
            title: 'Senior Data Analyst',
            level: 'Mid-Senior',
            salary: '12 - 25 LPA',
            description: 'Lead data analysis projects and mentor analysts.',
            skills: ['Advanced SQL', 'Python', 'Statistics', 'Leadership', 'Storytelling']
        }
    ],

    'Data Analyst': [
        {
            title: 'Data Analyst',
            level: 'Fresher-Entry',
            salary: '4 - 10 LPA',
            description: 'Analyze data and create reports for business insights.',
            skills: ['SQL', 'Excel', 'Tableau', 'Python', 'Statistics']
        },
        {
            title: 'Business Analyst',
            level: 'Entry-Mid',
            salary: '6 - 15 LPA',
            description: 'Bridge business needs with technical solutions.',
            skills: ['SQL', 'Business Intelligence', 'Communication', 'Requirements', 'Analytics']
        },
        {
            title: 'BI Developer',
            level: 'Entry-Mid',
            salary: '7 - 16 LPA',
            description: 'Build business intelligence dashboards and reports.',
            skills: ['Power BI', 'Tableau', 'SQL', 'ETL', 'Data Modeling']
        },
        {
            title: 'Analytics Engineer',
            level: 'Mid',
            salary: '10 - 22 LPA',
            description: 'Transform data and build analytics infrastructure.',
            skills: ['SQL', 'dbt', 'Python', 'Data Warehouse', 'ETL']
        },
        {
            title: 'Senior Data Analyst',
            level: 'Mid-Senior',
            salary: '12 - 25 LPA',
            description: 'Lead data analysis projects and mentor analysts.',
            skills: ['Advanced SQL', 'Python', 'Statistics', 'Leadership', 'Storytelling']
        }
    ],

    'Machine Learning': [
        {
            title: 'ML Engineer',
            level: 'Mid-Senior',
            salary: '15 - 35 LPA',
            description: 'Build and deploy machine learning models at scale.',
            skills: ['Python', 'TensorFlow', 'MLOps', 'Docker', 'Cloud']
        },
        {
            title: 'AI Research Engineer',
            level: 'Mid-Senior',
            salary: '18 - 40 LPA',
            description: 'Research and develop new AI algorithms and models.',
            skills: ['Deep Learning', 'Research', 'PyTorch', 'Mathematics', 'Publications']
        },
        {
            title: 'Computer Vision Engineer',
            level: 'Mid',
            salary: '12 - 28 LPA',
            description: 'Develop computer vision applications and models.',
            skills: ['OpenCV', 'Deep Learning', 'Python', 'Image Processing', 'CNNs']
        },
        {
            title: 'NLP Engineer',
            level: 'Mid',
            salary: '14 - 30 LPA',
            description: 'Build natural language processing applications.',
            skills: ['NLP', 'Transformers', 'Python', 'LLMs', 'Hugging Face']
        },
        {
            title: 'MLOps Engineer',
            level: 'Mid-Senior',
            salary: '16 - 32 LPA',
            description: 'Deploy and maintain ML systems in production.',
            skills: ['MLOps', 'Kubernetes', 'Python', 'CI/CD', 'Monitoring']
        }
    ]
};

export const getJobRecommendations = (field, experienceLevel, skills) => {
    const jobs = jobRecommendationsByField[field] || jobRecommendationsByField['Cloud Computing'];

    // Filter jobs based on experience level
    const levelMap = {
        'Fresher': ['Fresher', 'Fresher-Entry', 'Entry'],
        'Intermediate': ['Entry', 'Entry-Mid', 'Mid', 'Fresher-Entry'],
        'Experienced': ['Mid', 'Mid-Senior', 'Senior', 'Entry-Mid']
    };

    const relevantLevels = levelMap[experienceLevel] || levelMap['Fresher'];

    return jobs.filter(job =>
        relevantLevels.some(level => job.level.includes(level))
    ).slice(0, 5);
};

export const getJobSearchUrls = (jobTitle) => {
    const encodedTitle = encodeURIComponent(jobTitle);
    return {
        naukri: `https://www.naukri.com/jobs-in-india?k=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/jobs/search/?keywords=${encodedTitle}`,
        indeed: `https://www.indeed.co.in/jobs?q=${encodedTitle}`,
        glassdoor: `https://www.glassdoor.co.in/Job/jobs.htm?sc.keyword=${encodedTitle}`,
        internshala: `https://internshala.com/jobs/${encodedTitle.toLowerCase().replace(/%20/g, '-')}-jobs`
    };
};
