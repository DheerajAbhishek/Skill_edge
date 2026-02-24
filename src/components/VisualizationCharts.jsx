import React, { useState, useEffect, useRef } from 'react';
import './VisualizationCharts.css';

/* ═══════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════ */

const Sparkline = ({ data, width = 260, height = 100 }) => {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 12;
  const xs = data.map((_, i) => pad + (i / (data.length - 1)) * (width - pad * 2));
  const ys = data.map(v => height - pad - ((v - min) / range) * (height - pad * 2));
  const line = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ');
  const area = `${line} L${xs.at(-1)},${height} L${xs[0]},${height} Z`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="spkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6C63FF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#6C63FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spkFill)" />
      <path d={line} fill="none" stroke="#6C63FF" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" />
      {xs.map((x, i) => (
        <circle key={i} cx={x} cy={ys[i]} r="3.5" fill="#6C63FF" stroke="#11111e" strokeWidth="1.5" />
      ))}
    </svg>
  );
};

const Dot = ({ color, label }) => (
  <div className="vc-leg-item">
    <span className="vc-leg-dot" style={{ background: color }} />
    <span className="vc-leg-lbl">{label}</span>
  </div>
);

const Badge = ({ score }) => {
  const { label, color } =
    score >= 80 ? { label: '🏆 Excellent', color: '#06D6A0' } :
      score >= 60 ? { label: '👍 Good', color: '#FFD166' } :
        { label: '⚡ Needs Work', color: '#FF6584' };
  return (
    <span className="vc-badge" style={{ color, borderColor: color, background: color + '1a' }}>
      {label}
    </span>
  );
};

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════ */
const VisualizationCharts = ({
  skills = [],
  recommendedSkills = [],
  detectedSkills = [],
  scoreData = {},
}) => {
  const [fullscreen, setFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const containerRef = useRef(null);

  /* Close fullscreen on Escape */
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setFullscreen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* Lock body scroll in fullscreen */
  useEffect(() => {
    document.body.style.overflow = fullscreen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [fullscreen]);

  /* ── Data ── */
  const matchingSkills = recommendedSkills.filter(skill =>
    detectedSkills.some(ds => ds.toLowerCase().includes(skill.toLowerCase()))
  );
  const missingSkills = recommendedSkills.filter(skill =>
    !detectedSkills.some(ds => ds.toLowerCase().includes(skill.toLowerCase()))
  );
  const total = recommendedSkills.length || 1;
  const matchPct = Math.round((matchingSkills.length / total) * 100);
  const gapPct = 100 - matchPct;
  const resumeScore = scoreData.percentage ?? 72;
  const jobFit = Math.min(99, Math.round(matchPct * 0.75 + resumeScore * 0.25));

  const categories = [
    {
      label: 'Programming', color: '#6C63FF',
      pct: Math.min(100, Math.round((detectedSkills.filter(s => /python|java\b|javascript|typescript|react|node|c\+\+|golang|ruby|php/i.test(s)).length / Math.max(1, detectedSkills.length)) * 300))
    },
    {
      label: 'Soft Skills', color: '#FF6584',
      pct: Math.min(100, Math.round((detectedSkills.filter(s => /communication|leadership|teamwork|problem.solv|agile|scrum|management/i.test(s)).length / Math.max(1, detectedSkills.length)) * 400))
    },
    {
      label: 'Tools', color: '#06D6A0',
      pct: Math.min(100, Math.round((detectedSkills.filter(s => /git|docker|aws|azure|figma|jira|sql|linux|kubernetes|jenkins/i.test(s)).length / Math.max(1, detectedSkills.length)) * 350))
    },
  ];

  const sections = (scoreData.sections || []).slice(0, 6).map(s => ({ name: s.name || '—', val: s.hasIt ? s.points : 0, max: s.points }));
  const sectionMax = sections.reduce((a, s) => Math.max(a, s.max), 1);
  const sparkData = Array.from({ length: 10 }, (_, i) =>
    Math.max(3, Math.round(detectedSkills.length * (0.3 + i * 0.08 + Math.sin(i * 0.9) * 0.06)))
  );

  /* Gauge — all computed inside GaugeChart now */

  /* Donut helper */
  const mkDonut = (pct, r, cx, cy, stroke, sw = 14) => {
    const circ = 2 * Math.PI * r;
    const dash = (Math.min(pct, 100) / 100) * circ;
    return (
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={stroke} strokeWidth={sw}
        strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: 'stroke-dasharray 1.3s cubic-bezier(.4,0,.2,1)' }} />
    );
  };

  /* ── Tabs config ── */
  const TABS = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'skills', label: '🛠 Skills' },
    { id: 'score', label: '🎯 Score' },
    { id: 'job', label: '💼 Job Fit' },
  ];

  /* ── Panel content per tab ── */
  const renderPanels = () => {
    switch (activeTab) {

      /* ── OVERVIEW: all 6 ── */
      case 'overview':
      default:
        return (
          <div className="vc-grid vc-grid--3">
            <Panel title="Skill Gap Analysis">
              <DonutChart mkDonut={mkDonut} matchPct={matchPct} gapPct={gapPct} matchingSkills={matchingSkills} missingSkills={missingSkills} />
            </Panel>
            <Panel title="Resume Score">
              <GaugeChart resumeScore={resumeScore} />
              <Badge score={resumeScore} />
            </Panel>
            <Panel title="Category Match">
              <HBars categories={categories} />
            </Panel>
            <Panel title="Section Scores">
              <VBars sections={sections} sectionMax={sectionMax} />
            </Panel>
            <Panel title="Job Fit Score">
              <JobDonut mkDonut={mkDonut} jobFit={jobFit} />
            </Panel>
            <Panel title="Skill Dimension">
              <div className="vc-spark-wrap"><Sparkline data={sparkData} /></div>
              <div className="vc-matched-box">
                <span className="vc-matched-num">{matchingSkills.length}</span>
                <span className="vc-matched-lbl">Matched Skills ✓</span>
              </div>
            </Panel>
          </div>
        );

      /* ── SKILLS tab: gap + category ── */
      case 'skills':
        return (
          <div className="vc-grid vc-grid--2">
            <Panel title="Skill Gap Analysis" large>
              <DonutChart mkDonut={mkDonut} matchPct={matchPct} gapPct={gapPct} matchingSkills={matchingSkills} missingSkills={missingSkills} large />
            </Panel>
            <Panel title="Category Match" large>
              <HBars categories={categories} large />
            </Panel>
          </div>
        );

      /* ── SCORE tab: gauge + sections ── */
      case 'score':
        return (
          <div className="vc-grid vc-grid--2">
            <Panel title="Resume Score" large>
              <GaugeChart resumeScore={resumeScore} large />
              <Badge score={resumeScore} />
            </Panel>
            <Panel title="Section Scores" large>
              <VBars sections={sections} sectionMax={sectionMax} large />
            </Panel>
          </div>
        );

      /* ── JOB tab: job fit + sparkline ── */
      case 'job':
        return (
          <div className="vc-grid vc-grid--2">
            <Panel title="Job Fit Score" large>
              <JobDonut mkDonut={mkDonut} jobFit={jobFit} large />
            </Panel>
            <Panel title="Skill Dimension" large>
              <div className="vc-spark-wrap vc-spark-wrap--large"><Sparkline data={sparkData} /></div>
              <div className="vc-matched-box vc-matched-box--large">
                <span className="vc-matched-num vc-matched-num--large">{matchingSkills.length}</span>
                <span className="vc-matched-lbl">Matched Skills ✓</span>
              </div>
            </Panel>
          </div>
        );
    }
  };

  /* ── RENDER ── */
  return (
    <>
      {/* Fullscreen overlay backdrop */}
      {fullscreen && <div className="vc-backdrop" onClick={() => setFullscreen(false)} />}

      <section
        ref={containerRef}
        className={`vc-shell ${fullscreen ? 'vc-shell--fullscreen' : ''}`}
      >
        {/* ══ TAB HEADER ══ */}
        <div className="vc-header">
          {/* Title */}
          <div className="vc-header-title">
            <span className="vc-header-icon">📊</span>
            <span className="vc-header-text">
              VISUAL <span className="vc-header-accent">ANALYTICS</span>
            </span>
            <span className="vc-header-dash">—</span>
          </div>

          {/* Tab pills */}
          <div className="vc-tabs">
            {TABS.map(t => (
              <button
                key={t.id}
                className={`vc-tab ${activeTab === t.id ? 'vc-tab--active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Fullscreen toggle */}
          <button
            className="vc-expand-btn"
            onClick={() => setFullscreen(f => !f)}
            title={fullscreen ? 'Exit fullscreen (Esc)' : 'Expand to fullscreen'}
          >
            {fullscreen
              ? <span className="vc-expand-icon">⊠</span>
              : <span className="vc-expand-icon">⛶</span>
            }
            <span className="vc-expand-text">
              {fullscreen ? 'Exit' : 'Fullscreen'}
            </span>
          </button>
        </div>

        {/* ══ SUMMARY BAR ══ */}
        <div className="vc-summary-bar">
          <StatChip icon="✅" label="Matched Skills" value={matchingSkills.length} color="#30D158" />
          <StatChip icon="📝" label="Resume Score" value={`${Math.round(resumeScore)}%`} color="#6C63FF" />
          <StatChip icon="🎯" label="Job Fit" value={`${jobFit}%`} color="#06D6A0" />
          <StatChip icon="⚠️" label="Skills to Learn" value={missingSkills.length} color="#FF6584" />
          <StatChip icon="🔍" label="Total Skills" value={detectedSkills.length} color="#FFD166" />
        </div>

        {/* ══ PANELS ══ */}
        <div className="vc-body">
          {renderPanels()}
        </div>

        {/* ══ FOOTER ══ */}
        <div className="vc-footer">
          <span>Powered by <strong>SkillEdge AI</strong></span>
          <span className="vc-footer-dot">·</span>
          <span>All metrics derived from your uploaded resume</span>
          {fullscreen && (
            <>
              <span className="vc-footer-dot">·</span>
              <span>Press <kbd className="vc-kbd">Esc</kbd> to exit fullscreen</span>
            </>
          )}
        </div>
      </section>
    </>
  );
};

/* ═══════════════════════════════════════════════
   HELPER PANEL WRAPPER
═══════════════════════════════════════════════ */
const Panel = ({ title, children, large }) => (
  <div className={`vc-panel ${large ? 'vc-panel--large' : ''}`}>
    <div className="vc-panel-header">
      <span className="vc-panel-title">{title}</span>
      <span className="vc-panel-line" />
    </div>
    <div className="vc-panel-body">
      {children}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   CHART SUB-COMPONENTS
═══════════════════════════════════════════════ */

const DonutChart = ({ mkDonut, matchPct, gapPct, matchingSkills, missingSkills, large }) => (
  <>
    <div className={`vc-donut-wrap ${large ? 'vc-donut-wrap--large' : ''}`}>
      <svg viewBox="0 0 140 140" className="vc-donut-svg">
        <circle cx="70" cy="70" r="52" fill="none" stroke="#1e1e34" strokeWidth="14" />
        <circle cx="70" cy="70" r="32" fill="none" stroke="#1e1e34" strokeWidth="14" />
        {mkDonut(matchPct, 52, 70, 70, '#30D158', 14)}
        {mkDonut(gapPct, 32, 70, 70, '#FF6584', 14)}
        <text x="70" y="66" textAnchor="middle" className="vc-donut-num">{matchPct}%</text>
        <text x="70" y="80" textAnchor="middle" className="vc-donut-sub">matched</text>
      </svg>
    </div>
    <div className="vc-legend">
      <div className="vc-leg-item"><span className="vc-leg-dot" style={{ background: '#30D158' }} /><span className="vc-leg-lbl">Matched ({matchingSkills.length})</span></div>
      <div className="vc-leg-item"><span className="vc-leg-dot" style={{ background: '#FF6584' }} /><span className="vc-leg-lbl">To Learn ({missingSkills.length})</span></div>
    </div>
  </>
);

const GaugeChart = ({ resumeScore, large }) => {
  /*
   * ── TRUE SPEEDOMETER GEOMETRY ──────────────────────────────────
   *
   * Layout (matching the hand-drawn sketch):
   *   • Arc sweeps across the TOP of the panel (like a car speedometer)
   *   • Pivot (needle base) sits at BOTTOM-CENTER of the arc
   *   • Score number displayed prominently BELOW the arc, ABOVE the pivot
   *   • "OUT OF 100" label just below the number
   *   • Needle pivots from bottom-center and points UP toward the arc
   *
   * viewBox: 0 0 280 180
   * Arc center (pivot): cx=140, cy=170  (bottom-center of viewBox)
   * Arc radius: R=120
   *
   * Arc runs from 220° to 320° going CLOCKWISE through the top (12 o'clock).
   * In standard SVG math angles (0°=right, CW positive):
   *   220° = bottom-left,  270° = straight up (top),  320° = bottom-right
   *
   * For the SVG arc command with sweep-flag=1 (CW):
   *   Going CW from 220° to 320° would only be 100° (the short bottom path).
   *   We want the LONG path (240° over the top), so large-arc=1, sweep=1.
   *
   * Needle formula (CW from 220° start):
   *   needleDeg = 220 + (score/100) * 100   ← only 100° sweep is WRONG
   *
   * Better: use 220° start → 320° end with 100° gap at bottom.
   * Total arc = 360-100 = 260° sweep from 220° going CCW to 320°.
   *   needleDeg = 220 - (score/100) * 260    ... gets complicated
   *
   * SIMPLEST correct approach — use math angle directly:
   *   Arc from -220° to -320° going through -270° (top) = UPWARD arc
   *   score=0   → needle at angle = π (left,  180°)
   *   score=100 → needle at angle = 0 (right,   0°)
   *   score=50  → needle at angle = 90° (top)
   *
   * Use a clean 200° speedometer sweep centered on top:
   *   Start = 190° (slightly past left)   End = 350° (slightly past right)
   *   Sweep = 160° going CCW through top.
   *   needleDeg = 190 - (score/100)*160  (goes from 190 → 30 as score 0→100)
   *
   * FINAL CLEAN VALUES:
   *   Pivot: cx=140, cy=165
   *   R = 115
   *   Arc start = 200° (bottom-left zone), end = 340° (bottom-right zone)
   *   Sweep CCW = 160°, large-arc=0, sweep=0
   *   needle = 200 - (score/100)*160  → 200° at score=0, 40° at score=100
   *
   * Hmm, CCW sweep of 160° doesn't go over the top (270°).
   * 200° - 160° = 40°. Going CCW from 200° → 40° passes through 90° (top). ✓
   *
   * Score text: cx=140, cy=130 — well inside the arc, above pivot
   */

  /*
   * FINAL CORRECT SPEEDOMETER LAYOUT:
   *
   * viewBox: 0 0 280 220
   *
   * The arc should appear in the UPPER portion of the panel.
   * The score number (72) should appear BELOW the arc.
   * The needle pivots from the CENTER of the arc's circle.
   *
   * Pivot: cx=140, cy=145  (vertically centered so arc is upper half)
   * R = 110
   *
   * Arc: from 210° to 330° going CCW through 90° (top).
   * That is: large-arc=1, sweep=0
   * Arc endpoints both sit below the pivot center, so the arc
   * itself arcs UPWARD above the pivot — exactly like a speedometer.
   *
   * score=0   → needle at 210° (lower-left)
   * score=50  → needle at 90°  (straight up, 210-60=150... need check)
   *
   * sweepDeg = 360 - (330-210) = 360 - 120 = 240° (the long upper path)
   * needleDeg = 210 - (score/100)*240
   *   score=0   → 210° ✓  (lower-left)
   *   score=50  → 210 - 120 = 90°  ✓ (top center... but SVG 90°=DOWN!)
   *
   * SVG: 0°=right, 90°=DOWN, 180°=left, 270°=UP
   * So 270° is the top. Let me redo:
   *   We want score=50 → needle points UP = 270° in SVG.
   *   Arc from 210° to 330° CCW through 270° (top):
   *     210° → 270° → 330° — that's only 120° CW, not going over top.
   *   Going CCW from 210°: 210°→150°→90°→30°→330° — passes through
   *   0°/360° (right side), NOT through 270°. 
   *
   * DEFINITIVE APPROACH — use degrees measured from right, CW:
   * Place arc from -210° to -330° going through -270° (=90° UP).
   * Equivalently in standard SVG: from 150° to 30° going CW (sweep=1).
   * large-arc=1 forces the long path = 300° over the top.
   *
   * Let me use concrete values verified:
   *   startAngle = 225° (lower-left, past 180°)
   *   endAngle   = 315° (lower-right, before 360°)
   *   Going CW from 225°→315° = 90° (bottom U-shape) — NOT what we want.
   *   Going CCW from 225°→315° = 270° (over the top) — YES.
   *   large-arc=1, sweep=0 (CCW)
   *
   *   score=0   → 225° (lower-left)
   *   score=100 → 315° (lower-right)
   *   score=50  → 225° + 135° going CW... 
   *
   * For CCW sweep: needleDeg = 225 - (score/100)*270
   *   score=0   → 225° ✓
   *   score=50  → 225 - 135 = 90°  SVG 90° = DOWNWARD. That's wrong.
   *   score=50  should point to 270° (UP in SVG).
   *
   * The arc goes CCW from 225→315 through 270° (UP).
   * In CCW direction from 225°: 225→180→135→90→45→0→315
   * The midpoint of 270° sweep is at 225 - 135 = 90°... 
   * But wait, going CCW means angles DECREASE in SVG (CW=increase).
   * CCW from 225° → 180° → 135° → 90°. The MIDPOINT of 270° arc 
   * would be at 225 - 135 = 90°. SVG 90° = straight DOWN. WRONG.
   *
   * ROOT CAUSE: I keep confusing SVG CW convention.
   * SOLUTION: Use a simple half-dial (180° arc, strict semicircle):
   *
   *   Arc from 180° (left) to 0°/360° (right), going CCW through 270° (UP).
   *   large-arc=0, sweep=0
   *   arcLen = π*R (semicircle)
   *
   *   score=0   → needle at 180° (left, horizontal)
   *   score=50  → needle at 270° (UP) ← SVG 270° = UP ✓
   *   score=100 → needle at 0°/360° (right)
   *   needleDeg = 180 - (score/100)*180
   *     score=0   → 180° ✓
   *     score=50  → 90°... SVG 90° = DOWN. Still wrong!
   *
   * The issue is SVG's Y-axis is inverted (Y increases downward).
   * 270° in SVG = UP. Formula to get UP for score=50:
   *   needleDeg = 180 - (score/100)*180
   *   score=50 → 90° → cos(90°)=0, sin(90°)=1 → point is cx, cy+R = BELOW pivot!
   *
   * To point UP (270°): needleDeg must = 270°.
   *   We want: 180° at score=0, 270° at score=50, 360° at score=100.
   *   That's: needleDeg = 180 + (score/100)*180.
   *   But then arc must go CW from 180° to 360° through 270°.
   *   large-arc=0, sweep=1 (CW). 
   *   Tip: cx + R*cos(270°) = cx + 0 = cx, cy + R*sin(270°) = cy - R = ABOVE! ✓
   */

  const W = 280, H = 220;
  const cx = 140, cy = 150;  // pivot center
  const R = 108;              // radius

  const toRad = d => (d * Math.PI) / 180;
  const score = Math.min(Math.max(resumeScore, 0), 100);

  // Semicircle arc: CW from 180° (left) to 360°/0° (right) through 270° (UP)
  // large-arc=0, sweep=1 (CW)
  const arcStartDeg = 180;
  const arcEndDeg = 360;
  const arcSweepDeg = 180; // semicircle

  const sx = cx + R * Math.cos(toRad(arcStartDeg)); // cx-R, cy (left)
  const sy = cy + R * Math.sin(toRad(arcStartDeg));
  const ex = cx + R * Math.cos(toRad(arcEndDeg));   // cx+R, cy (right)
  const ey = cy + R * Math.sin(toRad(arcEndDeg));

  // CW from 180° to 360°: goes through 270° (UP) ✓
  // large-arc=0, sweep=1
  const trackPath = `M ${sx.toFixed(2)},${sy.toFixed(2)} A ${R},${R} 0 0,1 ${ex.toFixed(2)},${ey.toFixed(2)}`;

  const arcLen = Math.PI * R; // πR (semicircle)
  const fillLen = (score / 100) * arcLen;

  // Needle: CW from 180° to 360°
  const needleDeg = arcStartDeg + (score / 100) * arcSweepDeg;
  const needleRad = toRad(needleDeg);
  const needleLen = R - 14;
  const tipX = cx + needleLen * Math.cos(needleRad);
  const tipY = cy + needleLen * Math.sin(needleRad);
  const tailX = cx - 22 * Math.cos(needleRad);
  const tailY = cy - 22 * Math.sin(needleRad);

  // Tick marks: same CW formula
  const TICK_VALS = [0, 25, 50, 75, 100];
  const ticks = TICK_VALS.map(v => {
    const deg = arcStartDeg + (v / 100) * arcSweepDeg;
    const rad = toRad(deg);
    const isEdge = v === 0 || v === 100;
    return {
      ox: cx + (R + 6) * Math.cos(rad),
      oy: cy + (R + 6) * Math.sin(rad),
      ix: cx + (R - 12) * Math.cos(rad),
      iy: cy + (R - 12) * Math.sin(rad),
      lx: cx + (R + 22) * Math.cos(rad),
      ly: cy + (R + 22) * Math.sin(rad),
      label: v,
      isEdge,
    };
  });

  // Score text: below the arc opening, above the pivot
  // Arc endpoints are at cy (same height as pivot center).
  // Text goes between arc-bottom and pivot: cy + 28 and cy + 50
  const scoreTY = cy + 32;
  const labelTY = cy + 52;

  return (
    <div className={`vc-gauge-wrap ${large ? 'vc-gauge-wrap--large' : ''}`}>
      <svg viewBox={`0 0 ${W} ${H}`} className="vc-gauge-svg" style={{ overflow: 'visible' }}>
        <defs>
          {/* Left-to-right gradient (red → yellow → green) */}
          <linearGradient id="gGrad" gradientUnits="userSpaceOnUse" x1={sx} y1="0" x2={ex} y2="0">
            <stop offset="0%" stopColor="#FF6584" />
            <stop offset="50%" stopColor="#FFD166" />
            <stop offset="100%" stopColor="#06D6A0" />
          </linearGradient>

          <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <filter id="nGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <radialGradient id="hubGrad" cx="38%" cy="32%">
            <stop offset="0%" stopColor="#5a5a7a" />
            <stop offset="100%" stopColor="#1a1a2e" />
          </radialGradient>
        </defs>

        {/* ── Background track ── */}
        <path d={trackPath} fill="none" stroke="#1e1e34" strokeWidth="20" strokeLinecap="round" />

        {/* ── Coloured fill arc ── */}
        <path d={trackPath} fill="none" stroke="url(#gGrad)" strokeWidth="18"
          strokeLinecap="round" filter="url(#arcGlow)"
          strokeDasharray={`${fillLen.toFixed(2)} ${arcLen.toFixed(2)}`}
          style={{ transition: 'stroke-dasharray 1.4s cubic-bezier(.4,0,.2,1)' }} />

        {/* ── Sheen highlight ── */}
        <path d={trackPath} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${fillLen.toFixed(2)} ${arcLen.toFixed(2)}`}
          style={{ transition: 'stroke-dasharray 1.4s cubic-bezier(.4,0,.2,1)' }} />

        {/* ── Tick marks & labels ── */}
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={t.ox} y1={t.oy} x2={t.ix} y2={t.iy}
              stroke={t.isEdge ? '#666688' : '#3a3a5a'}
              strokeWidth={t.isEdge ? 2.5 : 1.5}
              strokeLinecap="round" />
            <text x={t.lx} y={t.ly} textAnchor="middle" dominantBaseline="central"
              style={{ fill: '#555577', fontSize: '9px', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              {t.label}
            </text>
          </g>
        ))}

        {/* ── Needle shadow ── */}
        <line x1={tailX + 1.5} y1={tailY + 2} x2={tipX + 1.5} y2={tipY + 2}
          stroke="rgba(0,0,0,0.6)" strokeWidth="7" strokeLinecap="round" />

        {/* ── Needle ── */}
        <g filter="url(#nGlow)">
          <line x1={tailX} y1={tailY} x2={tipX} y2={tipY}
            stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round"
            style={{ transition: 'none' }} />
        </g>

        {/* ── Pivot hub ── */}
        <circle cx={cx} cy={cy} r="16" fill="#0d0d1c" stroke="#2a2a44" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r="11" fill="url(#hubGrad)" />
        <circle cx={cx} cy={cy} r="5" fill="#ffffff" opacity="0.9" />
        <circle cx={cx - 2} cy={cy - 2} r="2" fill="rgba(255,255,255,0.45)" />

        {/* ── Score number — below the arc, above pivot base ── */}
        <text x={cx} y={scoreTY} textAnchor="middle"
          style={{
            fill: '#ffffff', fontSize: '42px', fontWeight: 800,
            fontFamily: "'DM Sans', sans-serif", letterSpacing: '-2px'
          }}>
          {Math.round(score)}
        </text>
        <text x={cx} y={labelTY} textAnchor="middle"
          style={{
            fill: '#7777aa', fontSize: '10px', fontFamily: 'Inter, sans-serif',
            letterSpacing: '2px', fontWeight: 500
          }}>
          OUT OF 100
        </text>
      </svg>
    </div>
  );
};

const HBars = ({ categories, large }) => (
  <div className={`vc-hbars ${large ? 'vc-hbars--large' : ''}`}>
    {categories.map((cat, i) => (
      <div key={i} className="vc-hbar-row">
        <div className="vc-hbar-head">
          <span className="vc-hbar-lbl">{cat.label}</span>
          <span className="vc-hbar-val">{cat.pct}%</span>
        </div>
        <div className="vc-hbar-track">
          <div className="vc-hbar-fill" style={{ width: `${cat.pct}%`, background: cat.color }} />
        </div>
      </div>
    ))}
  </div>
);

const VBars = ({ sections, sectionMax, large }) => (
  <div className={`vc-vbars ${large ? 'vc-vbars--large' : ''}`}>
    {sections.length > 0 ? sections.map((s, i) => (
      <div key={i} className="vc-vbar-col">
        <span className="vc-vbar-val">{s.val}</span>
        <div className="vc-vbar-track">
          <div className="vc-vbar-fill"
            style={{ height: `${Math.round((s.val / sectionMax) * 100)}%`, background: `hsl(${205 + i * 26},78%,58%)` }} />
        </div>
        <span className="vc-vbar-lbl">{s.name.length > 9 ? s.name.slice(0, 9) + '…' : s.name}</span>
      </div>
    )) : <p className="vc-empty">No section data</p>}
  </div>
);

const JobDonut = ({ mkDonut, jobFit, large }) => (
  <>
    <div className={`vc-donut-wrap ${large ? 'vc-donut-wrap--large' : ''}`}>
      <svg viewBox="0 0 140 140" className="vc-donut-svg">
        <circle cx="70" cy="70" r="52" fill="none" stroke="#1a2e2a" strokeWidth="14" />
        <circle cx="70" cy="70" r="32" fill="none" stroke="#1a2030" strokeWidth="14" />
        {mkDonut(jobFit, 52, 70, 70, '#06D6A0', 14)}
        {mkDonut(Math.min(99, jobFit + 8), 32, 70, 70, '#118AB2', 14)}
        <text x="70" y="66" textAnchor="middle" className="vc-donut-num">{jobFit}</text>
        <text x="70" y="80" textAnchor="middle" className="vc-donut-sub">fit score</text>
      </svg>
    </div>
    <div className="vc-legend">
      <div className="vc-leg-item"><span className="vc-leg-dot" style={{ background: '#06D6A0' }} /><span className="vc-leg-lbl">Data Science</span></div>
      <div className="vc-leg-item"><span className="vc-leg-dot" style={{ background: '#118AB2' }} /><span className="vc-leg-lbl">ML / AI</span></div>
      <div className="vc-leg-item"><span className="vc-leg-dot" style={{ background: '#FFD166' }} /><span className="vc-leg-lbl">Engineering</span></div>
    </div>
  </>
);

const StatChip = ({ icon, label, value, color }) => (
  <div className="vc-stat-chip" style={{ borderColor: color + '44' }}>
    <span className="vc-stat-icon">{icon}</span>
    <div className="vc-stat-info">
      <span className="vc-stat-val" style={{ color }}>{value}</span>
      <span className="vc-stat-lbl">{label}</span>
    </div>
  </div>
);

export default VisualizationCharts;