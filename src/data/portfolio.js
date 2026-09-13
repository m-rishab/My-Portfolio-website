export const profile = {
  name: 'Rishabh Mishra',
  title: 'Data Analyst, AI & ML Engineer',
  email: 'rish.mishra130801@gmail.com',
  phone: '+91-9650411517',
  location: 'Faridabad, Haryana, India',
  cvUrl: 'https://drive.google.com/file/d/1nof1qCZEbznEaUdwiXV41xYcjRcWsQvh/view?usp=sharing',
  cvPreviewUrl: 'https://drive.google.com/file/d/1nof1qCZEbznEaUdwiXV41xYcjRcWsQvh/preview',
  social: {
    linkedin: 'https://www.linkedin.com/in/rishabhh-mishra/',
    github: 'https://github.com/m-rishab',
  },
  roles: ['Data Analyst', 'ML Engineer', 'Applied AI'],
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
    roles: [
      { title: 'Data Analyst', period: 'Jun 2025 - Present' },
      { title: 'Associate Analyst', period: 'Dec 2024 - Jun 2025' },
    ],
    role: 'Data Analyst',
    location: 'Gurugram, Haryana',
    period: 'Dec 2024 - Present',
    type: 'Full-time',
    summary:
      'I work on Google\'s search-evaluation program — grading how well AI answers perform, building automated quality checks, and turning findings into clear reports for clients and leadership.',
    highlights: [
      'Built an automated scoring system that rates how helpful AI answers are — it matched human reviewers 90% of the time across 5,000+ answers and cut manual review work by 70%.',
      'Built a weekly extraction pipeline that automatically collects and cleans 10,000+ Google AI Mode answers, so the team no longer gathers them by hand.',
      'Created monthly dashboards comparing Google AI Mode with ChatGPT and Perplexity — the main report used in client review meetings.',
      'Designed an automated research workflow powered by AI with live Google search, cutting research turnaround from days to minutes.',
      'Led a 15-person analyst team as the point of contact, holding a 95% quality benchmark and presenting insights to leadership.',
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
      'Built applied AI prototypes — voice assistants, document question-answering, and text-to-speech systems.',
    highlights: [
      'Designed the conversation flow for an AI voice assistant — scheduling, answering from a knowledge base, and live call transfer — so calls felt natural and stayed on track.',
      'Built a text-to-speech service for the assistant, cutting the voice response delay by 30%.',
      'Ran A/B tests on the assistant\'s replies — small experiments in tone and phrasing that made interactions noticeably clearer.',
      'Built a document-powered Q&A assistant that answers only from uploaded PDFs — right 95% of the time, and it refuses questions outside those documents instead of guessing.',
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
    problem: 'Checking thousands of AI answers by hand was slow, and different reviewers judged the same answer differently.',
    approach:
      'Built an automated scoring workflow that rates each answer against clear guidelines — relevance to the question, clarity, accuracy, and safety — using prompt engineering and semantic similarity to keep scores consistent.',
    outcome: 'Matched human reviewers 90% of the time across 5,000+ answers and cut manual evaluation effort by 70%.',
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
    problem: 'Google AI Mode answers sometimes come back missing tables, cards, or images — and the team needed a fast way to spot those gaps across thousands of links.',
    approach:
      'Built a Python pipeline that fetches each AI Mode link directly, then pulls out the answer and all its parts — text, tables, images, and citations — automatically, using simple HTTP requests instead of a browser.',
    outcome: 'Processed 10,000+ AI Mode links every week and gave the team and client clear, weekly visibility into where answers were losing tables, cards, or images.',
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
    problem: 'Support teams needed answers straight from company documents — and couldn\'t risk the AI making things up.',
    approach:
      'Built a chatbot that searches uploaded PDFs and answers only from what it finds in them — using retrieval-augmented generation (RAG) to keep every reply grounded in the source documents.',
    outcome: 'Answers grounded in the documents were right 95% of the time — and it politely declined questions outside those documents instead of guessing.',
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
      'Predicts credit risk with an ML model, explains every decision in plain terms, stress-tests it against economic scenarios, and auto-writes credit reports in 3 languages.',
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
      'Runs five AI agents over a dataset — checking its license, quality, citations, and duplicates — and combines the evidence into a clear 0-100 trust score before you build on it.',
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
      'Measures how hard each prompt is, then routes it to the cheapest AI model that can still handle it well — cutting costs 50-87% on simple traffic without hurting quality on hard prompts.',
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
      'Takes your age, body metrics, dietary preferences, allergies, and health conditions — then generates a personalized diet and workout plan built around your routine and region.',
    outcome: 'Delivered a user-friendly interface producing actionable, personalized nutrition and fitness recommendations powered by GenAI.',
    tech: ['Google Gemini Pro', 'LangChain', 'Streamlit', 'Python'],
    links: { github: 'https://github.com/m-rishab/Diet-and-workout-Recommendation-using-Google-Gemini-pro', live: 'https://diet-and-workout-recommendation-using-app-gemini-pro.streamlit.app/' },
  },
];

export const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Now', href: '#now' },
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
    title: 'Data Analyst — Google xWS via Highspring',
    detail: 'Measuring how well Google\'s AI answers perform, building automated quality checks, and turning findings into simple dashboards and reports.',
  },
  {
    label: 'Currently Exploring',
    title: 'Multi-Agent AI Systems',
    detail: 'Learning how to get multiple AI agents to work together on multi-step data workflows without a human in the loop.',
  },
  {
    label: 'Building',
    title: 'AI Evaluation Tooling',
    detail: 'Scaling up the tools that automatically score AI-generated answers and spot quality problems early.',
  },
  {
    label: 'Currently Learning',
    title: 'Practical RAG',
    detail: 'Improving how AI answers questions strictly from real documents — better retrieval, fewer made-up answers.',
  },
];

export const writing = [
  {
    date: '2026',
    title: 'Credit Risk StressLab',
    description: 'How can credit risk decisions stay transparent and explainable even as the economy shifts?',
    tech: ['XGBoost', 'SHAP', 'Llama 3.1', 'Flask', 'React', 'NVIDIA NIM'],
    link: 'https://github.com/m-rishab/Credit-Risk-StressLab',
  },
  {
    date: '2026',
    title: 'DataSentinel',
    description: 'How can you trust a dataset before you build on it?',
    tech: ['FastAPI', 'LangGraph', 'NVIDIA Nemotron', 'React', 'Tailwind', 'SQLite'],
    link: 'https://github.com/m-rishab/DataSentinal',
  },
  {
    date: '2026',
    title: 'ModelPilot',
    description: 'How can AI costs drop without sacrificing answer quality?',
    tech: ['FastAPI', 'XGBoost', 'NVIDIA NIM', 'SSE', 'SQLite', 'Vanilla JS'],
    link: 'https://github.com/m-rishab/ModelPilot',
  },
];
