import { useLang } from "../context/LangContext";
import type {Lang} from "../context/LangContext"
import { REVIEWS } from "../data/content";

type AvaColorKey = "ava-g" | "ava-b" | "ava-o";

interface AvaStyle {
  bg: string;
  color: string;
}

interface Review {
  ru: string;
  uz: string;
  en: string;
  color: AvaColorKey;
  initials: string;
  name: string;
  loc: string;
}

const avaColors: Record<AvaColorKey, AvaStyle> = {
  "ava-g": { bg: "#E8F5E9", color: "#1B5E20" },
  "ava-b": { bg: "#E3F2FD", color: "#1565C0" },
  "ava-o": { bg: "#FFF3E0", color: "#E65100" },
};

export default function Reviews() {
  const { lang } = useLang();
  const labels: Record<Lang, { tag: string; title: string }> = {
    ru: { tag: "Отзывы членов", title: "Что говорят наши члены" },
    uz: { tag: "A'zolar fikrlari", title: "A'zolarimiz nima deydi" },
    en: { tag: "Member Reviews", title: "What Our Members Say" },
  };
  const l = labels[lang];

  return (
    <section id="reviews" style={{ padding: "64px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B6208", fontWeight: 700, marginBottom: 8 }}>{l.tag}</div>
        <div style={{ width: 56, height: 4, background: "#C8900A", borderRadius: 2, marginBottom: 16 }} />
        <h2 style={{ fontFamily: "'Merriweather',serif", fontSize: "clamp(1.5rem,4vw,2rem)", fontWeight: 700, color: "#1B5E20", marginBottom: 40 }}>{l.title}</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {(REVIEWS as Review[]).map((r, i) => {
            const ava = avaColors[r.color];
            return (
              <div key={i} style={{ background: "#fff", border: "1px solid #DDD0B8", borderRadius: 12, padding: 24 }}>
                <div style={{ color: "#C8900A", fontSize: "1.1rem", marginBottom: 12, letterSpacing: 2 }}>★★★★★</div>
                <p style={{ fontSize: "0.95rem", color: "#4A4438", fontStyle: "italic", lineHeight: 1.65, marginBottom: 16 }}>{r[lang]}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: ava.bg, color: ava.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: 700 }}>
                    {r.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{r.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "#8A7E6E" }}>{r.loc}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}