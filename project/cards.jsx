/* ====== Mawthooq — feed cards ====== */
const { useState: useStateC } = React;

function Hoverable({ children, style, onClick, lift = true }) {
  const [h, setH] = useStateC(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: "var(--card)", borderRadius: "var(--radius-md)",
        border: "1px solid rgba(255,255,255,0.7)",
        boxShadow: h ? "var(--shadow-lift)" : "var(--shadow-card)",
        transform: lift ? (h ? "translateY(-4px)" : "translateY(0)") : "none",
        transition: "transform 0.32s cubic-bezier(0.22,1,0.36,1), box-shadow 0.32s ease",
        cursor: "pointer", overflow: "hidden", ...style,
      }}>
      {children}
    </div>
  );
}

function CatChip({ cat }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, color: "var(--accent)",
      background: "rgba(61,130,222,0.08)", padding: "3px 9px", borderRadius: 999, whiteSpace: "nowrap",
    }}>{CAT_AR[cat]}</span>
  );
}

function BrandChip({ brand, small }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 7, minWidth: 0 }}>
      <Monogram brand={brand} size={small ? 22 : 28} radius={7} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: small ? 12.5 : 14, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{brand.ar}</div>
      </div>
    </div>
  );
}

function Helpful({ n }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--muted)", fontSize: 12 }}>
      <Icon name="ThumbsUp" size={13} color="var(--muted)" />
      <span className="num">{fmt(n)}</span> مفيد
    </span>
  );
}

/* ---- Brand summary card ---- */
function BrandCard({ brand, onOpen, density }) {
  const pad = density === "compact" ? 14 : 18;
  return (
    <Hoverable onClick={() => onOpen({ type: "brand", brand })} style={{ padding: pad }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <Monogram brand={brand} size={48} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontWeight: 700, fontSize: 16.5, color: "var(--ink)" }}>{brand.ar}</span>
            {brand.verified && <Icon name="BadgeCheck" size={15} color="var(--accent)" />}
          </div>
          <div className="en" style={{ fontSize: 12, color: "var(--muted)", marginTop: 1 }}>{brand.en}</div>
        </div>
        <CatChip cat={brand.cat} />
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "13px 0 11px" }}>
        <TrustScore score={brand.score} />
        <span style={{ fontSize: 12, color: "var(--muted)" }}>
          <span className="num">{fmt(brand.reviews)}</span> مراجعة
        </span>
      </div>

      <Distribution dist={brand.dist} compact={density === "compact"} />

      <div style={{ marginTop: 13, paddingTop: 12, borderTop: "1px solid var(--line-soft)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12.5, color: "var(--muted)" }}>{brand.tag}</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 3, color: "var(--accent)", fontWeight: 600, fontSize: 12.5 }}>
          عرض الصفحة <Icon name="ArrowLeft" size={14} color="var(--accent)" />
        </span>
      </div>
    </Hoverable>
  );
}

/* ---- Text review card ---- */
function ReviewCard({ item, onOpen, density }) {
  const brand = BR[item.brand];
  const rev = REVIEWERS[item.rev];
  const pad = density === "compact" ? 14 : 18;
  return (
    <Hoverable onClick={() => onOpen({ type: "review", item, brand, rev })} style={{ padding: pad }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <BrandChip brand={brand} />
        <Stars value={item.rating} size={15} />
      </div>
      <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.75, color: "var(--ink-2)", textWrap: "pretty" }}>
        {item.text}
      </p>
      <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--line-soft)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          <Avatar rev={rev} size={26} />
          <span style={{ fontSize: 12.5, color: "var(--muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{rev.n}</span>
        </div>
        {item.verified && <Verified compact />}
      </div>
      <div style={{ marginTop: 10 }}><Helpful n={item.helpful} /></div>
    </Hoverable>
  );
}

/* ---- Media (photo/video) review card ---- */
function MediaCard({ item, onOpen, density }) {
  const brand = BR[item.brand];
  const rev = REVIEWERS[item.rev];
  return (
    <Hoverable onClick={() => onOpen({ type: "media", item, brand, rev })} style={{ padding: 0 }}>
      <div style={{ position: "relative", padding: 6 }}>
        <MediaSlot hue={item.hue} ratio={item.ratio} label={item.label} video={item.video} radius={13} />
        <div style={{ position: "absolute", top: 12, insetInlineEnd: 12, display: "flex", gap: 6 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)", padding: "4px 8px", borderRadius: 999, fontSize: 12, fontWeight: 700, color: "var(--ink)", boxShadow: "0 4px 12px -4px rgba(0,0,0,0.25)" }}>
            <Icon name="Star" size={12} color="var(--star)" style={{ fill: "var(--star)" }} stroke={0} />
            <span className="num">{item.rating}.0</span>
          </span>
        </div>
      </div>
      <div style={{ padding: density === "compact" ? "2px 14px 14px" : "4px 16px 16px" }}>
        <p style={{ margin: "2px 0 12px", fontSize: 14, lineHeight: 1.7, color: "var(--ink-2)", textWrap: "pretty" }}>{item.text}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <BrandChip brand={brand} small />
          {item.helpful != null && <Helpful n={item.helpful} />}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 11 }}>
          <Avatar rev={rev} size={22} />
          <span style={{ fontSize: 12, color: "var(--muted)" }}>{rev.n}</span>
          {item.rating >= 4 && <span style={{ marginInlineStart: "auto" }}><Verified compact /></span>}
        </div>
      </div>
    </Hoverable>
  );
}

Object.assign(window, { Hoverable, CatChip, BrandChip, Helpful, BrandCard, ReviewCard, MediaCard });
