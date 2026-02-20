import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const ITEMS = [
  {
    id: 1, name: "Excitement",
    description: "Extreme hyperactivity, constant motor unrest which is apparently non-purposeful. Not to be attributed to akathisia or goal-directed agitation.",
    video: "https://www.youtube.com/watch?v=mIbI-v6Q-jU",
    anchors: ["Absent","Excessive motion, intermittent","Constant motion, hyperkinetic without rest periods","Full-blown catatonic excitement, endless frenzied motor activity"],
    binary: false,
  },
  {
    id: 2, name: "Immobility / Stupor",
    description: "Extreme hypoactivity, immobile, minimally responsive to stimuli.",
    video: "https://youtu.be/-jcW3wlmOEo",
    anchors: ["Absent","Sits abnormally still, may interact briefly","Virtually no interaction with external world","Stuporous, non-reactive to painful stimuli"],
    binary: false,
  },
  {
    id: 3, name: "Mutism",
    description: "Verbally unresponsive or minimally responsive.",
    video: "https://youtu.be/h8cLSRkp2Io",
    anchors: ["Absent","Verbally unresponsive to majority of questions; incomprehensible whisper","Speaks less than 20 words/5 minutes","No speech"],
    binary: false,
  },
  {
    id: 4, name: "Staring",
    description: "Fixed gaze, little or no visual scanning of environment, decreased blinking.",
    video: "https://youtu.be/26bAY75JvXk",
    anchors: ["Absent","Poor eye contact, repeatedly gazes <20 sec between shifting; decreased blinking","Gaze held >20 sec, occasionally shifts attention","Fixed gaze, non-reactive"],
    binary: false,
  },
  {
    id: 5, name: "Posturing / Catalepsy",
    description: "Spontaneous maintenance of posture(s), including mundane (e.g., sitting/standing for long periods without reacting).",
    video: "https://youtu.be/SPJslTt4Rgc",
    anchors: ["Absent","Less than one minute","Greater than one minute, less than 15 minutes","Bizarre posture, or mundane maintained more than 15 min"],
    binary: false,
  },
  {
    id: 6, name: "Grimacing",
    description: "Maintenance of odd facial expressions.",
    video: "https://youtu.be/hxdJoqmvLos",
    anchors: ["Absent","Less than 10 sec","Less than 1 min","Bizarre expression(s) or maintained more than 1 min"],
    binary: false,
  },
  {
    id: 7, name: "Echopraxia / Echolalia",
    description: "Mimicking of examiner's movements/speech.",
    video: "https://youtu.be/8mvcg8lYbCU",
    anchors: ["Absent","Occasional","Frequent","Constant"],
    binary: false,
  },
  {
    id: 8, name: "Stereotypy",
    description: "Repetitive, non-goal-directed motor activity (e.g. finger-play; repeatedly touching, patting or rubbing self); abnormality not inherent in act but in its frequency.",
    video: "https://youtu.be/fxN_SvcnzYQ",
    anchors: ["Absent","Occasional","Frequent","Constant"],
    binary: false,
  },
  {
    id: 9, name: "Mannerisms",
    description: "Odd, purposeful movements (hopping or walking tiptoe, saluting passersby or exaggerated caricatures of mundane movements); abnormality inherent in act itself.",
    video: "https://youtu.be/gNC7DGa95jo",
    anchors: ["Absent","Occasional","Frequent","Constant"],
    binary: false,
  },
  {
    id: 10, name: "Verbigeration",
    description: "Repetition of phrases or sentences (like a scratched record).",
    video: "https://youtu.be/vKzDO-aBD2I",
    anchors: ["Absent","Occasional","Frequent, difficult to interrupt","Constant"],
    binary: false,
  },
  {
    id: 11, name: "Rigidity",
    description: "Maintenance of a rigid position despite efforts to be moved; exclude if cog-wheeling or tremor present.",
    video: "https://youtu.be/12BfJSzYuw0",
    anchors: ["Absent","Mild resistance","Moderate","Severe, cannot be repostured"],
    binary: false,
  },
  {
    id: 12, name: "Negativism",
    description: "Apparently motiveless resistance to instructions or attempts to move/examine patient. Contrary behavior, does exact opposite of instruction.",
    video: "https://youtu.be/dOlXxBmhwdg",
    anchors: ["Absent","Mild resistance and/or occasionally contrary","Moderate resistance and/or frequently contrary","Severe resistance and/or continually contrary"],
    binary: false,
  },
  {
    id: 13, name: "Waxy Flexibility",
    description: "During reposturing of patient, patient offers initial resistance before allowing himself to be repositioned, similar to that of a bending candle.",
    video: "https://youtu.be/DdTR8QzA7No",
    anchors: ["Absent","Present"],
    binary: true,
  },
  {
    id: 14, name: "Withdrawal",
    description: "Refusal to eat, drink and/or make eye contact.",
    video: "https://youtu.be/6eG7KL-IB3A",
    anchors: ["Absent","Minimal PO intake/interaction for less than one day","Minimal PO intake/interaction for more than one day","No PO intake/interaction for one day or more"],
    binary: false,
  },
  {
    id: 15, name: "Impulsivity",
    description: "Patient suddenly engages in inappropriate behavior (e.g. runs down hallway, starts screaming or takes off clothes) without provocation. Afterwards can give no, or only a facile explanation.",
    video: "https://youtu.be/cmA1JoJxjGQ",
    anchors: ["Absent","Occasional","Frequent","Constant or not redirectable"],
    binary: false,
  },
  {
    id: 16, name: "Automatic Obedience",
    description: "Exaggerated cooperation with examiner's request or spontaneous continuation of movement requested.",
    video: "https://youtu.be/dW5gYLWINyA",
    anchors: ["Absent","Occasional","Frequent","Constant"],
    binary: false,
  },
  {
    id: 17, name: "Mitgehen",
    description: '"Anglepoise lamp" arm raising in response to light pressure of finger, despite instructions to the contrary.',
    video: "https://youtu.be/xtjMxbjJ8yU",
    anchors: ["Absent","Present"],
    binary: true,
  },
  {
    id: 18, name: "Gegenhalten",
    description: "Resistance to passive movement which is proportional to strength of the stimulus; appears automatic rather than willful.",
    video: "https://youtu.be/2eez4EXPPT4",
    anchors: ["Absent","Present"],
    binary: true,
  },
  {
    id: 19, name: "Ambitendency",
    description: 'Patient appears motorically "stuck" in indecisive, hesitant movement.',
    video: "https://youtu.be/F4iu7X2_EFs",
    anchors: ["Absent","Present"],
    binary: true,
  },
  {
    id: 20, name: "Grasp Reflex",
    description: "Per neurological exam.",
    video: "https://youtu.be/ks7_HZ8mgwM",
    anchors: ["Absent","Present"],
    binary: true,
  },
  {
    id: 21, name: "Perseveration",
    description: "Repeatedly returns to same topic or persists with movement.",
    video: "https://youtu.be/RV1JjOXzA5U",
    anchors: ["Absent","Present"],
    binary: true,
  },
  {
    id: 22, name: "Combativeness",
    description: "Usually in an undirected manner, with no, or only a facile explanation afterwards.",
    video: "https://youtu.be/Nr7Rp_V1nZ4",
    anchors: ["Absent","Occasionally strikes out, low potential for injury","Frequently strikes out, moderate potential for injury","Serious danger to others"],
    binary: false,
  },
  {
    id: 23, name: "Autonomic Abnormality",
    description: "Select if abnormal.",
    video: "https://youtu.be/A7l6eB3Kwf0",
    anchors: ["Temperature","BP (exclude pre-existing HTN)","Pulse","Respiratory rate","Diaphoresis"],
    binary: false,
    autonomic: true,
  },
];

const AUTONOMIC_ABBREV = {
  "Temperature": "Temp",
  "BP (exclude pre-existing HTN)": "BP",
  "Pulse": "HR",
  "Respiratory rate": "RR",
  "Diaphoresis": "Diaphoresis",
};
const abbrevAutonomic = (selections) => {
  if (!Array.isArray(selections) || selections.length === 0) return null;
  return selections.map(s => AUTONOMIC_ABBREV[s] || s).join(", ");
};

const BENZO_OPTIONS = ["Lorazepam (Ativan)", "Diazepam (Valium)", "Clonazepam (Klonopin)", "Midazolam", "Other"];
const ROUTE_OPTIONS = ["P.O.", "IV", "IM", "SL"];

const initScores = () => Object.fromEntries(ITEMS.map(i => [i.id, i.autonomic ? [] : null]));

function formatDateTime(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
    " " + d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function calcTotal(scores) {
  return ITEMS.reduce((sum, item) => {
    const v = scores[item.id];
    if (item.autonomic) return sum + (v === 'none' ? 0 : Math.min(Array.isArray(v) ? v.length : 0, 3));
    if (v === null) return sum;
    if (item.binary) return sum + (v === 1 ? 3 : 0);
    return sum + v;
  }, 0);
}

// ─── DESCRIPTION POPOVER ──────────────────────────────────────────────────────
function DescPopover({ description, itemId }) {
  const [locked, setLocked] = useState(false); // stays open on click
  const [hovered, setHovered] = useState(false);
  const open = locked || hovered;
  const below = itemId === 1;
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <span
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setLocked(l => !l)}
        title="Click to pin description"
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 16, height: 16, borderRadius: "50%",
          background: locked ? "#1D4ED8" : "#1E293B",
          border: "1px solid " + (locked ? "#3B82F6" : "#334155"),
          color: locked ? "#fff" : "#64748B",
          fontSize: 10, fontWeight: 700, cursor: "pointer",
          flexShrink: 0, lineHeight: 1,
          transition: "all 0.15s",
          userSelect: "none",
        }}
      >?</span>
      {open && (
        <div style={{
          position: "absolute",
          [below ? "top" : "bottom"]: "calc(100% + 6px)",
          left: 0,
          zIndex: 9999,
          background: "#1E293B",
          border: "1px solid #334155",
          borderRadius: 8,
          padding: "10px 12px",
          width: 280,
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          pointerEvents: "none",
        }}>
          <p style={{ margin: 0, fontSize: 12, color: "#CBD5E1", lineHeight: 1.6 }}>
            {description}
          </p>
        </div>
      )}
    </span>
  );
}

// ─── AUTONOMIC ROW ───────────────────────────────────────────────────────────
function AutonomicRow({ item, value, onChange }) {
  const isNoneSelected = value === 'none';
  const selectedParams = Array.isArray(value) ? value : [];
  const score = Math.min(selectedParams.length, 3);
  const isAnswered = isNoneSelected || selectedParams.length > 0;

  const toggle = (param) => {
    if (param === 'none') {
      onChange(isNoneSelected ? [] : 'none');
      return;
    }
    // Selecting a param clears 'none'
    const next = selectedParams.includes(param)
      ? selectedParams.filter(p => p !== param)
      : [...selectedParams, param];
    onChange(next);
  };

  const Checkbox = ({ param, label, green }) => {
    const isSel = param === 'none' ? isNoneSelected : selectedParams.includes(param);
    return (
      <button onClick={() => toggle(param)} style={{
        display: "flex", alignItems: "center", gap: 8, textAlign: "left",
        background: isSel ? (green ? "#1A2E1A" : "#0C3D5C") : "transparent",
        border: isSel ? `1px solid ${green ? "#166534" : "#1D6FA4"}` : green ? "1px solid #1E293B" : "1px solid transparent",
        borderRadius: 5, padding: "3px 8px", cursor: "pointer",
        transition: "all 0.12s", width: "100%",
      }}>
        <span style={{
          width: 12, height: 12, borderRadius: 3, flexShrink: 0,
          border: `1.5px solid ${isSel ? (green ? "#4ADE80" : "#38BDF8") : "#334155"}`,
          background: isSel ? (green ? "#4ADE80" : "#38BDF8") : "transparent",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          {isSel && <span style={{ fontSize: 8, color: "#0A0F1A", fontWeight: 900 }}>✓</span>}
        </span>
        <span style={{ fontSize: 12, color: isSel ? (green ? "#86EFAC" : "#BAE6FD") : green ? "#475569" : "#64748B", lineHeight: 1.45 }}>
          {label}
        </span>
      </button>
    );
  };

  return (
    <div style={{
      padding: "10px 16px 12px",
      borderBottom: "1px solid #0F172A",
      background: isAnswered ? "#0C1628" : "transparent",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: "#334155", fontFamily: "monospace", flexShrink: 0 }}>23</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8", letterSpacing: "0.01em" }}>{item.name}</span>
        <DescPopover description={item.description} itemId={item.id} />
        <a href={item.video} target="_blank" rel="noopener noreferrer" title="Watch URMC video demonstration"
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 16, height: 16, borderRadius: "50%", background: "#0C2A1A", border: "1px solid #166534", color: "#4ADE80", fontSize: 8, fontWeight: 700, textDecoration: "none", flexShrink: 0, lineHeight: 1, transition: "all 0.15s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#14532D"; e.currentTarget.style.borderColor = "#22C55E"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#0C2A1A"; e.currentTarget.style.borderColor = "#166534"; }}
        >▶</a>
        <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: score > 0 ? "#38BDF8" : "#475569", fontFamily: "monospace" }}>
          +{score}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingLeft: 24 }}>
        {item.anchors.map(param => <Checkbox key={param} param={param} label={param} />)}
        <div style={{ borderTop: "1px solid #1E293B", marginTop: 4, paddingTop: 4 }}>
          <Checkbox param="none" label="None (all normal)" green />
        </div>
      </div>
    </div>
  );
}

// ─── SCORE ROW ───────────────────────────────────────────────────────────────
function ScoreRow({ item, value, onChange }) {
  const [nameHover, setNameHover] = useState(false);
  const opts = item.binary ? [0, 1] : [0, 1, 2, 3];

  return (
    <div style={{
      padding: "10px 16px 12px",
      borderBottom: "1px solid #0F172A",
      background: value !== null ? "#0C1628" : "transparent",
    }}>
      {/* Item name row */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: "#334155", fontFamily: "monospace", flexShrink: 0 }}>
          {String(item.id).padStart(2, "0")}
        </span>
        {/* Item name with hover description */}
        <span style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
          <span
            onMouseEnter={() => setNameHover(true)}
            onMouseLeave={() => setNameHover(false)}
            style={{
              fontSize: 13, fontWeight: 600,
              color: "#94A3B8",
              cursor: "default",
              letterSpacing: "0.01em",
            }}
          >
            {item.name}
          </span>
          {nameHover && (
            <div style={{
              position: "absolute",
              [item.id === 1 ? "top" : "bottom"]: "calc(100% + 6px)",
              left: 0,
              zIndex: 9999,
              background: "#1E293B",
              border: "1px solid #334155",
              borderRadius: 8,
              padding: "10px 12px",
              width: 280,
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
              pointerEvents: "none",
            }}>
              <p style={{ margin: 0, fontSize: 12, color: "#CBD5E1", lineHeight: 1.6 }}>
                {item.description}
              </p>
            </div>
          )}
        </span>
        {/* ? emblem */}
        <DescPopover description={item.description} itemId={item.id} />
        {/* ▶ video link emblem */}
        <a
          href={item.video}
          target="_blank"
          rel="noopener noreferrer"
          title="Watch URMC video demonstration"
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 16, height: 16, borderRadius: "50%",
            background: "#0C2A1A",
            border: "1px solid #166534",
            color: "#4ADE80",
            fontSize: 8, fontWeight: 700,
            textDecoration: "none",
            flexShrink: 0,
            lineHeight: 1,
            transition: "all 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#14532D"; e.currentTarget.style.borderColor = "#22C55E"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#0C2A1A"; e.currentTarget.style.borderColor = "#166534"; }}
        >▶</a>
      </div>
      {/* Anchor option buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingLeft: 24 }}>
        {opts.map(opt => {
          const selected = value === opt;
          const scoreLabel = item.binary ? (opt === 0 ? "0" : "3") : String(opt);
          const anchor = item.anchors[opt];
          return (
            <button
              key={opt}
              onClick={() => onChange(selected ? null : opt)}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 8,
                textAlign: "left",
                background: selected ? "#0C3D5C" : "transparent",
                border: selected ? "1px solid #1D6FA4" : "1px solid transparent",
                borderRadius: 5,
                padding: "3px 8px",
                cursor: "pointer",
                transition: "all 0.12s",
                width: "100%",
              }}
            >
              <span style={{
                fontSize: 12, fontWeight: 700, fontFamily: "monospace",
                color: selected ? "#38BDF8" : "#475569",
                flexShrink: 0,
                minWidth: 14,
              }}>
                {scoreLabel}
              </span>
              <span style={{
                fontSize: 12,
                color: selected ? "#BAE6FD" : "#64748B",
                lineHeight: 1.45,
              }}>
                {anchor}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function BFCRS() {
  const nowStr = () => { const d = new Date(); return d.toISOString().slice(0,16); };
  const [scores, setScores] = useState(initScores());
  const [benzo, setBenzo] = useState({ given: false, name: "Lorazepam (Ativan)", other: "", dose: "", unit: "mg", route: "", minutes: "" });
  const [assessmentTs, setAssessmentTs] = useState(nowStr());
  const [tables, setTables] = useState([]);
  const [copied, setCopied] = useState(false);
  const [tableCopied, setTableCopied] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null); // {tableId, entryIndex}
  const [saveModal, setSaveModal] = useState(false);
  const [newTableName, setNewTableName] = useState("");
  const [selectedTable, setSelectedTable] = useState(null);
  const [activeTab, setActiveTab] = useState("score");

  const total = calcTotal(scores);
  const answered = ITEMS.filter(i => i.autonomic ? (Array.isArray(scores[i.id]) && scores[i.id].length > 0) || scores[i.id] === 'none' : scores[i.id] !== null).length;
  const allAnswered = answered === 23;

  const handleScore = (id, val) => setScores(s => ({ ...s, [id]: val }));

  const buildEntry = () => {
    const ts = new Date(assessmentTs).getTime() || Date.now();
    const benzoStr = benzo.given
      ? `${benzo.name === "Other" ? benzo.other : benzo.name} ${benzo.dose}${benzo.unit} ${benzo.route}${benzo.minutes ? ", " + benzo.minutes + " min prior" : ""}`
      : null;
    return { ts, total, scores: { ...scores }, benzo: benzoStr };
  };

  const saveToTable = (tableId) => {
    const entry = buildEntry();
    setTables(prev => prev.map(t =>
      t.id === tableId ? { ...t, entries: [...t.entries, entry] } : t
    ));
    setSaveModal(false);
    setScores(initScores());
    setBenzo({ given: false, name: "Lorazepam (Ativan)", other: "", dose: "", unit: "mg", route: "", minutes: "" });
    setAssessmentTs(nowStr());
    setActiveTab("tables");
  };

  const createAndSave = () => {
    if (!newTableName.trim()) return;
    const entry = buildEntry();
    const newTable = { id: Date.now(), name: newTableName.trim(), entries: [entry] };
    setTables(prev => [...prev, newTable]);
    setNewTableName("");
    setSaveModal(false);
    setScores(initScores());
    setBenzo({ given: false, name: "Lorazepam (Ativan)", other: "", dose: "", unit: "mg", route: "", minutes: "" });
    setAssessmentTs(nowStr());
    setActiveTab("tables");
  };

  const deleteTable = (tableId) => {
    setTables(prev => prev.filter(t => t.id !== tableId));
  };

  const updateEntry = (tableId, entryIndex, patch) => {
    setTables(prev => prev.map(t => {
      if (t.id !== tableId) return t;
      const entries = t.entries.map((e, i) => i === entryIndex ? { ...e, ...patch } : e);
      return { ...t, entries };
    }));
  };

  const buildScoreText = (sc, ts, ben) => {
    const lines = [
      "Bush-Francis Catatonia Rating Scale",
      `Assessed: ${formatDateTime(ts || Date.now())}`,
      `Total Score: ${calcTotal(sc)}`,
      "",
    ];
    if (ben) {
      lines.push(`Benzodiazepine: ${ben}`);
      lines.push("");
    }
    ITEMS.forEach(item => {
      const v = sc[item.id];
      const display = item.autonomic ? (v === 'none' ? "0" : Array.isArray(v) && v.length > 0 ? `${Math.min(v.length,3)} [${abbrevAutonomic(v)}]` : "0") : v === null ? "-" : item.binary ? (v === 1 ? "3 (Present)" : "0 (Absent)") : String(v);
      lines.push(`${String(item.id).padStart(2, "0")}. ${item.name.padEnd(28, ".")} ${display}`);
    });
    return lines.join("\n");
  };

  const buildTableText = (table) => {
    const fmtDate = (ts) => {
      const d = new Date(ts);
      return d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
        .replace(",", " at");
    };
    const fmtBenzo = (b) => b ? ` (${b.replace(/,.*prior/, "").trim()})` : "";
    // Header
    const lines = ["Bush-Francis Catatonia Rating Scale", ""];
    // Date rows — one per entry
    table.entries.forEach(e => {
      lines.push(`${fmtDate(e.ts)}${e.benzo ? ` (${e.benzo})` : ""}`);
    });
    lines.push("");
    // Score rows
    const colW = 32;
    ITEMS.forEach(item => {
      const label = `${String(item.id).padStart(2,"0")}. ${item.name}`;
      const scores = table.entries.map(e => {
        const v = e.scores[item.id];
        if (item.autonomic) return v === 'none' ? "0" : Array.isArray(v) && v.length > 0 ? `${Math.min(v.length,3)} [${abbrevAutonomic(v)}]` : "-";
        return v === null ? "-" : item.binary ? (v === 1 ? "3" : "0") : String(v);
      }).join(", ");
      const dots = ".".repeat(Math.max(2, colW - label.length));
      lines.push(`${label}${dots} ${scores}`);
    });
    // Total row
    const totalLabel = "Total";
    const totals = table.entries.map(e => String(e.total)).join(", ");
    const totalDots = ".".repeat(Math.max(2, colW - totalLabel.length));
    lines.push(`${totalLabel}${totalDots} ${totals}`);
    return lines.join("\n");
  };

  const writeClipboard = (text, setter) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => { setter(true); setTimeout(() => setter(false), 2000); })
        .catch(() => fallbackCopy(text, setter));
    } else {
      fallbackCopy(text, setter);
    }
  };

  const fallbackCopy = (text, setter) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { document.execCommand("copy"); setter(true); setTimeout(() => setter(false), 2000); } catch(e) {}
    document.body.removeChild(ta);
  };

  const copyToClipboard = () => {
    const benzoStr = benzo.given
      ? `${benzo.name === "Other" ? benzo.other : benzo.name} ${benzo.dose}${benzo.unit} ${benzo.route}${benzo.minutes ? ", " + benzo.minutes + " min prior to assessment" : ""}`
      : null;
    writeClipboard(buildScoreText(scores, assessmentTs, benzoStr), setCopied);
  };

  const TAB = { fontSize: 13, fontWeight: 600, padding: "8px 20px", borderRadius: "6px 6px 0 0", cursor: "pointer", border: "none", transition: "all 0.15s" };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0F1A", fontFamily: "'Inter', system-ui, sans-serif", color: "#E2E8F0" }}>
      {/* Header */}
      <div style={{ background: "#0D1424", borderBottom: "1px solid #1E293B", padding: "16px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <h1 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#F1F5F9", letterSpacing: "-0.01em" }}>
            Bush-Francis Catatonia Rating Scale
          </h1>
          <span style={{ fontSize: 12, color: "#475569" }}>
            Based on the work of Drs. Wortzel & Oldham —{" "}
            <a
              href="https://www.urmc.rochester.edu/psychiatry/divisions/collaborative-care-and-wellness/bush-francis-catatonia-rating-scale/bfcrs"
              target="_blank" rel="noopener noreferrer"
              style={{ color: "#38BDF8", textDecoration: "none" }}
            >
              University of Rochester Medical Center ↗
            </a>
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 16px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 2, borderBottom: "1px solid #1E293B", marginBottom: 24 }}>
          {["score", "tables"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              ...TAB,
              background: activeTab === tab ? "#1E293B" : "transparent",
              color: activeTab === tab ? "#F1F5F9" : "#64748B",
            }}>
              {tab === "score" ? "Score Assessment" : `Saved Tables (${tables.length})`}
            </button>
          ))}
        </div>

        {/* ── SCORE TAB ── */}
        {activeTab === "score" && (
          <div>
            {/* Date/time row */}
            <div style={{ background: "#0D1424", border: "1px solid #1E293B", borderRadius: 10, padding: "14px 20px", marginBottom: 12, display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500, flexShrink: 0 }}>Assessment date & time</span>
              <input
                type="datetime-local"
                value={assessmentTs}
                onChange={e => setAssessmentTs(e.target.value)}
                style={{
                  background: "#0F172A", border: "1px solid #334155", borderRadius: 6,
                  outline: "none", color: "#CBD5E1", fontSize: 13, cursor: "pointer",
                  colorScheme: "dark", flex: 1, padding: "5px 10px",
                }}
              />
              <span style={{ fontSize: 11, color: "#475569", flexShrink: 0 }}>← click calendar icon to edit</span>
            </div>

            {/* Benzo section */}
            <div style={{ background: "#0D1424", border: "1px solid #1E293B", borderRadius: 10, padding: "16px 20px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: benzo.given ? 16 : 0 }}>
                <span style={{ fontSize: 14, color: "#94A3B8", fontWeight: 500 }}>Benzodiazepine administered prior to assessment?</span>
                <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                  <input type="checkbox" checked={benzo.given} onChange={e => setBenzo(b => ({ ...b, given: e.target.checked }))}
                    style={{ accentColor: "#38BDF8", width: 16, height: 16 }} />
                  <span style={{ fontSize: 13, color: "#CBD5E1" }}>Yes</span>
                </label>
              </div>
              {benzo.given && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.1em" }}>Medication</label>
                    <select value={benzo.name} onChange={e => setBenzo(b => ({ ...b, name: e.target.value }))} style={selectStyle}>
                      {BENZO_OPTIONS.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  {benzo.name === "Other" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <label style={{ fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.1em" }}>Specify</label>
                      <input value={benzo.other} onChange={e => setBenzo(b => ({ ...b, other: e.target.value }))}
                        placeholder="Drug name" style={inputStyle} />
                    </div>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.1em" }}>Dose</label>
                    <div style={{ display: "flex", gap: 4 }}>
                      <input value={benzo.dose} onChange={e => setBenzo(b => ({ ...b, dose: e.target.value }))}
                        placeholder="e.g. 2" style={{ ...inputStyle, width: 70 }} />
                      <select value={benzo.unit} onChange={e => setBenzo(b => ({ ...b, unit: e.target.value }))} style={{ ...selectStyle, width: 60 }}>
                        <option>mg</option><option>mcg</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.1em" }}>Route</label>
                    <select value={benzo.route} onChange={e => setBenzo(b => ({ ...b, route: e.target.value }))} style={selectStyle}>
                      <option value="">Select…</option>
                      {ROUTE_OPTIONS.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <label style={{ fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.1em" }}>Min. before assessment</label>
                    <input value={benzo.minutes} onChange={e => setBenzo(b => ({ ...b, minutes: e.target.value }))}
                      placeholder="e.g. 30" style={{ ...inputStyle, width: 90 }} type="number" min={0} />
                  </div>
                </div>
              )}
            </div>

            {/* Score items */}
            <div style={{ background: "#0D1424", border: "1px solid #1E293B", borderRadius: 10, overflow: "hidden", marginBottom: 20 }}>
              {ITEMS.map(item => item.autonomic
                ? <AutonomicRow key={item.id} item={item} value={scores[item.id]} onChange={v => handleScore(item.id, v)} />
                : <ScoreRow key={item.id} item={item} value={scores[item.id]} onChange={v => handleScore(item.id, v)} />
              )}
            </div>

            {/* Sticky bottom bar */}
            <div style={{
              position: "sticky", bottom: 0, zIndex: 100,
              background: "#0A0F1A",
              borderTop: "1px solid #1E293B",
              padding: "12px 0 8px",
              marginTop: 8,
            }}>
              <div style={{
                background: "#0D1424", border: "1px solid #1E293B", borderRadius: 10,
                padding: "12px 20px",
                display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <div style={{ fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.1em" }}>Total Score</div>
                    <div style={{ fontSize: 22, fontWeight: 600, color: "#F1F5F9", letterSpacing: "-0.01em", lineHeight: 1 }}>
                      {total}
                    </div>
                  </div>
                  <div style={{ width: "1px", height: 32, background: "#1E293B" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <div style={{ fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.1em" }}>Items Scored</div>
                    <div style={{ fontSize: 22, fontWeight: 600, color: "#F1F5F9", letterSpacing: "-0.01em", lineHeight: 1 }}>
                      {answered} <span style={{ fontSize: 13, fontWeight: 400, color: "#475569" }}>/ 23</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button onClick={copyToClipboard} style={{
                    ...btnStyle, background: copied ? "#064E3B" : "#0F172A",
                    border: `1px solid ${copied ? "#10B981" : "#334155"}`,
                    color: copied ? "#10B981" : "#94A3B8",
                  }}>
                    {copied ? "✓ Copied" : "Copy to clipboard"}
                  </button>
                  <button onClick={() => setSaveModal(true)} style={{
                    ...btnStyle, background: "#0C4A6E", border: "1px solid #0EA5E9", color: "#38BDF8",
                  }}>
                    Save →
                  </button>
                  <button onClick={() => { setScores(initScores()); setBenzo({ given: false, name: "Lorazepam (Ativan)", other: "", dose: "", unit: "mg", route: "", minutes: "" }); setAssessmentTs(nowStr()); }}
                    style={{ ...btnStyle, background: "transparent", border: "1px solid #1E293B", color: "#475569" }}>
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TABLES TAB ── */}
        {activeTab === "tables" && (
          <div>
            {tables.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#475569" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>⊕</div>
                <div style={{ fontSize: 15 }}>No saved assessments yet.</div>
                <div style={{ fontSize: 13, marginTop: 6 }}>Score an assessment and click "Save assessment" to create a table.</div>
              </div>
            ) : (
              tables.map(table => (
                <div key={table.id} style={{ marginBottom: 32 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#F1F5F9" }}>{table.name}</h2>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => writeClipboard(buildTableText(table), (v) => setTableCopied(v ? table.id : null))} style={{
                        background: tableCopied === table.id ? "#064E3B" : "transparent",
                        border: `1px solid ${tableCopied === table.id ? "#10B981" : "#1E293B"}`,
                        borderRadius: 6,
                        color: tableCopied === table.id ? "#10B981" : "#64748B",
                        fontSize: 12, padding: "4px 10px", cursor: "pointer", transition: "all 0.15s",
                      }}>{tableCopied === table.id ? "✓ Copied" : "Copy table"}</button>
                      <button onClick={() => deleteTable(table.id)} style={{
                        background: "transparent", border: "1px solid #1E293B", borderRadius: 6,
                        color: "#64748B", fontSize: 12, padding: "4px 10px", cursor: "pointer",
                      }}>Delete table</button>
                    </div>
                  </div>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                      <thead>
                        <tr style={{ background: "#0D1424" }}>
                          <th style={th}>Item</th>
                          {table.entries.map((e, i) => {
                            const isEditing = editingEntry?.tableId === table.id && editingEntry?.entryIndex === i;
                            const tsVal = new Date(e.ts).toISOString().slice(0,16);
                            return (
                              <th key={i} style={{ ...th, minWidth: 160, verticalAlign: "top" }}>
                                {isEditing ? (
                                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                    <input
                                      type="datetime-local"
                                      defaultValue={tsVal}
                                      onChange={ev => updateEntry(table.id, i, { ts: new Date(ev.target.value).getTime() })}
                                      style={{ ...inputStyle, colorScheme: "dark", fontSize: 11, width: "100%" }}
                                    />
                                    <input
                                      type="text"
                                      defaultValue={e.benzo || ""}
                                      placeholder="Benzo (or leave blank)"
                                      onChange={ev => updateEntry(table.id, i, { benzo: ev.target.value || null })}
                                      style={{ ...inputStyle, fontSize: 11, width: "100%" }}
                                    />
                                    <button
                                      onClick={() => setEditingEntry(null)}
                                      style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, border: "1px solid #10B981", background: "#064E3B", color: "#10B981", cursor: "pointer" }}
                                    >Done</button>
                                  </div>
                                ) : (
                                  <div
                                    onClick={() => setEditingEntry({ tableId: table.id, entryIndex: i })}
                                    style={{ cursor: "pointer" }}
                                    title="Click to edit"
                                  >
                                    <div>{formatDateTime(e.ts)}</div>
                                    {e.benzo && <div style={{ fontSize: 10, color: "#38BDF8", fontWeight: 400, marginTop: 2 }}>🧪 {e.benzo}</div>}
                                    {!e.benzo && <div style={{ fontSize: 10, color: "#334155", marginTop: 2 }}>+ add benzodiazepine</div>}
                                  </div>
                                )}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {ITEMS.map((item, ri) => (
                          <tr key={item.id} style={{ background: ri % 2 === 0 ? "#0A0F1A" : "#0D1424" }}>
                            <td style={{ ...td, color: "#94A3B8" }}>
                              <span style={{ color: "#475569", marginRight: 6, fontSize: 11 }}>{item.id}.</span>
                              {item.name}
                            </td>
                            {table.entries.map((e, i) => {
                              const v = e.scores[item.id];
                              const display = item.autonomic
                                ? (v === 'none' ? "0" : Array.isArray(v) ? String(Math.min(v.length, 3)) : "—")
                                : v === null ? "—" : item.binary ? (v === 1 ? "3" : "0") : String(v);
                              const isHigh = display !== "—" && parseInt(display) >= 2;
                              return (
                                <td key={i} style={{ ...td, textAlign: "center", color: isHigh ? "#FCA5A5" : "#CBD5E1", fontWeight: isHigh ? 600 : 400 }}>
                                  {display}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                        <tr style={{ background: "#0C1829", borderTop: "2px solid #1E293B" }}>
                          <td style={{ ...td, fontWeight: 700, color: "#F1F5F9" }}>Total</td>
                          {table.entries.map((e, i) => (
                            <td key={i} style={{ ...td, textAlign: "center", fontWeight: 700, fontSize: 15, color: "#38BDF8" }}>
                              {e.total}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Save modal */}
      {saveModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
        }} onClick={() => setSaveModal(false)}>
          <div style={{
            background: "#0D1424", border: "1px solid #1E293B", borderRadius: 12,
            padding: 28, width: "100%", maxWidth: 440,
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{ margin: "0 0 20px 0", fontSize: 17, fontWeight: 600, color: "#F1F5F9" }}>
              Save Assessment
            </h2>

            {tables.length > 0 && (
              <>
                <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 8px 0" }}>Add to existing table:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
                  {tables.map(t => (
                    <button key={t.id} onClick={() => saveToTable(t.id)} style={{
                      background: "#0F172A", border: "1px solid #1E293B", borderRadius: 8,
                      padding: "10px 14px", color: "#CBD5E1", fontSize: 13, cursor: "pointer",
                      textAlign: "left", display: "flex", justifyContent: "space-between",
                    }}>
                      <span>{t.name}</span>
                      <span style={{ color: "#475569" }}>{t.entries.length} entr{t.entries.length === 1 ? "y" : "ies"}</span>
                    </button>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid #1E293B", paddingTop: 20, marginBottom: 12 }}>
                  <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 8px 0" }}>Or create a new table:</p>
                </div>
              </>
            )}

            {tables.length === 0 && (
              <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 10px 0" }}>Create a new table for this patient:</p>
            )}

            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={newTableName}
                onChange={e => setNewTableName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && createAndSave()}
                placeholder="Table name (e.g. Patient A)"
                style={{ ...inputStyle, flex: 1 }}
                autoFocus
              />
              <button onClick={createAndSave} style={{
                ...btnStyle, background: "#0C4A6E", border: "1px solid #0EA5E9", color: "#38BDF8",
              }}>
                Create
              </button>
            </div>
            <button onClick={() => setSaveModal(false)} style={{
              marginTop: 12, background: "transparent", border: "none", color: "#475569",
              fontSize: 13, cursor: "pointer", padding: 0,
            }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const selectStyle = {
  background: "#0F172A", border: "1px solid #1E293B", borderRadius: 6,
  color: "#CBD5E1", fontSize: 13, padding: "6px 10px", outline: "none", cursor: "pointer",
};
const inputStyle = {
  background: "#0F172A", border: "1px solid #1E293B", borderRadius: 6,
  color: "#CBD5E1", fontSize: 13, padding: "6px 10px", outline: "none",
};
const btnStyle = {
  padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 500,
  cursor: "pointer", transition: "all 0.15s",
};
const th = {
  padding: "10px 12px", textAlign: "left", fontSize: 12,
  color: "#64748B", fontWeight: 600, borderBottom: "1px solid #1E293B",
  letterSpacing: "0.05em",
};
const td = {
  padding: "8px 12px", fontSize: 13, color: "#CBD5E1",
  borderBottom: "1px solid #0F172A",
};
