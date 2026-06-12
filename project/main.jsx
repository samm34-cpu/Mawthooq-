/* ====== Mawthooq — root + tweaks ====== */
const { useState: uSm, useEffect: uEm, useMemo: uMm } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "layout": "masonry",
  "accent": ["#70A8F2", "#3D82DE"],
  "font": "IBM Plex Sans Arabic",
  "density": "comfortable",
  "dir": "rtl"
}/*EDITMODE-END*/;

const ACCENTS = [
  ["#70A8F2", "#3D82DE"], // blue (glass)
  ["#5FD0C0", "#1E9E8A"], // teal
  ["#9C8BF0", "#6C4DE0"], // violet
  ["#6FD18C", "#1E9E6A"], // green
];

function itemSortKey(it, sort) {
  const b = BR[it.brand];
  if (sort === "rated") return it.kind === "brand" ? b.score : it.rating;
  if (sort === "reviews") return it.kind === "brand" ? b.reviews / 1000 : (it.helpful || 0) / 20;
  return 0;
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [query, setQuery] = uSm("");
  const [cat, setCat] = uSm("all");
  const [sort, setSort] = uSm("rated");
  const [open, setOpen] = uSm(null);

  // apply tweaks → CSS vars + document attrs
  uEm(() => {
    const r = document.documentElement;
    const acc = t.accent || ACCENTS[0];
    r.style.setProperty("--accent-2", acc[0]);
    r.style.setProperty("--accent", acc[1]);
    r.style.setProperty("--font-ar", `"${t.font}", "Inter Tight", system-ui, sans-serif`);
    r.style.setProperty("--gap", t.density === "compact" ? "12px" : "18px");
    r.setAttribute("dir", t.dir);
    r.setAttribute("lang", t.dir === "rtl" ? "ar" : "en");
  }, [t.accent, t.font, t.density, t.dir]);

  const items = uMm(() => {
    let list = FEED.filter(it => {
      const b = BR[it.brand];
      if (cat !== "all" && b.cat !== cat) return false;
      if (query.trim()) {
        const q = query.trim();
        const hay = `${b.ar} ${b.en} ${it.text || ""}`;
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (sort !== "new") {
      list = [...list].sort((a, b) => itemSortKey(b, sort) - itemSortKey(a, sort));
    }
    return list;
  }, [cat, query, sort]);

  const gap = t.density === "compact" ? 12 : 18;

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 8 }}>
      <Navbar dir={t.dir} onToggleDir={() => setTweak("dir", t.dir === "rtl" ? "ltr" : "rtl")} />
      <Hero query={query} setQuery={setQuery} />
      <CategoryBar cat={cat} setCat={setCat} />
      <ResultBar count={items.length} sort={sort} setSort={setSort} />

      <main style={{ maxWidth: 1280, margin: "18px auto 0", padding: "0 20px" }}>
        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--muted)" }}>
            <Icon name="SearchX" size={40} color="var(--muted-2)" style={{ margin: "0 auto 14px" }} />
            <div style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>لا توجد نتائج مطابقة</div>
            <div style={{ fontSize: 13.5, marginTop: 6 }}>جرّب كلمة بحث أخرى أو غيّر التصنيف.</div>
          </div>
        ) : (
          <Feed items={items} layout={t.layout} onOpen={setOpen} density={t.density} gap={gap} />
        )}
      </main>

      <Footer />

      <Lightbox data={open} onClose={() => setOpen(null)} />

      {/* ---- Tweaks ---- */}
      <TweaksPanel>
        <TweakSection label="التخطيط · Layout" />
        <TweakRadio label="اتجاه العرض" value={t.layout}
          options={[{ value: "masonry", label: "ماسونري" }, { value: "grid", label: "شبكة" }, { value: "editorial", label: "تحريري" }]}
          onChange={(v) => setTweak("layout", v)} />
        <TweakRadio label="الكثافة" value={t.density}
          options={[{ value: "comfortable", label: "مريح" }, { value: "compact", label: "مدمج" }]}
          onChange={(v) => setTweak("density", v)} />
        <TweakRadio label="الاتجاه" value={t.dir}
          options={[{ value: "rtl", label: "RTL" }, { value: "ltr", label: "LTR" }]}
          onChange={(v) => setTweak("dir", v)} />

        <TweakSection label="الهوية · Brand" />
        <TweakColor label="اللون المميز" value={t.accent} options={ACCENTS}
          onChange={(v) => setTweak("accent", v)} />
        <TweakSelect label="الخط العربي" value={t.font}
          options={["IBM Plex Sans Arabic", "Tajawal", "Cairo", "Rubik"]}
          onChange={(v) => setTweak("font", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
