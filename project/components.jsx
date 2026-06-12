/* ====== Mawthooq — shared primitives ====== */
const { useState, useEffect, useRef, useMemo } = React;

/* ---- Icon: self-contained inline UI glyphs (Lucide-style stroke paths) ---- */
const ICONS = {
  Search: [["circle", { cx: 11, cy: 11, r: 8 }], ["path", { d: "m21 21-4.3-4.3" }]],
  SearchX: [["path", { d: "m13.5 8.5-5 5" }], ["path", { d: "m8.5 8.5 5 5" }], ["circle", { cx: 11, cy: 11, r: 8 }], ["path", { d: "m21 21-4.3-4.3" }]],
  ShieldCheck: [["path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" }], ["path", { d: "m9 12 2 2 4-4" }]],
  ShoppingBag: [["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" }], ["path", { d: "M3 6h18" }], ["path", { d: "M16 10a4 4 0 0 1-8 0" }]],
  Landmark: [["line", { x1: 3, x2: 21, y1: 22, y2: 22 }], ["line", { x1: 6, x2: 6, y1: 18, y2: 11 }], ["line", { x1: 10, x2: 10, y1: 18, y2: 11 }], ["line", { x1: 14, x2: 14, y1: 18, y2: 11 }], ["line", { x1: 18, x2: 18, y1: 18, y2: 11 }], ["polygon", { points: "12 2 20 7 4 7" }]],
  RadioTower: [["path", { d: "M4.9 16.1C1 12.2 1 5.8 4.9 1.9" }], ["path", { d: "M7.8 4.7a6.14 6.14 0 0 0-.8 7.5" }], ["circle", { cx: 12, cy: 9, r: 2 }], ["path", { d: "M16.2 4.8c2 2 2.26 5.11.8 7.47" }], ["path", { d: "M19.1 1.9a9.96 9.96 0 0 1 0 14.1" }], ["path", { d: "M9.5 18h5" }], ["path", { d: "m8 22 4-11 4 11" }]],
  Sparkles: [["path", { d: "M9.94 14.06A2 2 0 0 0 8.5 12.6l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 8.5A2 2 0 0 0 9.94 7.06l1.58-6.14a.5.5 0 0 1 .96 0L14.06 7.06A2 2 0 0 0 15.5 8.5l6.14 1.58a.5.5 0 0 1 0 .96L15.5 12.6a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z" }], ["path", { d: "M20 3v4" }], ["path", { d: "M22 5h-4" }]],
  Smartphone: [["rect", { width: 14, height: 20, x: 5, y: 2, rx: 2, ry: 2 }], ["path", { d: "M12 18h.01" }]],
  LayoutGrid: [["rect", { width: 7, height: 7, x: 3, y: 3, rx: 1 }], ["rect", { width: 7, height: 7, x: 14, y: 3, rx: 1 }], ["rect", { width: 7, height: 7, x: 14, y: 14, rx: 1 }], ["rect", { width: 7, height: 7, x: 3, y: 14, rx: 1 }]],
  Star: [["polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" }]],
  BadgeCheck: [["path", { d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" }], ["path", { d: "m9 12 2 2 4-4" }]],
  ThumbsUp: [["path", { d: "M7 10v12" }], ["path", { d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" }]],
  ArrowLeft: [["path", { d: "m12 19-7-7 7-7" }], ["path", { d: "M19 12H5" }]],
  Play: [["polygon", { points: "6 3 20 12 6 21 6 3" }]],
  X: [["path", { d: "M18 6 6 18" }], ["path", { d: "m6 6 12 12" }]],
  Share2: [["circle", { cx: 18, cy: 5, r: 3 }], ["circle", { cx: 6, cy: 12, r: 3 }], ["circle", { cx: 18, cy: 19, r: 3 }], ["line", { x1: 8.59, x2: 15.42, y1: 13.51, y2: 17.49 }], ["line", { x1: 15.41, x2: 8.59, y1: 6.51, y2: 10.49 }]],
  Flag: [["path", { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" }], ["line", { x1: 4, x2: 4, y1: 22, y2: 15 }]],
  PenLine: [["path", { d: "M12 20h9" }], ["path", { d: "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" }]],
  Languages: [["path", { d: "m5 8 6 6" }], ["path", { d: "m4 14 6-6 2-3" }], ["path", { d: "M2 5h12" }], ["path", { d: "M7 2h1" }], ["path", { d: "m22 22-5-10-5 10" }], ["path", { d: "M14 18h6" }]],
};

function Icon({ name, size = 18, stroke = 2, color = "currentColor", style, className }) {
  const node = ICONS[name] || ICONS.Search;
  const filled = stroke === 0;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill={filled ? color : "none"} stroke={filled ? "none" : color}
      strokeWidth={filled ? 0 : stroke} strokeLinecap="round" strokeLinejoin="round"
      className={className} style={{ flex: "0 0 auto", display: "block", ...style }}>
      {node.map(([tag, attrs], i) => React.createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}

const fmt = (n) => n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "") + "K" : "" + n;
const scoreWord = (s) => s >= 4.5 ? "ممتاز" : s >= 4.0 ? "جيد جدًا" : s >= 3.0 ? "جيد" : s >= 2.0 ? "مقبول" : "ضعيف";
const scoreHue = (s) => s >= 4.5 ? "#1E9E6A" : s >= 4.0 ? "#2DA46F" : s >= 3.0 ? "#C79A2E" : s >= 2.0 ? "#D9822B" : "#D0473C";

/* ---- Stars (fractional) ---- */
function Stars({ value, size = 16, gap = 2 }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  const Star = ({ fill }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block" }}>
      <path d="M12 2.6l2.7 5.9 6.3.6-4.7 4.2 1.4 6.2L12 16.9 6.3 19.5l1.4-6.2L3 9.1l6.3-.6z"
        fill={fill} />
    </svg>
  );
  return (
    <div style={{ position: "relative", display: "inline-flex", lineHeight: 0 }} aria-label={`${value} من 5`}>
      <div style={{ display: "flex", gap }}>
        {[0, 1, 2, 3, 4].map(i => <Star key={i} fill="var(--star-empty)" />)}
      </div>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", width: `${pct}%`, display: "flex", gap, /* RTL: clip from start */ }}>
        <div style={{ display: "flex", gap }}>
          {[0, 1, 2, 3, 4].map(i => <Star key={i} fill="var(--star)" />)}
        </div>
      </div>
    </div>
  );
}

/* ---- TrustScore badge ---- */
function TrustScore({ score, size = "md" }) {
  const hue = scoreHue(score);
  const big = size === "lg";
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: big ? 10 : 7 }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        background: hue, color: "#fff", fontFamily: "var(--font-en)", fontWeight: 600,
        fontSize: big ? 22 : 13, lineHeight: 1, padding: big ? "9px 12px" : "5px 8px",
        borderRadius: big ? 12 : 8, boxShadow: `0 6px 16px -6px ${hue}aa`,
      }}>
        <Icon name="Star" size={big ? 18 : 12} color="#fff" stroke={0} style={{ fill: "#fff" }} />
        {score.toFixed(1)}
      </div>
      <span style={{ color: hue, fontWeight: 600, fontSize: big ? 16 : 12.5 }}>{scoreWord(score)}</span>
    </div>
  );
}

/* ---- Verified purchase badge ---- */
function Verified({ compact }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      color: "var(--trust)", background: "var(--trust-soft)",
      fontSize: compact ? 10.5 : 11.5, fontWeight: 600,
      padding: compact ? "2px 6px" : "3px 8px", borderRadius: 999, whiteSpace: "nowrap",
    }}>
      <Icon name="BadgeCheck" size={compact ? 12 : 13} color="var(--trust)" />
      عملية شراء موثّقة
    </span>
  );
}

/* ---- Distribution bars ---- */
function Distribution({ dist, animate = true, compact }) {
  const [w, setW] = useState(animate ? dist.map(() => 0) : dist);
  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setW(dist), 60);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: compact ? 4 : 6 }}>
      {dist.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="num" style={{ width: 26, textAlign: "left", fontSize: 11.5, color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 2, justifyContent: "flex-end" }}>
            {5 - i}<Icon name="Star" size={9} color="var(--star)" style={{ fill: "var(--star)" }} stroke={0} />
          </span>
          <div style={{ flex: 1, height: compact ? 6 : 7, background: "rgba(13,27,75,0.06)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${w[i]}%`,
              background: i === 0 ? "var(--trust)" : i < 2 ? "#5FB98C" : i < 3 ? "#C79A2E" : "#D9822B",
              borderRadius: 999, transition: "width 0.9s cubic-bezier(0.22,1,0.36,1)",
              transitionDelay: `${i * 70}ms`,
            }} />
          </div>
          <span className="num" style={{ width: 30, textAlign: "left", fontSize: 11, color: "var(--muted-2)" }}>{p}%</span>
        </div>
      ))}
    </div>
  );
}

/* ---- Brand monogram tile ---- */
function Monogram({ brand, size = 44, radius = 12 }) {
  return (
    <div className="en" style={{
      width: size, height: size, borderRadius: radius, flex: "0 0 auto",
      background: brand.color, color: brand.ink,
      display: "grid", placeItems: "center", fontWeight: 700,
      fontSize: size * 0.46, lineHeight: 1, letterSpacing: "-0.02em",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 4px 12px -4px rgba(17,49,93,0.35)",
      overflow: "hidden",
    }}>{brand.mono}</div>
  );
}

/* ---- Reviewer avatar ---- */
function Avatar({ rev, size = 32 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 999, flex: "0 0 auto",
      background: rev.c, color: "#fff", display: "grid", placeItems: "center",
      fontWeight: 700, fontSize: size * 0.42,
    }}>{rev.i}</div>
  );
}

/* ---- Honest media placeholder (duotone + shimmer + label) ---- */
function MediaSlot({ hue, ratio = 1, label, video, radius = 14 }) {
  return (
    <div style={{
      position: "relative", width: "100%", paddingTop: `${ratio * 100}%`, borderRadius: radius,
      overflow: "hidden",
      background: `linear-gradient(150deg, oklch(0.82 0.09 ${hue}) 0%, oklch(0.70 0.12 ${hue}) 100%)`,
    }}>
      {/* shimmer sheen */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
        backgroundSize: "200% 100%", animation: "mw-shimmer 3.5s linear infinite",
      }} />
      {/* diagonal stripes to read as placeholder */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.16,
        backgroundImage: "repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 11px)",
      }} />
      {/* play button for video */}
      {video && (
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          <div style={{ width: 46, height: 46, borderRadius: 999, background: "rgba(255,255,255,0.92)", display: "grid", placeItems: "center", boxShadow: "0 8px 24px -8px rgba(0,0,0,0.4)" }}>
            <Icon name="Play" size={20} color="#11315D" style={{ fill: "#11315D", marginInlineStart: 2 }} stroke={0} />
          </div>
        </div>
      )}
      {/* mono label */}
      <div className="en" style={{
        position: "absolute", insetInlineStart: 8, bottom: 8,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 10,
        color: "rgba(255,255,255,0.92)", background: "rgba(17,49,93,0.34)",
        padding: "2px 7px", borderRadius: 999, backdropFilter: "blur(4px)",
        letterSpacing: "0.02em",
      }}>{label}</div>
    </div>
  );
}

Object.assign(window, {
  Icon, Stars, TrustScore, Verified, Distribution, Monogram, Avatar, MediaSlot,
  fmt, scoreWord, scoreHue,
});
