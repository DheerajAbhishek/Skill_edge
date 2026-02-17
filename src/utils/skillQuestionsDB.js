// Skill-based interview questions database
export const skillQuestionsDB = {
  'Python': [
    {
      q: 'Explain the difference between lists and tuples in Python.',
      a: 'Lists are mutable (can be changed) and use square brackets []. Tuples are immutable (cannot be changed) and use parentheses (). Tuples are faster and used when data shouldn\'t change.'
    },
    {
      q: 'What are Python decorators and how do you use them?',
      a: 'Decorators are functions that modify other functions. They use @decorator syntax. Common uses: logging, timing, authentication. Example: @login_required before a function.'
    },
    {
      q: 'Explain list comprehensions and when to use them.',
      a: 'List comprehensions create lists in one line: [x*2 for x in range(10)]. They\'re faster than loops, more readable for simple transformations. Can include if conditions for filtering.'
    },
    {
      q: 'What is the difference between __init__ and __new__?',
      a: '__new__ creates the instance (called before __init__). __init__ initializes the instance. __new__ is rarely overridden except for immutable types or metaclasses.'
    }
  ],
  
  'JavaScript': [
    {
      q: 'Explain the difference between let, const, and var.',
      a: 'var is function-scoped and hoisted. let is block-scoped, can be reassigned. const is block-scoped and cannot be reassigned (but objects/arrays can be mutated).'
    },
    {
      q: 'What is the event loop in JavaScript?',
      a: 'The event loop handles async operations. It checks the call stack, executes sync code first, then processes callback queue (setTimeout) and microtask queue (Promises) in order.'
    },
    {
      q: 'Explain closures in JavaScript.',
      a: 'A closure is a function that remembers variables from its outer scope even after the outer function returns. Used for data privacy, callbacks, and maintaining state.'
    },
    {
      q: 'What is the difference between == and ===?',
      a: '== compares values with type coercion (loose equality). === compares values and types without coercion (strict equality). Always prefer === to avoid unexpected behavior.'
    }
  ],
  
  'React': [
    {
      q: 'Explain the useState and useEffect hooks.',
      a: 'useState manages component state - returns [state, setState]. useEffect handles side effects (API calls, subscriptions) - runs after render. Dependencies array controls when it runs.'
    },
    {
      q: 'What is the Virtual DOM and how does React use it?',
      a: 'Virtual DOM is an in-memory representation of real DOM. React compares new vs old virtual DOM (diffing), then updates only changed parts of real DOM (reconciliation) for better performance.'
    },
    {
      q: 'Explain React component lifecycle.',
      a: 'Mount: component created and inserted. Update: state/props change triggers re-render. Unmount: component removed. Hooks like useEffect handle lifecycle events in functional components.'
    },
    {
      q: 'What is prop drilling and how do you avoid it?',
      a: 'Prop drilling is passing props through many levels. Solutions: Context API for global state, component composition, state management libraries (Redux, Zustand), or lifting state only when needed.'
    }
  ],
  
  'Node.js': [
    {
      q: 'What is the difference between process.nextTick() and setImmediate()?',
      a: 'process.nextTick() executes immediately after current operation, before I/O events. setImmediate() executes in next iteration of event loop, after I/O events.'
    },
    {
      q: 'Explain middleware in Express.js.',
      a: 'Middleware are functions with access to req, res, next. They execute in order, can modify request/response, end the cycle, or call next(). Used for auth, logging, error handling.'
    },
    {
      q: 'What is the difference between synchronous and asynchronous code in Node.js?',
      a: 'Sync code blocks execution until complete. Async code (callbacks, Promises, async/await) allows concurrent operations using the event loop, preventing blocking in I/O operations.'
    },
    {
      q: 'Explain streams in Node.js.',
      a: 'Streams process data piece by piece instead of loading all at once. Types: Readable (read data), Writable (write data), Duplex (both), Transform (modify data). Efficient for large files.'
    }
  ],
  
  'SQL': [
    {
      q: 'Explain the difference between INNER JOIN, LEFT JOIN, and RIGHT JOIN.',
      a: 'INNER JOIN returns matching rows from both tables. LEFT JOIN returns all from left table + matches from right. RIGHT JOIN returns all from right table + matches from left.'
    },
    {
      q: 'What are indexes and when would you use them?',
      a: 'Indexes speed up data retrieval by creating a data structure for quick lookups. Use on frequently queried columns, WHERE clauses, JOIN columns. Avoid on frequently updated columns.'
    },
    {
      q: 'Explain the difference between WHERE and HAVING clauses.',
      a: 'WHERE filters rows before grouping. HAVING filters groups after GROUP BY. Example: WHERE filters individual sales, HAVING filters total sales per region.'
    },
    {
      q: 'What is normalization and why is it important?',
      a: 'Normalization organizes data to reduce redundancy. 1NF: atomic values. 2NF: no partial dependencies. 3NF: no transitive dependencies. Improves data integrity and reduces storage.'
    }
  ],
  
  'Machine Learning': [
    {
      q: 'Explain overfitting and how to prevent it.',
      a: 'Overfitting is when model learns training data too well but fails on new data. Prevention: more data, regularization (L1/L2), dropout, cross-validation, early stopping, simpler model.'
    },
    {
      q: 'What is the difference between precision and recall?',
      a: 'Precision = TP/(TP+FP) - of predicted positives, how many are correct. Recall = TP/(TP+FN) - of actual positives, how many were found. Use F1-score for balance.'
    },
    {
      q: 'Explain bias-variance tradeoff.',
      a: 'Bias: error from wrong assumptions (underfitting). Variance: error from sensitivity to training data (overfitting). Goal: balance both for optimal generalization.'
    },
    {
      q: 'What is the difference between supervised and unsupervised learning?',
      a: 'Supervised: labeled data, learns input-output mapping (classification, regression). Unsupervised: unlabeled data, finds patterns (clustering, dimensionality reduction).'
    }
  ],
  
  'Git': [
    {
      q: 'What is the difference between git merge and git rebase?',
      a: 'Merge creates a new commit combining branches, preserving history. Rebase moves commits to new base, creating linear history. Rebase rewrites history - don\'t use on public branches.'
    },
    {
      q: 'How do you resolve merge conflicts?',
      a: 'Open conflicted files, look for <<<<<<< markers, manually choose/combine changes, remove markers, stage resolved files with git add, then commit.'
    },
    {
      q: 'Explain the difference between git pull and git fetch.',
      a: 'git fetch downloads changes from remote but doesn\'t merge. git pull = git fetch + git merge. Fetch is safer as it lets you review changes before merging.'
    },
    {
      q: 'What is git stash and when would you use it?',
      a: 'git stash temporarily saves uncommitted changes. Use when switching branches without committing. git stash pop restores changes. git stash list shows all stashes.'
    }
  ],
  
  'AWS': [
    {
      q: 'Explain the difference between EC2, Lambda, and ECS.',
      a: 'EC2: Virtual servers you manage. Lambda: Serverless functions, pay per execution. ECS: Container orchestration service. Choose based on control vs convenience needs.'
    },
    {
      q: 'What is the difference between S3 storage classes?',
      a: 'Standard: frequent access. Intelligent-Tiering: auto-moves data. Standard-IA: infrequent access. Glacier: archival (minutes-hours retrieval). Glacier Deep: long-term archive (12+ hours).'
    },
    {
      q: 'Explain AWS VPC and its components.',
      a: 'VPC: isolated network in AWS. Components: Subnets (public/private), Route Tables, Internet Gateway (public access), NAT Gateway (private to internet), Security Groups, NACLs.'
    },
    {
      q: 'What is the difference between Security Groups and NACLs?',
      a: 'Security Groups: stateful, instance-level, allow rules only. NACLs: stateless, subnet-level, allow and deny rules. SG is first line of defense, NACL is second.'
    }
  ],
  
  'Docker': [
    {
      q: 'What is the difference between Docker image and container?',
      a: 'Image is a read-only template with instructions. Container is a running instance of an image. One image can create many containers. Images are built from Dockerfiles.'
    },
    {
      q: 'Explain Docker networking modes.',
      a: 'Bridge: default, isolated network. Host: shares host network. None: no networking. Overlay: multi-host communication. Macvlan: assigns MAC address, appears as physical device.'
    },
    {
      q: 'What is Docker Compose and when would you use it?',
      a: 'Docker Compose defines and runs multi-container apps using YAML. Specify services, networks, volumes in one file. Use for development environments, testing, simple deployments.'
    },
    {
      q: 'Explain Docker volumes vs bind mounts.',
      a: 'Volumes: managed by Docker, stored in Docker area, best for persistence. Bind mounts: specific host path, full control, use for development. Volumes are preferred for production.'
    }
  ],
  
  'Kubernetes': [
    {
      q: 'Explain Pods, Deployments, and Services in Kubernetes.',
      a: 'Pod: smallest unit, one or more containers. Deployment: manages Pods, handles updates, scaling. Service: stable network endpoint for Pods, load balancing.'
    },
    {
      q: 'What is the difference between StatefulSet and Deployment?',
      a: 'Deployment: for stateless apps, Pods are interchangeable. StatefulSet: for stateful apps, maintains Pod identity, stable network IDs, ordered deployment/scaling. Use for databases.'
    },
    {
      q: 'Explain Kubernetes ConfigMaps and Secrets.',
      a: 'ConfigMap: store non-sensitive config data (key-value or files). Secrets: store sensitive data (passwords, tokens), base64 encoded. Both inject into Pods as env vars or volumes.'
    },
    {
      q: 'What are Kubernetes namespaces and why use them?',
      a: 'Namespaces: virtual clusters within a cluster. Use for multi-tenant environments, resource isolation, RBAC boundaries, separating dev/staging/prod in one cluster.'
    }
  ],
  
  'TypeScript': [
    {
      q: 'What are the benefits of using TypeScript over JavaScript?',
      a: 'Type safety catches errors at compile time, better IDE support/autocomplete, improved refactoring, self-documenting code, easier maintenance in large codebases.'
    },
    {
      q: 'Explain the difference between interface and type in TypeScript.',
      a: 'Both define shapes. Interface: can be extended, merged, better for objects/classes. Type: can use unions, intersections, tuples. Use interface for object shapes, type for complex types.'
    },
    {
      q: 'What are TypeScript generics and when to use them?',
      a: 'Generics create reusable components that work with multiple types. <T> is a type variable. Use for functions, classes, interfaces that need to work with various types while maintaining type safety.'
    },
    {
      q: 'Explain any, unknown, and never types.',
      a: 'any: disables type checking, avoid if possible. unknown: type-safe any, requires type checking before use. never: represents values that never occur (error throwing, infinite loops).'
    }
  ],
  
  'MongoDB': [
    {
      q: 'What is the difference between SQL and MongoDB?',
      a: 'SQL: relational, fixed schema, tables/rows. MongoDB: NoSQL, flexible schema, collections/documents (JSON-like). SQL for structured data, MongoDB for flexible, hierarchical data.'
    },
    {
      q: 'Explain MongoDB indexes and their importance.',
      a: 'Indexes improve query performance by creating a data structure for quick lookups. Types: single field, compound, text, geospatial. Index on frequently queried fields, but impacts write performance.'
    },
    {
      q: 'What is sharding in MongoDB?',
      a: 'Sharding distributes data across multiple servers for horizontal scaling. Data divided by shard key. Enables handling large datasets and high throughput beyond single server capacity.'
    },
    {
      q: 'Explain the aggregation pipeline in MongoDB.',
      a: 'Aggregation processes documents through stages: $match (filter), $group (aggregate), $project (shape), $sort, $limit. Each stage transforms data for next stage, returns processed results.'
    }
  ],
  
  'REST API': [
    {
      q: 'What are the main HTTP methods and when to use them?',
      a: 'GET: retrieve data (idempotent). POST: create new resource. PUT: update/replace resource (idempotent). PATCH: partial update. DELETE: remove resource (idempotent). Use correct method for intent.'
    },
    {
      q: 'Explain REST API status codes.',
      a: '2xx: Success (200 OK, 201 Created). 3xx: Redirect. 4xx: Client error (400 Bad Request, 401 Unauthorized, 404 Not Found). 5xx: Server error (500 Internal Server Error). Use appropriate codes.'
    },
    {
      q: 'What is API versioning and best practices?',
      a: 'Versioning manages API changes without breaking clients. Methods: URL (/v1/users), header, query param. Best: use URL versioning, semantic versioning, deprecation notices, backward compatibility.'
    },
    {
      q: 'Explain authentication vs authorization in APIs.',
      a: 'Authentication: verify identity (who you are) - login, JWT, OAuth. Authorization: verify permissions (what you can do) - roles, ACLs. Both needed for secure APIs.'
    }
  ]
};

// Generate skill-based questions from detected skills
export const generateResumeBasedQuestions = (skills) => {
  const questions = [];
  
  for (const skill of skills) {
    // Direct match
    if (skillQuestionsDB[skill]) {
      questions.push(...skillQuestionsDB[skill]);
    } else {
      // Partial match
      for (const [key, value] of Object.entries(skillQuestionsDB)) {
        if (skill.toLowerCase().includes(key.toLowerCase()) || 
            key.toLowerCase().includes(skill.toLowerCase())) {
          questions.push(...value);
          break;
        }
      }
    }
  }
  
  // Return top 8 unique questions
  const uniqueQuestions = Array.from(new Set(questions.map(q => JSON.stringify(q))))
    .map(q => JSON.parse(q))
    .slice(0, 8);
  
  return uniqueQuestions;
};
