import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Layers, GitBranch, ChevronRight, ArrowDown, ZoomIn, Maximize2 } from 'lucide-react';
import ratingEngineWorkflow from '../../assets/img/ai-rating-engine-workflow.webp';
import googleAiModePipeline from '../../assets/img/google-ai-mode-pipeline.webp';
import knowledgeBaseChatbotArchitecture from '../../assets/img/knowledge-base-chatbot-architecture.webp';

/* ─── Easing ─────────────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1];

/* ─── Color map ──────────────────────────────────────────────── */
const CM = {
  blue:   { border:'border-blue-500/30',    bg:'bg-blue-500/10',    text:'text-blue-400',    dot:'bg-blue-400',    glow:'rgba(59,130,246,0.25)'  },
  yellow: { border:'border-yellow-500/30',  bg:'bg-yellow-500/10',  text:'text-yellow-400',  dot:'bg-yellow-400',  glow:'rgba(234,179,8,0.25)'   },
  green:  { border:'border-emerald-500/30', bg:'bg-emerald-500/10', text:'text-emerald-400', dot:'bg-emerald-400', glow:'rgba(16,185,129,0.25)'  },
  purple: { border:'border-purple-500/30',  bg:'bg-purple-500/10',  text:'text-purple-400',  dot:'bg-purple-400',  glow:'rgba(168,85,247,0.25)'  },
  cyan:   { border:'border-cyan-500/30',    bg:'bg-cyan-500/10',    text:'text-cyan-400',    dot:'bg-cyan-400',    glow:'rgba(6,182,212,0.25)'   },
  orange: { border:'border-orange-500/30',  bg:'bg-orange-500/10',  text:'text-orange-400',  dot:'bg-orange-400',  glow:'rgba(249,115,22,0.25)'  },
  red:    { border:'border-red-500/30',     bg:'bg-red-500/10',     text:'text-red-400',     dot:'bg-red-400',     glow:'rgba(239,68,68,0.25)'   },
};

/* ─── Floating background particles ──────────────────────────── */
function BackdropParticles() {
  const pts = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1.5 + Math.random() * 2,
    dur: 4 + Math.random() * 6,
    delay: Math.random() * 4,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {pts.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-400/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [-6, 6, -6], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ─── Horizontal arrow — 3 staggered particles ───────────────── */
function HArrow({ delay = 0 }) {
  return (
    <div className="flex items-center flex-shrink-0" style={{ width: 40 }}>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay, duration: 0.55, ease }}
        style={{ transformOrigin: 'left', flex: 1, position: 'relative', height: 2, overflow: 'hidden' }}
        className="rounded-full"
      >
        {/* Base line — visible on light bg */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(37,99,235,0.35), rgba(37,99,235,0.10))' }} />
        {/* 3 traveling blue particles */}
        {[0, 0.55, 1.1].map((offset, i) => (
          <motion.div
            key={i}
            style={{ position: 'absolute', top: 0, bottom: 0, width: '18%', background: 'linear-gradient(to right, transparent, rgba(37,99,235,0.75), transparent)', borderRadius: 9999 }}
            animate={{ x: ['-100%', '650%'] }}
            transition={{ repeat: Infinity, duration: 1.7, delay: delay + 0.9 + offset, ease: 'linear' }}
          />
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: delay + 0.45, duration: 0.3 }}
      >
        <ChevronRight size={12} className="text-blue-400 flex-shrink-0" />
      </motion.div>
    </div>
  );
}

/* ─── Vertical arrow — 3 staggered particles ─────────────────── */
function VArrow({ delay = 0 }) {
  return (
    <div className="flex flex-col items-center" style={{ height: 36 }}>
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ delay, duration: 0.55, ease }}
        style={{ transformOrigin: 'top', flex: 1, position: 'relative', width: 2, overflow: 'hidden' }}
        className="rounded-full"
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(37,99,235,0.35), rgba(37,99,235,0.10))' }} />
        {[0, 0.55, 1.1].map((offset, i) => (
          <motion.div
            key={i}
            style={{ position: 'absolute', left: 0, right: 0, height: '18%', background: 'linear-gradient(to bottom, transparent, rgba(37,99,235,0.75), transparent)', borderRadius: 9999 }}
            animate={{ y: ['-100%', '650%'] }}
            transition={{ repeat: Infinity, duration: 1.7, delay: delay + 0.9 + offset, ease: 'linear' }}
          />
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.45, duration: 0.3 }}
      >
        <ArrowDown size={12} className="text-blue-400 flex-shrink-0" />
      </motion.div>
    </div>
  );
}

/* ─── Architecture node ─────────────────────────────────────── */
function ArchNode({ title, items, color = 'blue', delay = 0, pulse = false }) {
  const c = CM[color] || CM.blue;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease }}
      whileHover={{ scale: 1.035, boxShadow: `0 0 22px ${c.glow}`, transition: { duration: 0.18 } }}
      className={'relative rounded-xl border ' + c.border + ' ' + c.bg + ' p-2.5 cursor-default overflow-hidden'}
    >
      <motion.div
        initial={{ x: '-120%' }}
        animate={{ x: '200%' }}
        transition={{ delay: delay + 0.3, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, transparent 40%, rgba(37,99,235,0.06) 50%, transparent 60%)', pointerEvents: 'none' }}
      />
      {pulse && (
        <span className="absolute -top-1 -right-1">
          {[0, 0.4, 0.8].map(d => (
            <motion.span
              key={d}
              className={'absolute inline-flex rounded-full ' + c.dot}
              style={{ width: 10, height: 10, top: 0, right: 0 }}
              animate={{ scale: [1, 2.2, 2.8], opacity: [0.6, 0.2, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, delay: d, ease: 'easeOut' }}
            />
          ))}
          <span className={'relative inline-flex rounded-full h-2.5 w-2.5 ' + c.dot} />
        </span>
      )}
      <p className={'text-[10px] font-bold uppercase tracking-wide leading-snug mb-1.5 ' + c.text}>{title}</p>
      {items && (
        <ul className="space-y-0.5">
          {items.map((it, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <span className={'mt-[5px] flex-shrink-0 w-1 h-1 rounded-full ' + c.dot} />
              <span className="text-[9px] text-black leading-tight">{it}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

/* ─── Section wrapper — top label bar ───────────────────────── */
function ArchSection({ label, color, children, delay = 0, className = '' }) {
  const c = CM[color] || CM.blue;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease }}
      className={'rounded-2xl border ' + c.border + ' overflow-hidden relative ' + className}
    >
      <motion.div
        initial={{ x: '-105%' }}
        animate={{ x: '110%' }}
        transition={{ delay: delay + 0.15, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, transparent 30%, rgba(37,99,235,0.04) 50%, transparent 70%)', pointerEvents: 'none', zIndex: 5 }}
      />
      <div className={'px-3 py-1.5 border-b ' + c.border + ' flex items-center gap-2 bg-gray-50 relative z-10'}>
        <motion.span
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: delay + 0.5 }}
          className={'w-1.5 h-1.5 rounded-full flex-shrink-0 ' + c.dot}
        />
        <span className={'text-[10px] font-bold uppercase tracking-widest ' + c.text}>{label}</span>
      </div>
      <div className="p-3 md:p-4 relative z-10">{children}</div>
    </motion.div>
  );
}

/* ─── Checklist item (reusable) ──────────────────────────────── */
function CheckItem({ label, color = 'green', delay = 0 }) {
  const c = CM[color] || CM.green;
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35, ease }}
      className="flex items-center gap-1.5"
    >
      <span className={'flex-shrink-0 w-3.5 h-3.5 rounded-full border flex items-center justify-center ' + c.border + ' ' + c.bg}>
        <span className={'text-[7px] font-bold ' + c.text}>✓</span>
      </span>
      <span className="text-[9px] text-black leading-tight">{label}</span>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   AI MODE — Architecture View
   ════════════════════════════════════════════════════════════════ */
function AIModeArchView() {
  return (
    <div className="space-y-2">
      <ArchSection label="1  ·  Input Source" color="blue" delay={0.05}>
        <div className="flex items-center gap-1 flex-wrap">
          <ArchNode color="blue" delay={0.12} pulse title="Google Sheets (Query Tracker)" items={['Query / Prompt', 'share.google/aimode URL', 'Language / Locale', 'Metadata']} />
          <HArrow delay={0.24} />
          <ArchNode color="blue" delay={0.30} title="Batch Reader" items={['Read rows in batches', 'Validate & clean data', 'Deduplicate URLs']} />
          <HArrow delay={0.42} />
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.48, duration: 0.45, ease }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(234,179,8,0.3)', transition: { duration: 0.18 } }}
            className="flex-shrink-0 rounded-xl border border-yellow-500/40 bg-yellow-500/10 px-3 py-2 text-center cursor-default overflow-hidden relative"
          >
            <motion.div
              initial={{ x: '-120%' }} animate={{ x: '220%' }}
              transition={{ delay: 0.7, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, transparent 40%, rgba(37,99,235,0.06) 50%, transparent 60%)', pointerEvents: 'none' }}
            />
            <p className="text-yellow-400 text-[10px] font-bold uppercase tracking-wide whitespace-nowrap">Enqueue URLs<br />for Processing</p>
          </motion.div>
          <HArrow delay={0.60} />
          <ArchNode color="cyan" delay={0.66} pulse title="Input Queue" items={['URLs queued for', 'parallel workers']} />
        </div>
      </ArchSection>

      <div className="flex justify-center"><VArrow delay={0.72} /></div>

      <ArchSection label="2  ·  Extraction & Parsing — Parallel Workers" color="yellow" delay={0.65}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <ArchNode color="yellow" delay={0.75} title="2.1  Request Init"      items={['Inject SOCS Cookie', 'Bypass GDPR Wall', 'Set Headers']} />
          <ArchNode color="yellow" delay={0.82} title="2.2  HTTP Fetching"     items={['Stateless HTTP GET', 'No Browser / Session', 'HTTP 200 OK']} />
          <ArchNode color="orange" delay={0.89} title="2.3  Data Interception" items={['Retrieve Raw HTML', 'Regex — AF_initDataCallback', 'Extract JSON String']} />
          <ArchNode color="orange" delay={0.96} title="2.4  Payload Parsing"   items={['Parse JSON', 'Deserialise Wiz SPA payload', 'Traverse Nested Arrays']} />
          <ArchNode color="yellow" delay={1.03} title="2.5  Data Mapping"      items={['Map & Extract Fields', 'User Query', 'AI Markdown Response', 'Multimodal Metadata']} />
        </div>
      </ArchSection>

      <div className="flex justify-center"><VArrow delay={1.08} /></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ArchSection label="3  ·  Evaluation (Internal)" color="green" delay={0.98}>
          <div className="flex flex-col gap-2">
            <ArchNode color="green" delay={1.08} title="Run Evaluations" items={['Multimodality Loss', 'Factuality', 'Citations', 'Policy Adherence']} />
            <div className="flex justify-center"><VArrow delay={1.16} /></div>
            <ArchNode color="green" delay={1.18} title="Generate Evaluation Results" items={['Scores, metrics & annotations']} />
          </div>
        </ArchSection>
        <ArchSection label="4  ·  Client Insights" color="purple" delay={1.02}>
          <ArchNode color="purple" delay={1.12} pulse title="Insights Delivered to Client" items={['Actionable insights', 'Multimodality loss analysis', 'Key findings', 'Response quality report']} />
        </ArchSection>
      </div>

      <div className="flex justify-center"><VArrow delay={1.22} /></div>

      <ArchSection label="Cross-Cutting Services — Applied Across All Stages" color="cyan" delay={1.18}>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <ArchNode color="cyan"   delay={1.26} title="Logging"         items={['Request logs', 'Status & errors']} />
          <ArchNode color="cyan"   delay={1.31} title="Monitoring"      items={['Throughput, latency']} />
          <ArchNode color="orange" delay={1.36} title="Retry & Backoff" items={['Auto retries', 'Exponential backoff']} />
          <ArchNode color="yellow" delay={1.41} title="Storage (Raw)"   items={['Raw HTML / JSON']} />
          <ArchNode color="green"  delay={1.46} title="Security"        items={['No PII stored', 'Access controlled']} />
        </div>
      </ArchSection>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.4 }}
        className="flex flex-wrap gap-4 pt-3 border-t border-gray-200"
      >
        {[
          { dot: 'bg-blue-400',    label: 'Input Layer'          },
          { dot: 'bg-yellow-400',  label: 'Extraction & Parsing' },
          { dot: 'bg-emerald-400', label: 'Evaluation'           },
          { dot: 'bg-purple-400',  label: 'Client Output'        },
          { dot: 'bg-cyan-400',    label: 'Cross-Cutting'        },
        ].map(({ dot, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <motion.div className={'w-2 h-2 rounded-full ' + dot} animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 2, delay: Math.random() * 2 }} />
            <span className="text-[9px] text-black">{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <div className="relative flex items-center">
            <div className="w-5 h-px bg-gradient-to-r from-white/30 to-white/10" />
            <ChevronRight size={8} className="text-gray-300 -ml-0.5" />
          </div>
          <span className="text-[9px] text-black">Data Flow</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   AI RATING ENGINE — Architecture View
   ════════════════════════════════════════════════════════════════ */
function RatingEngineArchView() {
  const evalFactors = [
    { label: 'Satisfies User Intent', color: 'blue'   },
    { label: 'Easy to Understand',    color: 'yellow' },
    { label: 'Factual & Accurate',    color: 'orange' },
    { label: 'Trustworthy & Safe',    color: 'green'  },
  ];

  const scoreScale = [
    { n: 1, short: 'Not at all', bg: 'bg-red-500'      },
    { n: 2, short: 'Somewhat',   bg: 'bg-orange-500'   },
    { n: 3, short: 'Mostly',     bg: 'bg-yellow-500'   },
    { n: 4, short: 'Very',       bg: 'bg-blue-500'     },
    { n: 5, short: 'Extremely',  bg: 'bg-emerald-500'  },
  ];

  const scoringSteps = [
    { title: 'Understand Primary Intent',  detail: 'Extract explicit & implicit requirements from the prompt'   },
    { title: 'Evaluate Against 4 Factors', detail: 'Check response on each factor using guidelines'            },
    { title: 'Aggregate Assessment',       detail: 'Combine factor scores to determine overall assessment'      },
    { title: 'Map to 5-Level Scale',       detail: 'Convert assessment to final score (1 to 5)'               },
    { title: 'Generate Explanations',      detail: 'Provide concise reasoning and factor-wise justification'   },
  ];

  const feedbackLoop = [
    { title: 'Store Evaluations',           detail: 'Scores, reasons, metadata archived'                          },
    { title: 'Quality Analytics',           detail: 'Track model performance, score distribution, common issues'  },
    { title: 'Guideline Refinement',        detail: 'Update rules, examples, and instructions'                    },
    { title: 'Model & Prompt Optimization', detail: 'Improve prompts and evaluation consistency'                  },
  ];


  return (
    <div className="space-y-3">

      {/* ─── Main Pipeline (sections 1–5) — horizontal scrollable ── */}
      <div className="overflow-x-auto pb-2 -mx-1 px-1">
        <div className="flex items-stretch gap-2" style={{ minWidth: 900 }}>

          {/* 1 — Inputs */}
          <ArchSection label="1 · Inputs" color="blue" delay={0.05} className="flex-shrink-0 w-36">
            <div className="space-y-2">
              <ArchNode color="blue" delay={0.12} pulse title="Prompt / Query" items={['User intent or question']} />
              <ArchNode color="blue" delay={0.18} title="Helpfulness Guidelines" items={['Scoring rubric & factors', 'Rating scale, examples']} />
            </div>
          </ArchSection>

          <div className="flex items-center flex-shrink-0"><HArrow delay={0.25} /></div>

          {/* 2 — Guidelines Scraping & Parsing */}
          <ArchSection label="2 · Guidelines Scraping & Parsing" color="cyan" delay={0.22} className="flex-shrink-0 w-44">
            <div className="space-y-2">
              <ArchNode color="cyan" delay={0.28} title="Scrape Guideline Document" items={['HTML / PDF / Drive / Confluence']} />
              <div className="space-y-1 pt-0.5">
                {['4 Evaluation Factors', '5-Level Rating Scale', 'Descriptions & Rules', 'Examples'].map((item, i) => (
                  <CheckItem key={item} label={item} color="green" delay={0.34 + i * 0.04} />
                ))}
              </div>
            </div>
          </ArchSection>

          <div className="flex items-center flex-shrink-0"><HArrow delay={0.50} /></div>

          {/* 3 — Evaluation Setup */}
          <ArchSection label="3 · Evaluation Setup" color="yellow" delay={0.46} className="flex-shrink-0 w-44">
            <div className="space-y-1.5">
              {[
                'Load Prompt (Primary User Intent)',
                'Load Candidate Responses (multiple models)',
                'Load Parsed Guidelines',
                'Create Evaluation Instructions via Prompt Engineering',
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 + i * 0.05, ease }}
                  className="flex items-start gap-1.5">
                  <span className="flex-shrink-0 mt-[4px] w-1 h-1 rounded-full bg-yellow-400" />
                  <span className="text-[9px] text-black leading-tight">{item}</span>
                </motion.div>
              ))}
            </div>
          </ArchSection>

          <div className="flex items-center flex-shrink-0"><HArrow delay={0.68} /></div>

          {/* 4 — Gemini-Based Evaluation */}
          <ArchSection label="4 · Gemini-Based Evaluation" color="purple" delay={0.64} className="flex-shrink-0 w-52">
            <div className="space-y-2">
              <ArchNode color="purple" delay={0.70} pulse title="Gemini Model  (Vertex AI / Gemini API)" items={['Evaluate each response against the 4 factors']} />

              {/* 4 factor pills */}
              <div className="grid grid-cols-2 gap-1">
                {evalFactors.map((f, i) => {
                  const c = CM[f.color] || CM.blue;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.82 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.76 + i * 0.05, ease }}
                      whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
                      className={'rounded-lg border ' + c.border + ' ' + c.bg + ' px-1.5 py-1.5 text-center cursor-default'}
                    >
                      <span className={'text-[8px] font-semibold leading-tight block ' + c.text}>{f.label}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Score scale 1–5 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.97 }}
                className="pt-1.5 border-t border-purple-500/20"
              >
                <p className="text-[8px] text-black uppercase tracking-wide mb-1.5">Assign Helpfulness Score</p>
                <div className="flex items-end gap-1">
                  {scoreScale.map(({ n, short, bg }, i) => (
                    <motion.div
                      key={n}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 + i * 0.06 }}
                      whileHover={{ y: -2, scale: 1.1, transition: { duration: 0.15 } }}
                      className="flex flex-col items-center gap-0.5 flex-1 cursor-default"
                    >
                      <motion.div
                        animate={{ boxShadow: n === 5 ? ['0 0 0px rgba(16,185,129,0)', '0 0 8px rgba(16,185,129,0.5)', '0 0 0px rgba(16,185,129,0)'] : 'none' }}
                        transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.3 }}
                        className={'w-5 h-5 rounded-full ' + bg + ' flex items-center justify-center flex-shrink-0'}
                      >
                        <span className="text-[9px] font-bold text-white">{n}</span>
                      </motion.div>
                      <span className="text-[7px] text-black text-center leading-tight">{short}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </ArchSection>

          <div className="flex items-center flex-shrink-0"><HArrow delay={0.84} /></div>

          {/* 5 — Outputs */}
          <ArchSection label="5 · Outputs" color="green" delay={0.80} className="flex-shrink-0 w-40">
            <div className="space-y-1.5">
              {[
                'Helpfulness Score (1 to 5)',
                'Factor-wise Justification',
                'Key Strengths',
                'Key Issues / Improvement Areas',
                'Final Explanation Summary',
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.86 + i * 0.06, ease }}
                  className="flex items-start gap-1.5">
                  <span className="flex-shrink-0 mt-[4px] w-1 h-1 rounded-full bg-emerald-400" />
                  <span className="text-[9px] text-gray-600 leading-tight">{item}</span>
                </motion.div>
              ))}
            </div>
          </ArchSection>

        </div>
      </div>

      {/* ─── Section 6 — Scoring Logic ─────────────────────────── */}
      <ArchSection label="6 · Scoring Logic (High Level)" color="orange" delay={0.95}>
        <div className="overflow-x-auto pb-1">
          <div className="flex items-stretch gap-2" style={{ minWidth: 680 }}>
            {scoringSteps.flatMap((step, i) => {
              const nodes = [
                <ArchNode key={'n' + i} color="orange" delay={1.01 + i * 0.07} title={step.title} items={[step.detail]} />
              ];
              if (i < scoringSteps.length - 1) {
                nodes.push(
                  <div key={'a' + i} className="flex items-center flex-shrink-0">
                    <HArrow delay={1.05 + i * 0.07} />
                  </div>
                );
              }
              return nodes;
            })}
          </div>
        </div>
      </ArchSection>

      {/* ─── Section 7 — Data & Feedback Loop ──────────────────── */}
      <ArchSection label="7 · Data & Feedback Loop" color="cyan" delay={1.38}>
        <div className="overflow-x-auto pb-1">
          <div className="flex items-stretch gap-2" style={{ minWidth: 560 }}>
            {feedbackLoop.flatMap((node, i) => {
              const items = [
                <ArchNode key={'n' + i} color="cyan" delay={1.44 + i * 0.07} title={node.title} items={[node.detail]} />
              ];
              if (i < feedbackLoop.length - 1) {
                items.push(
                  <div key={'a' + i} className="flex items-center flex-shrink-0">
                    <HArrow delay={1.48 + i * 0.07} />
                  </div>
                );
              }
              return items;
            })}
          </div>
        </div>
      </ArchSection>


      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.85, duration: 0.4 }}
        className="flex flex-wrap gap-4 pt-3 border-t border-gray-200"
      >
        {[
          { dot: 'bg-blue-400',    label: 'Inputs'           },
          { dot: 'bg-cyan-400',    label: 'Guidelines Parse' },
          { dot: 'bg-yellow-400',  label: 'Eval Setup'       },
          { dot: 'bg-purple-400',  label: 'Gemini Eval'      },
          { dot: 'bg-emerald-400', label: 'Outputs'          },
          { dot: 'bg-orange-400',  label: 'Scoring Logic'    },
        ].map(({ dot, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <motion.div className={'w-2 h-2 rounded-full ' + dot} animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 2.2 }} />
            <span className="text-[9px] text-black">{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <div className="relative flex items-center">
            <div className="w-5 h-px bg-gradient-to-r from-white/30 to-white/10" />
            <ChevronRight size={8} className="text-gray-300 -ml-0.5" />
          </div>
          <span className="text-[9px] text-black">Data Flow</span>
        </div>
      </motion.div>
    </div>
  );
}

function ArchitectureImageView({ src, alt, dark = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
      className={`rounded-xl border overflow-hidden ${
        dark ? 'border-slate-700 bg-slate-900' : 'border-gray-200 bg-gray-50'
      }`}
    >
      {/* label bar */}
      <div className={`px-4 py-2 border-b flex items-center gap-2 ${
        dark ? 'border-slate-700 bg-slate-800/60' : 'border-gray-100 bg-white'
      }`}>
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-black">{alt}</span>
      </div>
      {/* image — constrained height, centered, scrollable if content overflows */}
      <div className="overflow-auto p-4 flex justify-center bg-white/50">
        <img
          loading="lazy"
          src={src}
          alt={alt}
          className="block rounded-lg max-h-[55vh] w-auto max-w-full object-contain"
          style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}
        />
      </div>
    </motion.div>
  );
}


function KnowledgeBaseArchitectureView() {
  const flow = [
    'PDF Upload',
    'Text Extraction',
    'Chunking',
    'Embeddings',
    'Vector Index',
    'User Query',
    'Semantic Retrieval',
    'Relevant Context',
    'LLM',
    'Scope Check',
    'Answer / Refusal',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease }}
      className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm"
    >
      <div className="flex flex-wrap items-center gap-2">
        {flow.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.035, duration: 0.25 }}
              className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-900"
            >
              {step}
            </motion.div>
            {i < flow.length - 1 && <ChevronRight size={16} className="text-blue-500" />}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PROCESS / DOCUMENT VIEW  — minimalist redesign
   ════════════════════════════════════════════════════════════════ */
function ProcessView({ processDoc, tech }) {
  if (!processDoc) return null;

  return (
    <div className="space-y-6">

      {/* Title block */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-400 mb-1">{processDoc.title}</p>
        <p className="text-sm text-black leading-relaxed">{processDoc.subtitle}</p>
      </motion.div>

      {/* Problem */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.4, ease }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest text-black mb-2">{processDoc.problemHeading || 'The Problem'}</p>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
          {processDoc.problem.split('\n\n').map((para, i) => (
            <p key={i} className={'text-[13px] text-black leading-relaxed' + (i > 0 ? ' mt-2' : '')}>{para}</p>
          ))}
        </div>
      </motion.div>

      {/* Steps */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4, ease }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest text-black mb-3">How It Was Built</p>
        <div className="space-y-2">
          {processDoc.steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.38, ease }}
              className="flex gap-3 items-start rounded-lg border border-gray-100 bg-white px-3 py-2.5 hover:border-blue-100 transition-colors"
            >
              <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[10px] font-bold text-blue-600">
                {step.id}
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-black mb-0.5">{step.title}</p>
                <p className="text-[12px] text-black leading-relaxed">{step.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tools */}
      {processDoc.tools && processDoc.tools.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4, ease }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-black mb-3">Tools & Technologies</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {processDoc.tools.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.35, ease }}
                className="relative rounded-lg border border-gray-100 bg-white px-3 py-2.5 overflow-hidden"
                style={{ borderLeft: '2px solid #bfdbfe' }}
              >
                <p className="text-[13px] font-semibold text-black mb-0.5">{tool.name}</p>
                <p className="text-[12px] text-black leading-relaxed">{tool.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Stack */}
      {tech && tech.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.35 }}
          className="pt-4 border-t border-gray-100"
        >
          <p className="text-[10px] uppercase tracking-widest text-black mb-2">Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {tech.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.85 + i * 0.03, type: 'spring', stiffness: 200, damping: 20 }}
                className="px-2 py-0.5 rounded text-[11px] bg-blue-50 text-blue-700 border border-blue-100"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}


/* ════════════════════════════════════════════════════════════════
   MAIN MODAL
   ════════════════════════════════════════════════════════════════ */
export default function ProjectModal({ project, onClose }) {
  const overlayRef = useRef(null);
  const [activeTab, setActiveTab] = useState('process');
  const processDoc = project && project.processDoc;
  const isImageArchitecture = ['ai-rating-engine', 'ai-mode-extraction', 'knowledge-base-chatbot'].includes(project?.id) && activeTab === 'architecture';

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!processDoc) return null;

  const tabs = [
    { id: 'process',      label: 'Process',     Icon: Layers    },
    { id: 'architecture', label: 'Architecture', Icon: GitBranch },
  ];

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        onClick={handleOverlayClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-3 sm:p-4 md:p-10 bg-black/30 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.91, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 40 }}
          transition={{ duration: 0.48, ease }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full my-auto rounded-2xl overflow-hidden shadow-2xl max-w-3xl`}
          style={{
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          <motion.div
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #3b82f6, #8b5cf6, #06b6d4, #3b82f6, transparent)', backgroundSize: '200% 100%' }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-blue-500/5 blur-3xl pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '22px 22px' }}
          />
          <BackdropParticles />

          {/* Header */}
          <div className="relative z-10 px-4 sm:px-5 md:px-7 pt-5 sm:pt-6 pb-3 sm:pb-4 border-b border-gray-200">
            <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                  <div className="relative w-2 h-2">
                    {[0, 0.4, 0.8].map(d => (
                      <motion.div key={d} className="absolute inset-0 rounded-full bg-blue-400"
                        animate={{ scale: [1, 2.5, 3], opacity: [0.7, 0.2, 0] }}
                        transition={{ repeat: Infinity, duration: 2, delay: d, ease: 'easeOut' }} />
                    ))}
                    <div className="absolute inset-0 rounded-full bg-blue-400" />
                  </div>
                  <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.4 }}
                    className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-blue-400">
                    Project Breakdown
                  </motion.span>
                </div>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.45, ease }}
                  className="font-display text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-snug"
                >
                  {project.title}
                </motion.h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90, backgroundColor: 'rgba(0,0,0,0.06)', transition: { duration: 0.18 } }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="flex-shrink-0 p-2 rounded-lg text-gray-500 hover:text-gray-900 transition-colors border border-gray-200 hover:border-gray-300"
              >
                <X size={16} />
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex gap-1 p-1 rounded-xl bg-gray-100 border border-gray-200 w-fit"
            >
              {tabs.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className="relative flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium"
                  style={{ color: '#000000' }}
                >
                  {activeTab === id && (
                    <motion.div
                      layoutId="tab-bg"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.15))', border: '1px solid rgba(0,0,0,0.08)' }}
                      transition={{ type: 'spring', stiffness: 340, damping: 34 }}
                    />
                  )}
                  <Icon size={13} className="relative z-10" />
                  <span className="relative z-10">{label}</span>
                </button>
              ))}
            </motion.div>
          </div>

          {/* Scrollable content */}
          <div
            className="relative z-10 px-4 sm:px-5 md:px-7 py-4 sm:py-6 overflow-y-auto"
            style={{ maxHeight: '72vh' }}
          >
            <AnimatePresence mode="wait">
              {activeTab === 'process' && (
                <motion.div
                  key="process"
                  initial={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: 24, filter: 'blur(4px)' }}
                  transition={{ duration: 0.32, ease }}
                >
                  <ProcessView processDoc={processDoc} tech={project.tech} />
                </motion.div>
              )}

              {activeTab === 'architecture' && (
                <motion.div
                  key="arch"
                  initial={{ opacity: 0, x: 24, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
                  transition={{ duration: 0.32, ease }}
                >
                  {project.id === 'ai-rating-engine' && (
                    <ArchitectureImageView
                      src={ratingEngineWorkflow}
                      alt="AI Helpfulness Rating Engine evaluation workflow architecture"
                    />
                  )}
                  {project.id === 'ai-mode-extraction' && (
                    <ArchitectureImageView
                      src={googleAiModePipeline}
                      alt="Google AI Mode data extraction and evaluation pipeline architecture"
                      dark
                    />
                  )}
                  {project.id === 'knowledge-base-chatbot' && (
                    <ArchitectureImageView
                      src={knowledgeBaseChatbotArchitecture}
                      alt="PDF-Based Knowledge Assistant RAG architecture diagram"
                    />
                  )}
                  {!['ai-rating-engine', 'ai-mode-extraction', 'knowledge-base-chatbot'].includes(project.id) && <AIModeArchView />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
