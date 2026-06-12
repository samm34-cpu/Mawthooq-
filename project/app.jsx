/* ====== Mawthooq — main app ====== */
const { useState: uS, useEffect: uE, useRef: uR, useMemo: uM } = React;

/* ---------- typewriter placeholder ---------- */
const TYPE_PHRASES = [
  "ابحث عن متجر إلكتروني موثوق",
  "تجربتي مع شركة الاتصالات",
  "أفضل بنك رقمي في ٢٠٢٦",
  "مراجعات عبدالصمد القرشي",
  "هل نمشي موثوق؟",
];
function useTypewriter(active) {
  const [txt, setTxt] = uS("");
  const st = uR({ p: 0, c: 0, del: false, to: null });
  uE(() => {
    if (!active) { setTxt(""); return; }
    let alive = true;
    const tick = () => {
      if (!alive) return;
      const s = st.current;
      const phrase = TYPE_PHRASES[s.p];
      if (!s.del) {
        s.c++;
        setTxt(phrase.slice(0, s.c));
        if (s.c >= phrase.length) { s.del = true; s.to = setTimeout(tick, 1500); return; }
        s.to = setTimeout(tick, 55 + Math.random() * 45);
      } else {
        s.c--;
        setTxt(phrase.slice(0, s.c));
        if (s.c <= 0) { s.del = false; s.p = (s.p + 1) % TYPE_PHRASES.length; s.to = setTimeout(tick, 220); return; }
        s.to = setTimeout(tick, 28);
      }
    };
    st.current.to = setTimeout(tick, 600);
    return () => { alive = false; clearTimeout(st.current.to); };
  }, [active]);
  return txt;
}

/* ---------- navbar ---------- */
function Navbar({ dir, onToggleDir }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, padding: "12px 0" }}>
      <div className="glass" style={{
        maxWidth: 1280, margin: "0 16px", borderRadius: 18, padding: "10px 16px",
        display: "flex", alignItems: "center", gap: 16,
      }}>
        {/* logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 9, flex: "0 0 auto" }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--accent-grad)", display: "grid", placeItems: "center", boxShadow: "var(--shadow-float)" }}>
            <Icon name="ShieldCheck" size={19} color="#fff" />
          </div>
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: "var(--ink)", letterSpacing: "-0.01em" }}>موثوق</div>
            <div className="en" style={{ fontSize: 9.5, color: "var(--muted)", letterSpacing: "0.14em", marginTop: 1 }}>MAWTHOOQ</div>
          </div>
        </div>

        {/* compact search */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.7)", border: "1px solid var(--line)", borderRadius: 999, padding: "8px 14px", width: "min(380px, 100%)", color: "var(--muted)", fontSize: 13.5 }}>
            <Icon name="Search" size={16} color="var(--muted)" />
            <span style={{ whiteSpace: "nowrap" }}>ابحث عن علامة تجارية…</span>
          </div>
        </div>

        {/* actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "0 0 auto" }}>
          <button onClick={onToggleDir} className="focusable" title="تبديل الاتجاه" style={{ display: "inline-flex", alignItems: "center", gap: 5, height: 36, padding: "0 11px", borderRadius: 999, background: "rgba(13,27,75,0.05)", color: "var(--ink)", fontWeight: 600, fontSize: 12.5 }}>
            <Icon name="Languages" size={15} color="var(--ink)" /> {dir === "rtl" ? "AR" : "EN"}
          </button>
          <button className="focusable" style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 36, padding: "0 14px", borderRadius: 999, background: "var(--accent-grad)", color: "#fff", fontWeight: 600, fontSize: 13, whiteSpace: "nowrap", boxShadow: "var(--shadow-float)" }}>
            <Icon name="PenLine" size={14} color="#fff" /> اكتب مراجعة
          </button>
          <div style={{ width: 36, height: 36, borderRadius: 999, background: "#3D82DE", color: "#fff", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 14 }}>أ</div>
        </div>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */
function Hero({ query, setQuery }) {
  const typing = useTypewriter(query === "");
  const inputRef = uR(null);
  const quick = ["نون", "الراجحي", "نمشي", "STC", "القرشي"];
  return (
    <section style={{ maxWidth: 760, margin: "0 auto", padding: "44px 20px 12px", textAlign: "center" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(30,158,106,0.10)", color: "var(--trust)", fontSize: 12.5, fontWeight: 600, padding: "6px 13px", borderRadius: 999, marginBottom: 18 }}>
        <Icon name="ShieldCheck" size={14} color="var(--trust)" />
        مراجعات موثّقة لأكثر من <span className="num" style={{ margin: "0 3px" }}>١٢٠٠</span> علامة تجارية عربية
      </div>
      <h1 style={{ margin: "0 auto 12px", fontSize: 40, fontWeight: 700, lineHeight: 1.18, color: "var(--ink)", letterSpacing: "-0.02em", maxWidth: 560, textWrap: "balance" }}>
        اعرف رأي الناس قبل ما تشتري
      </h1>
      <p style={{ margin: "0 auto 26px", fontSize: 16, lineHeight: 1.6, color: "var(--muted)", maxWidth: 460 }}>
        تجارب حقيقية بالصور والفيديو من عملاء موثّقين — اكتشف العلامات التجارية الجديرة بالثقة.
      </p>

      {/* search */}
      <div style={{
        maxWidth: 600, margin: "0 auto", padding: 5, borderRadius: 22,
        border: "0.5px solid rgba(0,0,0,0.05)", background: "rgba(157,196,250,0.18)",
        backdropFilter: "blur(40px)", boxShadow: "var(--shadow-card)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", borderRadius: 18, padding: "6px 8px 6px 16px", border: "1px solid var(--line)" }}>
          <Icon name="Search" size={20} color="var(--accent)" />
          <div style={{ flex: 1, position: "relative", textAlign: "start" }}>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontFamily: "var(--font-ar)", fontSize: 15.5, color: "var(--ink-2)", padding: "12px 0" }}
            />
            {query === "" && (
              <div style={{ position: "absolute", insetInlineStart: 0, top: 0, height: "100%", display: "flex", alignItems: "center", pointerEvents: "none", color: "var(--muted)", fontSize: 15.5 }}>
                <span>{typing}</span>
                <span style={{ display: "inline-block", width: 2, height: 18, background: "var(--ink-2)", marginInlineStart: 2, animation: "mw-caret 1s steps(1) infinite" }} />
              </div>
            )}
          </div>
          <button className="focusable" style={{ height: 44, padding: "0 20px", borderRadius: 14, background: "var(--accent-grad)", color: "#fff", fontWeight: 600, fontSize: 14.5, boxShadow: "var(--shadow-float)" }}>بحث</button>
        </div>
      </div>

      {/* quick chips */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 14 }}>
        <span style={{ fontSize: 12.5, color: "var(--muted-2)", alignSelf: "center" }}>الأكثر بحثًا:</span>
        {quick.map(q => (
          <button key={q} onClick={() => setQuery(q)} className="focusable" style={{ fontSize: 12.5, fontWeight: 600, color: "var(--accent)", background: "rgba(61,130,222,0.07)", padding: "5px 11px", borderRadius: 999 }}>{q}</button>
        ))}
      </div>
    </section>
  );
}

/* ---------- category bar ---------- */
function CategoryBar({ cat, setCat }) {
  return (
    <div style={{ maxWidth: 1280, margin: "26px auto 0", padding: "0 20px" }}>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, scrollbarWidth: "thin" }}>
        {CATEGORIES.map(c => {
          const on = cat === c.id;
          return (
            <button key={c.id} onClick={() => setCat(c.id)} className="focusable" style={{
              display: "inline-flex", alignItems: "center", gap: 7, flex: "0 0 auto",
              height: 42, padding: "0 16px", borderRadius: 13,
              background: on ? "var(--accent-grad)" : "rgba(255,255,255,0.7)",
              color: on ? "#fff" : "var(--ink)",
              border: on ? "none" : "1px solid var(--line)",
              fontWeight: 600, fontSize: 13.5, whiteSpace: "nowrap",
              boxShadow: on ? "var(--shadow-float)" : "none", transition: "all 0.2s",
            }}>
              <Icon name={c.icon} size={16} color={on ? "#fff" : "var(--accent)"} />
              {c.ar}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- sort + result bar ---------- */
const SORTS = [
  { id: "rated", ar: "الأعلى تقييمًا" },
  { id: "reviews", ar: "الأكثر مراجعةً" },
  { id: "new", ar: "الأحدث" },
];
function ResultBar({ count, sort, setSort }) {
  return (
    <div style={{ maxWidth: 1280, margin: "8px auto 0", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
      <div style={{ fontSize: 14, color: "var(--muted)" }}>
        <span style={{ color: "var(--ink)", fontWeight: 700 }} className="num">{count}</span> نتيجة في خلاصتك
      </div>
      <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,0.6)", padding: 4, borderRadius: 12, border: "1px solid var(--line)" }}>
        {SORTS.map(s => (
          <button key={s.id} onClick={() => setSort(s.id)} style={{
            height: 30, padding: "0 12px", borderRadius: 9, fontSize: 12.5, fontWeight: 600,
            background: sort === s.id ? "#fff" : "transparent",
            color: sort === s.id ? "var(--ink)" : "var(--muted)",
            boxShadow: sort === s.id ? "0 2px 8px -3px rgba(17,49,93,0.2)" : "none",
          }}>{s.ar}</button>
        ))}
      </div>
    </div>
  );
}

/* ---------- feed (3 layout directions) ---------- */
function renderCard(it, i, onOpen, density) {
  if (it.kind === "brand") return <BrandCard key={i} brand={BR[it.brand]} onOpen={onOpen} density={density} />;
  if (it.kind === "media") return <MediaCard key={i} item={it} onOpen={onOpen} density={density} />;
  return <ReviewCard key={i} item={it} onOpen={onOpen} density={density} />;
}

function Feed({ items, layout, onOpen, density, gap }) {
  if (layout === "grid") {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap, alignItems: "start" }}>
        {items.map((it, i) => renderCard(it, i, onOpen, density))}
      </div>
    );
  }
  if (layout === "editorial") {
    const brands = items.filter(i => i.kind === "brand");
    const rest = items.filter(i => i.kind !== "brand");
    const feature = brands[0];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap }}>
        {/* featured row */}
        {feature && (
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)", gap }}>
            <FeatureBrand brand={BR[feature.brand]} onOpen={onOpen} />
            <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap }}>
              {rest.filter(r => r.kind === "media").slice(0, 2).map((it, i) => renderCard(it, "f" + i, onOpen, density))}
            </div>
          </div>
        )}
        {/* the rest as columns */}
        <div style={{ columnWidth: 280, columnGap: gap }} className="masonry">
          {items.filter(i => i !== feature).map((it, i) => renderCard(it, i, onOpen, density))}
        </div>
      </div>
    );
  }
  // masonry (default) — Pinterest columns
  return (
    <div style={{ columnWidth: 272, columnGap: gap }} className="masonry">
      {items.map((it, i) => renderCard(it, i, onOpen, density))}
    </div>
  );
}

function FeatureBrand({ brand, onOpen }) {
  return (
    <Hoverable onClick={() => onOpen({ type: "brand", brand })} style={{ padding: 0, display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", padding: "26px 26px 0", background: `linear-gradient(135deg, color-mix(in oklab, ${brand.color} 16%, #fff) 0%, #fff 70%)` }}>
        <span style={{ position: "absolute", top: 18, insetInlineEnd: 18, fontSize: 11, fontWeight: 700, color: "var(--accent)", background: "rgba(61,130,222,0.1)", padding: "4px 10px", borderRadius: 999 }}>الأكثر ثقة هذا الأسبوع</span>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Monogram brand={brand} size={60} radius={16} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ fontWeight: 700, fontSize: 22, color: "var(--ink)" }}>{brand.ar}</span>
              {brand.verified && <Icon name="BadgeCheck" size={17} color="var(--accent)" />}
            </div>
            <div className="en" style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{brand.en}</div>
          </div>
        </div>
        <p style={{ fontSize: 14.5, color: "var(--muted)", margin: "16px 0 18px" }}>{brand.tag}</p>
      </div>
      <div style={{ padding: "0 26px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span className="num" style={{ fontSize: 40, fontWeight: 700, color: scoreHue(brand.score), lineHeight: 1 }}>{brand.score.toFixed(1)}</span>
          <div>
            <Stars value={brand.score} size={16} />
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}><span className="num">{fmt(brand.reviews)}</span> مراجعة</div>
          </div>
        </div>
        <div style={{ minWidth: 200, flex: 1, maxWidth: 280 }}><Distribution dist={brand.dist} compact /></div>
      </div>
    </Hoverable>
  );
}

/* ---------- footer ---------- */
function Footer() {
  return (
    <footer style={{ maxWidth: 1280, margin: "8px auto 0", padding: "40px 20px 48px", textAlign: "center" }}>
      <div style={{ fontSize: 13, color: "rgba(13,27,75,0.5)", lineHeight: 1.8 }}>
        موثوق منصة مستقلة لمراجعات العلامات التجارية العربية — كل مراجعة تمر بالتحقق قبل النشر.
        <br />
        بإرسالك مراجعة فإنك توافق على <a style={{ color: "rgba(13,27,75,0.7)", textDecoration: "underline", textUnderlineOffset: 2 }}>الشروط</a> وتقر بأنك قرأت <a style={{ color: "rgba(13,27,75,0.7)", textDecoration: "underline", textUnderlineOffset: 2 }}>سياسة الخصوصية</a>.
      </div>
    </footer>
  );
}

Object.assign(window, { Navbar, Hero, CategoryBar, ResultBar, Feed, Footer, SORTS });
