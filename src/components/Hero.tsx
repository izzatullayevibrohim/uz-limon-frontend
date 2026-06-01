import { useLang, t } from "../context/LangContext";
import type { LocalizedText } from "../context/LangContext";
import { FaTelegram } from "react-icons/fa";

export default function Hero() {
  const { lang } = useLang();

  const title: LocalizedText = { ru: "Объединяем производителей цитрусовых Узбекистана", uz: "O'zbekiston sitrus ishlab chiqaruvchilarini birlashtiramiz", en: "Uniting Citrus Growers of Uzbekistan" };
  const sub: LocalizedText = {
    ru: "Ассоциация помогает фермерам, садоводам и предпринимателям развивать бизнес, выходить на экспорт и получать поддержку государства.",
    uz: "Uyushma fermerlar, bog'bonlar va tadbirkorlarga biznesini rivojlantirish, eksportga chiqish va davlat yordami olishda ko'maklashadi.",
    en: "The association helps farmers, gardeners, and entrepreneurs grow their business, access export markets, and receive state support.",
  };
  const callBtn: LocalizedText = { ru: "Позвонить нам", uz: "Bizga qo'ng'iroq", en: "Call Us Now" };
  const tgBtn: LocalizedText = { ru: "Написать в Telegram", uz: "Telegramga yozing", en: "Message on Telegram" };
  const tag: LocalizedText = { ru: "Республика Узбекистан · с 2018 года", uz: "O'zbekiston Respublikasi · 2018 yildan", en: "Republic of Uzbekistan · since 2018" };
  const trust: LocalizedText[] = [
    { ru: "Официальная организация", uz: "Rasmiy tashkilot", en: "Official organization" },
    { ru: "500+ членов", uz: "500+ a'zo", en: "500+ members" },
    { ru: "Экспорт в 40+ стран", uz: "40+ davlatga eksport", en: "Exports to 40+ countries" },
  ];
  const icons: string[] = ["✅", "🏆", "🌍"];

  return (
    <section style={{
      background: "linear-gradient(145deg,#1A3E18 0%,#2D5E2A 55%,#3a6e36 100%)",
      color: "#fff", padding: "64px 24px 72px", position: "relative", overflow: "hidden",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Tag */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(200,144,10,0.25)", border: "1px solid #F5D780",
          color: "#F5D780", fontSize: "0.82rem", fontWeight: 700,
          letterSpacing: "0.08em", textTransform: "uppercase",
          padding: "6px 16px", borderRadius: 20, marginBottom: 22,
        }}>
          🇺🇿 {t(tag, lang)}
        </div>

        {/* Heading */}
        <h1 style={{ fontFamily: "'Merriweather',serif", fontSize: "clamp(1.8rem,5vw,2.9rem)", fontWeight: 700, lineHeight: 1.22, maxWidth: 680, marginBottom: 18 }}>
          {t(title, lang)}
        </h1>

        <p style={{ fontSize: "clamp(1rem,2.5vw,1.15rem)", color: "rgba(255,255,255,0.85)", maxWidth: 540, marginBottom: 36, lineHeight: 1.7 }}>
          {t(sub, lang)}
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href="tel:+998712020101" style={{
            background: "#C8900A", color: "#fff", fontWeight: 700, fontSize: "1.05rem",
            padding: "16px 28px", borderRadius: 12, display: "flex", alignItems: "center",
            gap: 10, textDecoration: "none", boxShadow: "0 4px 16px rgba(200,144,10,0.35)",
          }}>
            📞 {t(callBtn, lang)}
          </a>
          <a href="https://t.me/uzblimon" style={{
            background: "rgba(255,255,255,0.12)", color: "#fff",
            border: "1.5px solid rgba(255,255,255,0.4)", fontWeight: 700, fontSize: "1.05rem",
            padding: "16px 28px", borderRadius: 12, display: "flex", alignItems: "center",
            gap: 10, textDecoration: "none",
          }}>
            <FaTelegram size={24} /> {t(tgBtn, lang)}
          </a>
        </div>

        {/* Trust pills */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 36, flexWrap: "wrap" }}>
          {trust.map((item, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
              padding: "8px 16px", borderRadius: 20, fontSize: "0.85rem",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              {icons[i]} {t(item, lang)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}