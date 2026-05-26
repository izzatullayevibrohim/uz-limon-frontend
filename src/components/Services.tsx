import type { MouseEvent } from "react";
import { useLang } from "../context/LangContext";
import type { Lang } from "../context/LangContext";
import { SERVICES } from "../data/content";

interface ServiceDetail {
  title: string;
  body: string;
  more: string;
}

interface Service {
  icon: string;
  ru: ServiceDetail;
  uz: ServiceDetail;
  en: ServiceDetail;
}

export default function Services() {
  const { lang } = useLang();
  const labels: Record<Lang, { tag: string; title: string }> = {
    ru: { tag: "Наши направления", title: "Чем мы помогаем" },
    uz: { tag: "Bizning yo'nalishlar", title: "Qanday yordam beramiz" },
    en: { tag: "Our Services", title: "How We Help" },
  };
  const l = labels[lang];

  return (
    <section id="services" style={{ padding: "64px 24px", background: "#F5EDD6" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B6208", fontWeight: 700, marginBottom: 8 }}>{l.tag}</div>
        <div style={{ width: 56, height: 4, background: "#C8900A", borderRadius: 2, marginBottom: 16 }} />
        <h2 style={{ fontFamily: "'Merriweather',serif", fontSize: "clamp(1.5rem,4vw,2rem)", fontWeight: 700, color: "#1B5E20", marginBottom: 40 }}>{l.title}</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {(SERVICES as Service[]).map((svc, i) => {
            const d = svc[lang];
            return (
              <div key={i} style={{
                background: "#fff", border: "1px solid #DDD0B8", borderRadius: 12,
                padding: "28px 24px", transition: "0.22s ease",
              }}
                onMouseEnter={(e: MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.borderColor = "#2E7D32";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.10)";
                }}
                onMouseLeave={(e: MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.borderColor = "#DDD0B8";
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ width: 54, height: 54, background: "#E8F5E9", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", marginBottom: 16 }}>
                  {svc.icon}
                </div>
                <h3 style={{ fontFamily: "'Merriweather',serif", fontSize: "1rem", fontWeight: 700, color: "#1B5E20", marginBottom: 10, lineHeight: 1.3 }}>{d.title}</h3>
                <p style={{ fontSize: "0.88rem", color: "#8A7E6E", lineHeight: 1.65, margin: 0 }}>{d.body}</p>
                <a href="#contact" style={{ display: "inline-block", marginTop: 14, fontSize: "0.84rem", color: "#8B6208", fontWeight: 700, textDecoration: "none" }}>{d.more}</a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}