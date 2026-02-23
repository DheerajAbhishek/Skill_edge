// Field-based standard interview questions
export const fieldStandardQuestions = {
    'Data Science': [
        {
            q: 'What are the different types of machine learning?',
            a: 'Supervised (labeled data - classification, regression), Unsupervised (unlabeled - clustering, dimensionality reduction), Reinforcement (reward-based learning - games, robotics), Semi-supervised (mix of labeled and unlabeled).'
        },
        {
            q: 'Explain the bias-variance tradeoff.',
            a: 'Bias: error from wrong assumptions (underfitting). Variance: error from sensitivity to training data (overfitting). Goal is to balance both for optimal model generalization. Use cross-validation to find optimal complexity.'
        },
        {
            q: 'How do you handle missing data in a dataset?',
            a: 'Methods: Remove rows/columns, impute with mean/median/mode, use algorithms that handle missing values (XGBoost), predict missing values with ML, or use domain knowledge. Choice depends on missing data pattern and amount.'
        },
        {
            q: 'What is feature engineering and why is it important?',
            a: 'Creating new features from existing data to improve model performance. Techniques: scaling, encoding categorical variables, polynomial features, interaction terms, domain-specific transformations. Often more impactful than algorithm choice.'
        },
        {
            q: 'Explain cross-validation and its importance.',
            a: 'Technique to assess model performance by splitting data into train/validation sets multiple times (k-fold). Reduces overfitting, gives reliable performance estimate, helps in hyperparameter tuning. Use stratified k-fold for imbalanced data.'
        }
    ],

    'Web Development': [
        {
            q: 'What is the difference between frontend and backend development?',
            a: 'Frontend: client-side, what users see (HTML, CSS, JavaScript, React). Backend: server-side logic, databases, APIs (Node.js, Python, SQL). Full-stack involves both. Communication happens via HTTP/REST APIs.'
        },
        {
            q: 'Explain RESTful API principles.',
            a: 'REST principles: Stateless communication, client-server architecture, cacheable responses, uniform interface (standard HTTP methods), layered system. Resources identified by URLs, operations via GET/POST/PUT/DELETE.'
        },
        {
            q: 'What is responsive web design?',
            a: 'Design that adapts to different screen sizes and devices. Techniques: media queries, flexible grids, flexible images, mobile-first approach, viewport meta tag. Use frameworks like Tailwind CSS or Bootstrap.'
        },
        {
            q: 'How do you optimize website performance?',
            a: 'Minify CSS/JS, compress images, lazy loading, code splitting, CDN for static assets, caching strategies, reduce HTTP requests, use efficient algorithms, database indexing, server-side rendering for SEO.'
        },
        {
            q: 'Explain the concept of authentication vs authorization.',
            a: 'Authentication: verify identity (who you are) - login, passwords, JWT, OAuth. Authorization: verify permissions (what you can do) - roles, ACLs, permissions. Always need both for secure applications.'
        }
    ],

    'Mobile Development': [
        {
            q: 'What is the difference between native and cross-platform development?',
            a: 'Native: platform-specific languages (Swift for iOS, Kotlin for Android), better performance, full platform features. Cross-platform: shared codebase (Flutter, React Native), faster development, some performance tradeoff.'
        },
        {
            q: 'Explain the mobile app lifecycle.',
            a: 'States: Not Running → Inactive → Active (foreground) → Background → Suspended. Handle: onCreate/onStart (init), onResume (active), onPause (partial visibility), onStop (hidden), onDestroy (cleanup). Save state for background.'
        },
        {
            q: 'How do you handle different screen sizes in mobile apps?',
            a: 'Use responsive layouts (ConstraintLayout, Auto Layout), density-independent pixels, adaptive UI components, test on multiple devices/emulators, use percentage-based sizing, handle orientation changes.'
        },
        {
            q: 'What are the best practices for mobile app performance?',
            a: 'Lazy loading, image optimization, efficient data structures, minimize network calls, cache data, background processing for heavy tasks, memory management, use pagination, avoid blocking main thread.'
        },
        {
            q: 'Explain push notifications and their implementation.',
            a: 'Remote notifications from server to device. Use Firebase Cloud Messaging (FCM) or APNs. Components: notification service, device token, payload. Handle: background, foreground, user actions. Get user permission first.'
        }
    ],

    'Cloud Computing': [
        {
            q: 'What are the different types of cloud service models?',
            a: 'IaaS: Infrastructure (EC2, VMs, networking). PaaS: Platform (Heroku, App Engine, managed runtime). SaaS: Software (Gmail, Salesforce, fully managed apps). FaaS: Functions (Lambda, serverless). Choose based on control vs management tradeoff.'
        },
        {
            q: 'Explain the difference between horizontal and vertical scaling.',
            a: 'Horizontal: add more machines (scale out), better for high availability, cloud-friendly, load balancing needed. Vertical: add more CPU/RAM to existing machine (scale up), simpler but has limits, single point of failure.'
        },
        {
            q: 'What is Infrastructure as Code (IaC) and why is it important?',
            a: 'Managing infrastructure through code (Terraform, CloudFormation). Benefits: version control, reproducibility, consistency across environments, automation, documentation, disaster recovery, reduces human error.'
        },
        {
            q: 'How do you ensure high availability in cloud architecture?',
            a: 'Multi-AZ deployment, load balancing, auto-scaling, redundancy, health checks, failover mechanisms, database replication, CDN for static content, monitoring and alerting, disaster recovery plan.'
        },
        {
            q: 'What is containerization and how does Kubernetes help?',
            a: 'Containers: package app with dependencies (Docker). Kubernetes: orchestrates containers - deployment, scaling, load balancing, self-healing, rolling updates, service discovery, secret management. Essential for microservices.'
        }
    ],

    'DevOps': [
        {
            q: 'What is CI/CD and why is it important?',
            a: 'CI: Continuous Integration - automated testing on code commits. CD: Continuous Delivery/Deployment - automated deployment to production. Benefits: faster releases, fewer bugs, quick feedback, reduced risk, better team collaboration.'
        },
        {
            q: 'Explain the concept of Infrastructure as Code.',
            a: 'Managing infrastructure through declarative code (Terraform, Ansible). Benefits: version control, reproducibility, automation, consistency, documentation, disaster recovery. Treats infrastructure like software.'
        },
        {
            q: 'What is the difference between containers and virtual machines?',
            a: 'Containers: share OS kernel, lightweight, fast startup, Docker. VMs: full OS, heavyweight, slower startup, hypervisor. Containers for microservices, VMs for isolation. Can use both together.'
        },
        {
            q: 'How do you implement monitoring and logging in production?',
            a: 'Monitoring: Prometheus, Grafana, CloudWatch - metrics, alerts, dashboards. Logging: ELK stack, Splunk - centralized logs, search, analysis. Distributed tracing: Jaeger. Key metrics: latency, errors, saturation, traffic.'
        },
        {
            q: 'Explain blue-green deployment strategy.',
            a: 'Two identical environments (blue=current, green=new). Deploy to green, test, switch traffic. Benefits: zero downtime, easy rollback, reduced risk. Alternative: canary deployment (gradual rollout).'
        }
    ],

    'Data Analyst': [
        {
            q: 'What is the difference between descriptive and predictive analytics?',
            a: 'Descriptive: what happened (dashboards, reports, aggregations). Predictive: what will happen (ML models, forecasting, trends). Prescriptive: what should we do (recommendations, optimization). Data analysis maturity progresses through these.'
        },
        {
            q: 'How do you identify and handle outliers?',
            a: 'Detection: box plots, Z-score, IQR method, domain knowledge. Handling: remove if errors, cap/floor values, separate analysis, robust statistics, transform data. Always investigate why outliers exist before removing.'
        },
        {
            q: 'Explain A/B testing and its importance.',
            a: 'Compare two versions to determine which performs better. Steps: hypothesis, randomization, measure metrics, statistical significance. Use for product features, UI changes, marketing. Need sufficient sample size and avoid p-hacking.'
        },
        {
            q: 'What is data normalization and why is it needed?',
            a: 'Scaling features to similar ranges. Methods: Min-Max (0-1), Z-score (mean=0, std=1), Robust scaling. Needed for: distance-based algorithms, gradient descent, comparing features. Not always required (tree-based models).'
        },
        {
            q: 'How do you communicate insights to non-technical stakeholders?',
            a: 'Use visualizations, tell stories with data, focus on business impact, avoid jargon, provide recommendations, use analogies, interactive dashboards, executive summaries. Always tie back to business goals.'
        }
    ],

    'Machine Learning': [
        {
            q: 'What is the difference between classification and regression?',
            a: 'Classification: predict categories/labels (spam/not spam, disease detection). Regression: predict continuous values (house prices, temperature). Evaluation differs: accuracy/F1 for classification, MSE/MAE for regression.'
        },
        {
            q: 'Explain the concept of regularization.',
            a: 'Technique to prevent overfitting by adding penalty term. L1 (Lasso): absolute values, feature selection. L2 (Ridge): squared values, shrinks coefficients. ElasticNet: combination. Controls model complexity trade-off.'
        },
        {
            q: 'What is ensemble learning and its types?',
            a: 'Combining multiple models for better performance. Bagging: parallel models (Random Forest), reduces variance. Boosting: sequential models (XGBoost, AdaBoost), reduces bias. Stacking: meta-model on predictions.'
        },
        {
            q: 'How do you handle imbalanced datasets?',
            a: 'Techniques: resampling (SMOTE, undersampling), class weights, anomaly detection algorithms, use appropriate metrics (F1, precision-recall), ensemble methods, generate synthetic data. Never use accuracy alone.'
        },
        {
            q: 'Explain the concept of transfer learning.',
            a: 'Using pre-trained model on new task. Common in deep learning (ResNet, BERT). Benefits: less data needed, faster training, better performance. Fine-tuning: freeze early layers, train later layers on new data.'
        }
    ],

    'Cyber Security': [
        {
            q: 'What is the CIA triad in cybersecurity?',
            a: 'Confidentiality: protect data from unauthorized access (encryption, access control). Integrity: ensure data accuracy (hashing, checksums). Availability: ensure system access (redundancy, DDoS protection). Foundation of security.'
        },
        {
            q: 'Explain the difference between symmetric and asymmetric encryption.',
            a: 'Symmetric: same key for encryption/decryption (AES), fast, key distribution challenge. Asymmetric: public-private key pairs (RSA), slower, better for key exchange. Often used together (hybrid encryption).'
        },
        {
            q: 'What is the OWASP Top 10?',
            a: 'Top security risks: Injection, Broken Auth, Sensitive Data Exposure, XXE, Broken Access Control, Security Misconfiguration, XSS, Insecure Deserialization, Components with Known Vulnerabilities, Insufficient Logging. Essential for web security.'
        },
        {
            q: 'How does a firewall work?',
            a: 'Monitors and controls network traffic based on rules. Types: packet filtering, stateful inspection, application-level. Can be network-based or host-based. Rules define allowed/blocked traffic by IP, port, protocol.'
        },
        {
            q: 'Explain the concept of defense in depth.',
            a: 'Layered security approach. Multiple defensive measures so if one fails, others provide protection. Layers: physical, network, host, application, data. Examples: firewall + IDS + encryption + access control + monitoring.'
        }
    ],

    'UI-UX Development': [
        {
            q: 'What is user-centered design?',
            a: 'Design process focused on user needs, preferences, limitations. Steps: research, personas, wireframes, prototypes, testing, iteration. Involves users throughout. Goal: intuitive, accessible, enjoyable products.'
        },
        {
            q: 'Explain the difference between UI and UX.',
            a: 'UI: visual design, colors, typography, buttons (how it looks). UX: overall experience, usability, information architecture (how it works). UI is subset of UX. Good UX can have simple UI.'
        },
        {
            q: 'What is the importance of accessibility in design?',
            a: 'Making products usable for people with disabilities. WCAG guidelines: perceivable, operable, understandable, robust. Consider: screen readers, keyboard navigation, color contrast, alt text. Legal requirement and expands audience.'
        },
        {
            q: 'How do you conduct user research?',
            a: 'Methods: interviews, surveys, usability testing, A/B testing, analytics, heatmaps, personas, journey mapping. Qualitative (why) and quantitative (what). Always test with real users, not assumptions.'
        },
        {
            q: 'What is a design system and why is it important?',
            a: 'Collection of reusable components, patterns, guidelines. Benefits: consistency, faster development, better collaboration, scalability, brand identity. Examples: Material Design, Apple HIG. Include typography, colors, spacing, components.'
        }
    ]
};

export const getFieldStandardQuestions = (field) => {
    return fieldStandardQuestions[field] || fieldStandardQuestions['Web Development'];
};
