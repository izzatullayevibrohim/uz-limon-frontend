import { useLang, t } from "../context/LangContext";
import type { LocalizedText } from "../context/LangContext";

export default function About() {
  const { lang } = useLang();

  const checks: LocalizedText[] = [
    { ru: "Защита интересов производителей на государственном уровне", uz: "Ishlab chiqaruvchilar manfaatlarini davlat darajasida himoya qilish", en: "Protecting producers' interests at the government level" },
    { ru: "Помощь в получении льгот и субсидий", uz: "Imtiyoz va subsidiyalar olishda yordam", en: "Assistance in obtaining benefits and subsidies" },
    { ru: "Обучение современным агротехнологиям", uz: "Zamonaviy agrotexnologiyalarga o'qitish", en: "Training in modern agricultural technologies" },
    { ru: "Выход на экспортные рынки через ассоциацию", uz: "Uyushma orqali eksport bozorlariga chiqish", en: "Access to export markets through the association" },
  ];

  const quote: LocalizedText = { ru: "«От узбекского сада — на мировой рынок»", uz: "«O'zbek bog'idan — jahon bozoriga»", en: "«From Uzbek Gardens to World Markets»" };
  const badge: LocalizedText = { ru: "📜 Зарегистрирована в Минюсте РУз", uz: "📜 O'zbekiston Adliya vazirligida ro'yxatga olingan", en: "📜 Registered with Ministry of Justice" };
  const tag: LocalizedText = { ru: "Об ассоциации", uz: "Uyushma haqida", en: "About the Association" };
  const title: LocalizedText = { ru: "Вместе мы сильнее", uz: "Birlikda kuchlimiz", en: "Stronger Together" };
  const p1: LocalizedText = { ru: "Ассоциация производителей и экспортёров цитрусовых Узбекистана объединяет фермеров, садоводов и предпринимателей со всей страны — от Ферганской долины до Ташкента.", uz: "O'zbekiston sitrus yetishtiruvchilar va eksportchilar uyushmasi butun mamlakat bo'ylab fermerlar, bog'bonlar va tadbirkorlarni birlashtiradi.", en: "The Association of Citrus Growers and Exporters of Uzbekistan unites farmers, gardeners, and entrepreneurs from across the country." };
  const p2: LocalizedText = { ru: "Наша цель — сделать узбекский лимон узнаваемым брендом и помочь каждому члену развить прибыльное хозяйство.", uz: "Bizning maqsadimiz — o'zbek limonini taniqli brend qilish va har bir a'zoga foydali xo'jalik yuritishiga yordam berish.", en: "Our goal is to make Uzbek lemon a recognized brand and help every member build a profitable farm." };

  return (
    <section id="about" style={{ padding: "64px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "center" }}>
        {/* Visual */}
        <div style={{
          background: "#E8F5E9", borderRadius: 16, border: "1px solid #DDD0B8",
          minHeight: 360, display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden", padding: "40px 32px", textAlign: "center",
        }}>
          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <span style={{ fontSize: 80, display: "block", marginBottom: 16 }}>🌿</span>
            <p style={{ fontFamily: "'Merriweather',serif", fontSize: "1rem", fontStyle: "italic", color: "#1B5E20", lineHeight: 1.6 }}>
              {t(quote, lang)}
            </p>
          </div>
          <div style={{
            position: "absolute", bottom: 20, left: 20,
            background: "#1B5E20", color: "#fff", fontSize: "0.75rem", fontWeight: 600,
            padding: "8px 14px", borderRadius: 8, lineHeight: 1.4,
          }}>
            {t(badge, lang)}
          </div>
        </div>

        {/* Text */}
        <div>
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B6208", fontWeight: 700, marginBottom: 8 }}>
            {t(tag, lang)}
          </div>
          <div style={{ width: 56, height: 4, background: "#C8900A", borderRadius: 2, marginBottom: 16 }} />
          <h2 style={{ fontFamily: "'Merriweather',serif", fontSize: "clamp(1.5rem,4vw,2rem)", fontWeight: 700, color: "#1B5E20", lineHeight: 1.3, marginBottom: 20 }}>
            {t(title, lang)}
          </h2>
          <p style={{ color: "#4A4438", fontSize: "1rem", marginBottom: 18 }}>
            {t(p1, lang)}
          </p>
          <p style={{ color: "#4A4438", fontSize: "1rem", marginBottom: 24 }}>
            {t(p2, lang)}
          </p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {checks.map((item, i) => (
              <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14, fontSize: "0.97rem", color: "#4A4438" }}>
                <span style={{
                  background: "#1B5E20", color: "#fff", width: 24, height: 24, minWidth: 24,
                  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.7rem", marginTop: 2,
                }}>✓</span>
                {t(item, lang)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}