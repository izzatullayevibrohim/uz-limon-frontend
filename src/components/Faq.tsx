import { useState } from "react";
import { useLang, t } from "../context/LangContext";
import type { Lang, LocalizedText } from "../context/LangContext";
import { FAQS } from "../data/content";

interface FaqItem {
  q: LocalizedText;
  a: LocalizedText;
}

export default function Faq() {
  const { lang } = useLang();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const labels: Record<Lang, { tag: string; title: string }> = {
    ru: { tag: "Часто задаваемые вопросы", title: "Ответы на ваши вопросы" },
    uz: { tag: "Ko'p so'raladigan savollar", title: "Savollaringizga javoblar" },
    en: { tag: "Frequently Asked Questions", title: "Answers to Your Questions" },
  };
  const l = labels[lang];

  return (
    <section id="faq" style={{ padding: "64px 24px", background: "#F5EDD6" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B6208", fontWeight: 700, marginBottom: 8 }}>{l.tag}</div>
        <div style={{ width: 56, height: 4, background: "#C8900A", borderRadius: 2, marginBottom: 16 }} />
        <h2 style={{ fontFamily: "'Merriweather',serif", fontSize: "clamp(1.5rem,4vw,2rem)", fontWeight: 700, color: "#1B5E20", marginBottom: 40 }}>{l.title}</h2>

        <div style={{ maxWidth: 800, display: "flex", flexDirection: "column", gap: 12 }}>
          {(FAQS as FaqItem[]).map((faq, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #DDD0B8", borderRadius: 12, overflow: "hidden" }}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{
                  width: "100%", textAlign: "left", background: "none", border: "none",
                  padding: "20px 24px", fontSize: "1rem", fontWeight: 600, color: "#1E1A14",
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
                  cursor: "pointer",
                }}
              >
                <span>{t(faq.q, lang)}</span>
                <span style={{ fontSize: "1.2rem", color: "#C8900A", transition: "transform 0.22s", transform: openIdx === i ? "rotate(180deg)" : "none" }}>▾</span>
              </button>
              {openIdx === i && (
                <div style={{ padding: "0 24px 20px", fontSize: "0.95rem", color: "#4A4438", lineHeight: 1.7 }}>
                  {t(faq.a, lang)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}