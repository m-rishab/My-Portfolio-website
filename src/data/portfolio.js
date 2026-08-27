export const profile = {
  name: 'Rishabh Mishra',
  title: 'Data Scientist, AI Engineer & Associate Analyst',
  email: 'rish.mishra130801@gmail.com',
  phone: '+91-9650411517',
  location: 'Faridabad, Haryana, India',
  cvUrl: 'https://drive.google.com/file/d/1Rq0D3AITueDZdNEuksm3obFP22YQuaps/view?usp=sharing',
  cvPreviewUrl: 'https://drive.google.com/file/d/1Rq0D3AITueDZdNEuksm3obFP22YQuaps/preview',
  social: {
    linkedin: 'https://www.linkedin.com/in/rishabhh-mishra/',
    github: 'https://github.com/m-rishab',
  },
  roles: ['Data Scientist', 'Data Analyst', 'AI Engineer'],
};

export const experience = [
  {
    id: 'google-xws',
    company: 'Google xWS via Highspring',
    companyDisplay: 'Google xWS via Highspring',
    companyLogo: 'https://www.highspring.com/wp-content/uploads/sites/2/2026/01/logo-highspring-agility-at-work.svg',
    companyLogoClassName: 'bg-[#062238]',
    companyLogoFrameClassName: 'h-10 w-28',
    companyWebsite: 'https://www.highspring.com',
    companyDescription:
      'Highspring is the rebranded identity of Vaco Holdings, a global professional services organization across Consulting, Managed Services, and Talent Solutions. Vaco continues as the Talent Solutions division within Highspring.',
    companyContext:
      'Google extended workforce engagement through the Highspring / Vaco ecosystem. Earlier naming in this vendor path included Vaco Binary Semantics references.',
    role: 'Associate Analyst',
    location: 'Gurugram, Haryana',
    period: 'Dec 2024 - Present',
    type: 'Full-time',
    summary:
      'Work on AI performance analysis, evaluation workflows, SQL reporting, and stakeholder-ready insights.',
    highlights: [
      'Engineered an automated AI response rating engine using semantic similarity and prompt engineering, achieving 90% precision across 5,000+ queries and reducing manual evaluation effort by 70%.',
      'Created and maintained monthly performance dashboards to track and analyze key metrics across multiple AI evaluation projects, providing clear performance insights to project leads and clients.',
      'Engineered a frontend-only data extraction pipeline using Python, HTTP requests, Regex, and JSON parsing to process 10,000+ Google AI Mode queries weekly, extracting clean AI Markdown responses, user queries, and multimodal metadata from embedded frontend payloads for at-scale AI quality evaluation.',
      'Analyzed 3B+ weekly queries using Google\'s internal SQL-based PLX environment, extracting high-traffic query and entity data to prioritize the most impactful datasets for large-scale AI evaluation.',
      'Led a 15-member team as POC, maintaining a 95% quality benchmark and presenting data-driven insights to leadership through structured storytelling.',
    ],
    tags: ['GoogleSQL', 'EDA', 'Dashboards', 'AI Evaluation'],
  },
  {
    id: 'thefinansol',
    company: 'TheFinansol',
    companyDisplay: 'THEFINANSOL (Infinevo Tech Pvt Ltd)',
    companyLogo: '/thefinansol-round-logo.svg',
    companyLogoClassName: 'bg-white',
    companyLogoFrameClassName: 'h-11 w-11 p-1',
    companyWebsite: 'https://www.thefinansol.com',
    companyDescription:
      'TheFinansol is an AI solutions company focused on chatbots, AI models, LLM apps, white-label platforms, SaaS products, automation, and custom enterprise AI solutions.',
    companyContext:
      'Founded in 2017, the company works across conversational AI, backend development, UI/UX, RPA, data visualization, and intelligent automation.',
    role: 'AI Engineer Intern',
    location: 'New Delhi, India',
    period: 'May 2024 - Sept 2024',
    type: 'Internship',
    summary:
      'Built applied AI prototypes across chatbots, retrieval, text-to-speech, and generative design workflows.',
    highlights: [
      'Authored the prompt-driven conversation design — states, follow-up logic, and conditional function calls — powering an AI voice agent in Claude Workbench for scheduling, knowledge retrieval, call transfer, and call termination.',
      'Implemented a Text-to-Speech system using FastAPI and CoquiTTS/Xttsv2, reducing latency by 30%.',
      'Refined the voice agent\'s response quality post-launch through A/B testing — iterating on tone, phrasing, and conversational flow to increase user satisfaction by 40%.',
      'Developed a PDF-based knowledge assistant using RAG, retrieving answers only from user-uploaded documents with 95% accuracy, and rejecting out-of-scope queries to prevent hallucinated responses.',
    ],
    tags: ['Claude', 'FastAPI', 'PostgreSQL', 'FAISS', 'GAN'],
  },
];


export const education = {
  school: 'J.C Bose University of Science and Technology',
  location: 'Faridabad, India',
  degree: 'Bachelor of Technology - Computer Science and Engineering (AI & ML)',
  gpa: '7.81',
  period: '2020 - 2024',
  courses: [
    'Artificial Intelligence',
    'Machine Learning',
    'Data Mining',
    'NLP',
    'Deep Learning',
    'Data Analysis with Python',
    'DSA with Python',
  ],
};

export const skills = [
  {
    category: 'Languages & Data Tools',
    summary: 'Core tools for analysis, automation, and version-controlled delivery.',
    items: ['Python', 'SQL', 'MySQL', 'GoogleSQL', 'Google Sheets', 'Apps Script', 'Git'],
  },
  {
    category: 'Analytics & Visualization',
    summary: 'Turning raw operational and product data into clear business recommendations.',
    items: [
      'EDA',
      'Statistical Analysis',
      'Cohort Analysis',
      'Pandas',
      'NumPy',
      'Excel',
      'Tableau',
      'Looker Studio',
      'GA4',
    ],
  },
  {
    category: 'Machine Learning & AI',
    summary: 'Applied ML, NLP, retrieval, and evaluation workflows for practical AI systems.',
    items: [
      'Scikit-learn',
      'TensorFlow',
      'PyTorch',
      'Hugging Face',
      'LangChain',
      'LangGraph',
      'NLP',
      'Prompt Engineering',
      'RAG',
      'Sentence Transformers',
      'FAISS',
      'Pinecone',
    ],
  },
  {
    category: 'Statistics & Foundations',
    summary: 'The reasoning layer behind measurement, testing, and model evaluation.',
    items: ['Probability', 'Linear Algebra', 'Hypothesis Testing', 'A/B Testing', 'Model Evaluation'],
  },
];

export const keyProjects = [
  {
    id: 'ai-rating-engine',
    title: 'AI Rating Engine',
    company: 'Google xWS via Highspring',
    category: 'Company Project',
    problem: 'Manual evaluation of Generative AI responses was time-consuming and difficult to keep consistent across large query sets.',
    approach:
      'Developed an automated AI response rating workflow using semantic similarity and prompt engineering, applying structured Helpfulness guidelines across user intent, clarity, factuality, and safety to support consistent response evaluation.',
    outcome: 'Achieved 90% precision across 5,000+ queries, reducing manual evaluation effort by 70%.',
    tech: ['Python', 'Semantic Similarity', 'Prompt Engineering', 'Generative AI Evaluation'],
    processDoc: {
      title: 'AI Response Helpfulness Rating Engine',
      subtitle: 'Gemini-based workflow for scoring AI responses against structured helpfulness guidelines.',
      problemHeading: 'The Problem: Inconsistent Manual Evaluation at Scale',
      problem: 'Manual AI response evaluation was slow and inconsistent across large query sets. The goal was to convert the human helpfulness rubric into a repeatable AI-assisted scoring workflow.',
      steps: [
        {
          id: 1,
          title: 'Defined Rating Factors',
          detail: 'Used four factors: intent match, clarity, factual accuracy, and trustworthiness/safety.',
        },
        {
          id: 2,
          title: 'Mapped 1-5 Helpfulness Scale',
          detail: 'Converted guideline definitions into a clear score range from not helpful to extremely helpful.',
        },
        {
          id: 3,
          title: 'Built Scoring Logic',
          detail: 'Started from a baseline score and adjusted based on response quality, missing intent, and severity of issues.',
        },
        {
          id: 4,
          title: 'Automated Gemini Evaluation',
          detail: 'Sent prompt, candidate response, and parsed rubric to Gemini with structured evaluation instructions.',
        },
        {
          id: 5,
          title: 'Validated Output',
          detail: 'Generated scores, reasons, and summaries, reaching 90% precision across 5,000+ queries.',
        },
      ],
      tools: [
        {
          name: 'Gemini API',
          role: 'Scored responses against the helpfulness rubric and generated reasoning.',
        },
        {
          name: 'Prompt Engineering',
          role: 'Converted human evaluation rules into consistent model instructions.',
        },
        {
          name: 'Semantic Similarity',
          role: 'Compared response content with user intent and context.',
        },
        {
          name: 'Python',
          role: 'Handled data processing, API orchestration, aggregation, and validation.',
        },
      ],
    },
  },
  {
    id: 'ai-mode-extraction',
    title: 'Google AI Mode Data Extraction & Evaluation',
    company: 'Google xWS via Highspring',
    category: 'Analytics',
    problem: 'AI Mode responses with missing tables, cards, or images needed to be diagnosed at scale.',
    approach:
      'Automated the extraction of AI Mode responses and multimodal metadata from 10,000+ weekly links, using Python, HTTP requests, Regex, JSON parsing, and Google Sheets-based input.',
    outcome: 'Enabled scalable AI quality evaluation and provided actionable insights to the client on multimodality loss and response quality.',
    tech: ['Python', 'Google Sheets', 'HTTP Requests', 'Regex', 'JSON', 'GenAI Evaluation'],
    processDoc: {
      title: 'Architecture Summary',
      subtitle: 'Stateless Frontend Extraction Pipeline for Google AI Mode',
      problemHeading: 'The Problem: Diagnosing Multimodality Loss',
      problem: 'AI Mode links needed to be evaluated at scale for missing tables, cards, images, and other multimodal signals. Backend access was restricted, so the solution used a stateless frontend extraction pipeline.',
      steps: [
        {
          id: 1,
          title: 'Loaded AI Mode Links',
          detail: 'Read query tracker rows, cleaned metadata, and queued share.google/aimode URLs.',
        },
        {
          id: 2,
          title: 'Fetched Raw HTML',
          detail: 'Used lightweight HTTP requests instead of browser rendering for faster extraction.',
        },
        {
          id: 3,
          title: 'Extracted Wiz Payloads',
          detail: 'Located AF_initDataCallback blocks and sliced embedded JSON payloads from the HTML.',
        },
        {
          id: 4,
          title: 'Mapped Evaluation Fields',
          detail: 'Parsed nested JSON to extract query, clean AI response, citations, and multimodal flags.',
        },
        {
          id: 5,
          title: 'Delivered Evaluation Data',
          detail: 'Exported structured records for QA evaluation and client-facing insights.',
        },
      ],
      tools: [
        {
          name: 'Python (urllib / HTTP Requests)',
          role: 'Fetched raw HTML quickly without a headless browser.',
        },
        {
          name: 'SOCS Cookie (SOCS=CAIiAhAB)',
          role: 'Prevented consent redirects during automated requests.',
        },
        {
          name: 'Google Wiz Framework & AF_initDataCallback',
          role: 'Provided the embedded state blocks used for extraction.',
        },
        {
          name: 'Regular Expressions (Regex)',
          role: 'Located and isolated payload blocks inside minified HTML.',
        },
        {
          name: 'JSON Parser',
          role: 'Converted extracted payloads into structured fields.',
        },
      ],
    },
  },
  {
    id: 'knowledge-base-chatbot',
    title: 'Knowledge Base Chatbot',
    company: 'TheFinansol',
    category: 'Generative AI',
    problem: 'Customer support teams needed document-grounded answers from uploaded knowledge-base PDFs without hallucinations.',
    approach:
      'Built a PDF-based RAG chatbot with chunking, embeddings, semantic retrieval, grounding prompts, and scope guardrails.',
    outcome: 'Achieved 95% accuracy on grounded answers and reliably refused out-of-scope questions.',
    tech: ['RAG', 'Claude Haiku', 'PostgreSQL', 'FAISS', 'Pandas', 'Semantic Search', 'Prompt Engineering'],
    processDoc: {
      title: 'PDF-Based Knowledge Base Chatbot',
      subtitle: 'A RAG chatbot that turns uploaded PDFs into queryable, grounded knowledge sources.',
      problemHeading: 'The Problem: Grounded Support Answers',
      problem: 'Customer support teams needed answers directly from uploaded knowledge-base content, without relying on a general-purpose LLM\'s memory. The key challenge was preventing hallucinated answers when the source PDF did not contain enough relevant information.',
      steps: [
        {
          id: 1,
          title: 'PDF Upload & Extraction',
          detail: 'Accepted uploaded PDFs and extracted their text for downstream retrieval.',
        },
        {
          id: 2,
          title: 'Chunking & Embeddings',
          detail: 'Split documents into chunks, generated embeddings, and indexed them for search.',
        },
        {
          id: 3,
          title: 'Semantic Retrieval',
          detail: 'Embedded the user question and retrieved the most relevant document passages.',
        },
        {
          id: 4,
          title: 'Grounded LLM Answering',
          detail: 'Sent only retrieved context plus the question to Claude Haiku with a grounding prompt.',
        },
        {
          id: 5,
          title: 'Scope Guardrail',
          detail: 'Declined questions when relevant source evidence was not found, preventing unsupported answers.',
        },
      ],
      tools: [
        {
          name: 'RAG + Semantic Search',
          role: 'Retrieved relevant PDF chunks before generation so answers stayed source-grounded.',
        },
        {
          name: 'Claude Haiku',
          role: 'Generated concise answers using only the retrieved document context.',
        },
        {
          name: 'FAISS / PostgreSQL',
          role: 'Stored and searched embeddings for fast similarity-based retrieval.',
        },
        {
          name: 'Pandas',
          role: 'Supported preprocessing, validation, and analysis of extracted content.',
        },
      ],
    },
  },
];

export const personalProjects = [
  {
    id: 'credit-risk-stresslab',
    title: 'Credit Risk StressLab',
    category: 'Machine Learning',
    problem: 'How can credit risk decisions become transparent, explainable, and adaptable to economic stress scenarios?',
    approach:
      'Combined XGBoost for risk prediction with SHAP for explainability, economic stress testing for scenario analysis, and NVIDIA NIM-hosted Llama 3.1 for multilingual GenAI credit explanations in a real-time Flask + React application.',
    outcome: 'Delivered an interactive platform that turns black-box credit scoring into auditable, multilingual insights with live scenario simulation.',
    tech: ['XGBoost', 'SHAP', 'Llama 3.1', 'Flask', 'React', 'NVIDIA NIM'],
    links: { github: 'https://github.com/m-rishab/Credit-Risk-StressLab', live: 'https://credit-risk-stresslab-production.up.railway.app' },
  },
  {
    id: 'datasentinel',
    title: 'DataSentinel',
    category: 'Generative AI',
    problem: 'How can teams verify a dataset\'s license, provenance, and trustworthiness before building on it?',
    approach:
      'Built a multi-agent pipeline using LangGraph that ingests Kaggle/HuggingFace dataset URLs, audits license and consent signals, traces citations with retraction checks, profiles data quality, and aggregates findings into an evidence-backed 0-100 trust score.',
    outcome: 'Created a full-stack provenance watchdog with a live dashboard, CI-gate API, and real-time SSE progress streaming.',
    tech: ['FastAPI', 'LangGraph', 'NVIDIA Nemotron', 'React', 'Tailwind', 'SQLite'],
    links: { github: 'https://github.com/m-rishab/DataSentinal', live: 'https://dataasentinal.onrender.com' },
  },
  {
    id: 'modelpilot',
    title: 'ModelPilot',
    category: 'Generative AI',
    problem: 'How can LLM API costs be reduced without sacrificing response quality for complex prompts?',
    approach:
      'Developed a cost-aware routing system that scores every prompt for complexity in real time using heuristics (or an optional XGBoost model) and routes to the cheapest capable NVIDIA NIM model across tiered pricing bands, with full request telemetry logged to SQLite.',
    outcome: 'Achieved 50-87% savings on simple traffic while maintaining quality on hard prompts, with a live streaming UI and savings dashboard.',
    tech: ['FastAPI', 'XGBoost', 'NVIDIA NIM', 'SSE', 'SQLite', 'Vanilla JS'],
    links: { github: 'https://github.com/m-rishab/ModelPilot', live: 'https://modelpilo-nv.up.railway.app' },
  },
  {
    id: 'diet-workout-gemini',
    title: 'Diet & Workout Recommendation System',
    category: 'Generative AI',
    problem: 'How can AI deliver personalized health and fitness plans that adapt to individual body metrics, dietary preferences, and regional constraints?',
    approach:
      'Built a Streamlit app powered by Google Gemini Pro and LangChain that takes user inputs — age, gender, height, weight, region, dietary preference, allergies, and health conditions — and generates tailored diet and workout plans through structured prompt chains.',
    outcome: 'Delivered a user-friendly interface producing actionable, personalized nutrition and fitness recommendations powered by GenAI.',
    tech: ['Google Gemini Pro', 'LangChain', 'Streamlit', 'Python'],
    links: { github: 'https://github.com/m-rishab/Diet-and-workout-Recommendation-using-Google-Gemini-pro', live: 'https://diet-and-workout-recommendation-using-app-gemini-pro.streamlit.app/' },
  },
];

export const navLinks = [
  { label: 'About', href: '#about-story' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Now', href: '#now' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
];

export const about = {
  story:
    "I started with machine learning projects in college — loan prediction, stock trends, sentiment analysis. Then I built AI voice agents, RAG chatbots, and text-to-speech systems at TheFinansol. Now at Highspring, I work on Google Search — building automated evaluation pipelines and data extraction systems that process billions of queries across Google Search Results Page and AI Mode. The thread is the same — turning raw data into trustworthy, actionable output.",
  focus: 'Data Science · AI Engineering · Applied ML',
  focusCards: [
    {
      label: 'Search & Analytics',
      detail: 'EDA, dashboards, and SQL-driven insights across Google Search — SRP performance, AI Mode extraction, and query analysis at scale.',
    },
    {
      label: 'AI Evaluation',
      detail: 'Automated rating engines and extraction pipelines that make GenAI output measurable, not mysterious.',
    },
    {
      label: 'Applied ML',
      detail: 'XGBoost, SHAP, cost-aware routing — production models that solve real business constraints.',
    },
    {
      label: 'GenAI & RAG',
      detail: 'Retrieval-augmented systems, multi-agent pipelines, and LLM apps grounded in real data.',
    },
  ],
};

export const now = [
  {
    label: 'Current Role',
    title: 'Associate Analyst — Google xWS via Highspring',
    detail: 'AI performance analysis, automated evaluation workflows, and SQL reporting across large-scale query datasets.',
  },
  {
    label: 'Currently Exploring',
    title: 'Multi-Agent AI Systems',
    detail: 'Building autonomous pipelines with LangGraph and LLM orchestration for complex data workflows.',
  },
  {
    label: 'Building',
    title: 'AI Evaluation Tooling',
    detail: 'Expanding automated scoring and extraction systems to handle multimodal GenAI outputs at scale.',
  },
  {
    label: 'Currently Learning',
    title: 'Advanced RAG Architectures',
    detail: 'Hybrid retrieval, reranking strategies, and grounding techniques for enterprise-grade LLM applications.',
  },
];

export const writing = [
  {
    date: '2026',
    title: 'Credit Risk StressLab',
    description: 'How can credit risk decisions become transparent, explainable, and adaptable to economic stress scenarios?',
    tech: ['XGBoost', 'SHAP', 'Llama 3.1', 'Flask', 'React', 'NVIDIA NIM'],
    link: 'https://github.com/m-rishab/Credit-Risk-StressLab',
  },
  {
    date: '2026',
    title: 'DataSentinel',
    description: 'How can teams verify a dataset\'s license, provenance, and trustworthiness before building on it?',
    tech: ['FastAPI', 'LangGraph', 'NVIDIA Nemotron', 'React', 'Tailwind', 'SQLite'],
    link: 'https://github.com/m-rishab/DataSentinal',
  },
  {
    date: '2026',
    title: 'ModelPilot',
    description: 'How can LLM API costs be reduced without sacrificing response quality for complex prompts?',
    tech: ['FastAPI', 'XGBoost', 'NVIDIA NIM', 'SSE', 'SQLite', 'Vanilla JS'],
    link: 'https://github.com/m-rishab/ModelPilot',
  },
];
