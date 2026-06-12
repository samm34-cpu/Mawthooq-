/* ====== Mawthooq — detail lightbox (brand sheet + review/media detail) ====== */
const { useEffect: useEffectL } = React;

function Backdrop({ onClose, children }) {
  useEffectL(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, []);
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 200, display: "grid", placeItems: "center",
      padding: "24px", background: "rgba(17,49,93,0.32)", backdropFilter: "blur(8px)",
      animation: "mw-fade 0.25s ease",
    }}>
      <style>{`@keyframes mw-fade{from{opacity:0}to{opacity:1}}@keyframes mw-pop{from{opacity:0;transform:translateY(14px) scale(0.985)}to{opacity:1;transform:none}}`}</style>
      <div onClick={(e) => e.stopPropagation()} style={{ animation: "mw-pop 0.4s cubic-bezier(0.16,1,0.3,1)", maxWidth: "min(960px, 96vw)", width: "100%", maxHeight: "90vh", display: "flex" }}>
        {children}
      </div>
    </div>
  );
}

function CloseBtn({ onClose, light }) {
  return (
    <button onClick={onClose} className="focusable" style={{
      position: "absolute", top: 14, insetInlineEnd: 14, zIndex: 5,
      width: 36, height: 36, borderRadius: 999, display: "grid", placeItems: "center",
      background: light ? "rgba(255,255,255,0.9)" : "rgba(13,27,75,0.06)",
      boxShadow: light ? "0 6px 18px -6px rgba(0,0,0,0.4)" : "none",
    }}>
      <Icon name="X" size={18} color={light ? "#11315D" : "var(--muted)"} />
    </button>
  );
}

/* ---- Review / media detail ---- */
function ReviewDetail({ data, onClose }) {
  const { item, brand, rev } = data;
  const hasMedia = data.type === "media";
  return (
    <Backdrop onClose={onClose}>
      <div className="glass" style={{
        position: "relative", borderRadius: 24, overflow: "hidden", width: "100%",
        display: "grid", gridTemplateColumns: hasMedia ? "minmax(0,1.05fr) minmax(320px, 0.95fr)" : "1fr",
        background: "var(--card)", maxHeight: "90vh",
      }}>
        {hasMedia && (
          <div style={{ position: "relative", background: "#0d1b4b", minHeight: 360, display: "grid", placeItems: "center", padding: 18 }}>
            <div style={{ width: "100%" }}>
              <MediaSlot hue={item.hue} ratio={Math.min(item.ratio, 1.2)} label={item.label} video={item.video} radius={16} />
            </div>
          </div>
        )}
        <div style={{ position: "relative", padding: "26px 26px 22px", overflowY: "auto" }}>
          <CloseBtn onClose={onClose} />
          <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 18 }}>
            <Monogram brand={brand} size={44} />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 16, color: "var(--ink)" }}>{brand.ar}</span>
                {brand.verified && <Icon name="BadgeCheck" size={14} color="var(--accent)" />}
              </div>
              <div className="en" style={{ fontSize: 12, color: "var(--muted)" }}>{brand.en}</div>
            </div>
            <span style={{ marginInlineStart: "auto" }}><CatChip cat={brand.cat} /></span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <Stars value={item.rating} size={20} />
            <span style={{ fontWeight: 700, color: scoreHue(item.rating), fontSize: 15 }}>{scoreWord(item.rating)}</span>
          </div>

          <p style={{ margin: "0 0 20px", fontSize: 16, lineHeight: 1.85, color: "var(--ink-2)", textWrap: "pretty" }}>{item.text}</p>

          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 16, borderTop: "1px solid var(--line-soft)" }}>
            <Avatar rev={rev} size={38} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>{rev.n}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>كتب <span className="num">12</span> مراجعة</div>
            </div>
            {(item.verified || item.rating >= 4) && <Verified />}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <button className="focusable" style={btnPrimary}>
              <Icon name="ThumbsUp" size={15} color="#fff" /> مفيد · <span className="num">{fmt(item.helpful)}</span>
            </button>
            <button className="focusable" style={btnGhost}>
              <Icon name="Share2" size={15} color="var(--ink)" /> مشاركة
            </button>
            <button className="focusable" style={btnGhost}>
              <Icon name="Flag" size={15} color="var(--ink)" />
            </button>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}

/* ---- Brand detail sheet ---- */
function BrandDetail({ data, onClose }) {
  const { brand } = data;
  const related = FEED.filter(f => f.brand === brand.id && f.kind !== "brand").slice(0, 3);
  return (
    <Backdrop onClose={onClose}>
      <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", width: "100%", background: "var(--card)", maxHeight: "90vh", display: "flex", flexDirection: "column", boxShadow: "var(--shadow-lift)" }}>
        <CloseBtn onClose={onClose} light />
        {/* header band */}
        <div style={{ position: "relative", padding: "28px 28px 22px", background: `linear-gradient(135deg, ${brand.color} 0%, color-mix(in oklab, ${brand.color} 70%, #11315D) 100%)`, color: brand.ink }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ background: "rgba(255,255,255,0.14)", padding: 6, borderRadius: 16, backdropFilter: "blur(4px)" }}>
              <Monogram brand={brand} size={56} radius={12} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>{brand.ar}</h2>
                {brand.verified && <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11.5, fontWeight: 600, background: "rgba(255,255,255,0.18)", padding: "3px 8px", borderRadius: 999 }}><Icon name="BadgeCheck" size={13} color="currentColor" /> موثّقة</span>}
              </div>
              <div className="en" style={{ fontSize: 13.5, opacity: 0.85, marginTop: 2 }}>{brand.en} · {brand.tag}</div>
            </div>
          </div>
        </div>

        <div style={{ padding: "22px 28px 26px", overflowY: "auto", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.1fr)", gap: 28 }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
              <span className="num" style={{ fontSize: 52, fontWeight: 700, color: scoreHue(brand.score), lineHeight: 1 }}>{brand.score.toFixed(1)}</span>
              <div>
                <Stars value={brand.score} size={18} />
                <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
                  <span className="num">{fmt(brand.reviews)}</span> مراجعة
                </div>
              </div>
            </div>
            <div style={{ fontWeight: 600, color: scoreHue(brand.score), fontSize: 15, marginBottom: 18 }}>{scoreWord(brand.score)}</div>
            <Distribution dist={brand.dist} />
            <button className="focusable" style={{ ...btnPrimary, width: "100%", justifyContent: "center", marginTop: 20 }}>
              <Icon name="PenLine" size={15} color="#fff" /> اكتب مراجعة
            </button>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 12 }}>أحدث المراجعات</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {related.map((f, i) => {
                const rev = REVIEWERS[f.rev];
                return (
                  <div key={i} style={{ background: "var(--bg)", borderRadius: 14, padding: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Avatar rev={rev} size={26} />
                        <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 600 }}>{rev.n}</span>
                      </div>
                      <Stars value={f.rating} size={13} />
                    </div>
                    <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.7, color: "var(--ink-2)" }}>{f.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}

const btnPrimary = {
  display: "inline-flex", alignItems: "center", gap: 7, height: 40, padding: "0 16px",
  borderRadius: 12, background: "var(--accent-grad)", color: "#fff", fontWeight: 600, fontSize: 13.5,
  fontFamily: "var(--font-ar)", boxShadow: "var(--shadow-float)",
};
const btnGhost = {
  display: "inline-flex", alignItems: "center", gap: 7, height: 40, padding: "0 14px",
  borderRadius: 12, background: "rgba(13,27,75,0.05)", color: "var(--ink)", fontWeight: 600, fontSize: 13.5,
  fontFamily: "var(--font-ar)",
};

function Lightbox({ data, onClose }) {
  if (!data) return null;
  return data.type === "brand"
    ? <BrandDetail data={data} onClose={onClose} />
    : <ReviewDetail data={data} onClose={onClose} />;
}

Object.assign(window, { Lightbox, btnPrimary, btnGhost });
