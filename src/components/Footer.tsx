import { useLang} from "../context/LangContext";
import type { LocalizedText } from "../context/LangContext";
import { FaTelegram } from "react-icons/fa";

interface NavLink extends LocalizedText {
  href: string;
}

export default function Footer() {
  const { lang } = useLang();
  const desc: LocalizedText = { ru: "Ассоциация производителей и экспортёров цитрусовых, субтропических и тропических растений Республики Узбекистан.", uz: "O'zbekiston Respublikasining sitrus, subtropik va tropik o'simlik yetishtiruvchilar va eksportchilar uyushmasi.", en: "Association of Producers and Exporters of Citrus, Subtropical and Tropical Plants of the Republic of Uzbekistan." };
  const rights: LocalizedText = { ru: "Все права защищены.", uz: "Barcha huquqlar himoyalangan.", en: "All rights reserved." };
  const svcLinks: LocalizedText[] = [
    { ru: "Выращивание", uz: "Yetishtirish", en: "Growing" },
    { ru: "Теплицы", uz: "Issiqxonalar", en: "Greenhouses" },
    { ru: "Экспорт", uz: "Eksport", en: "Export" },
    { ru: "Документы", uz: "Hujjatlar", en: "Documents" },
  ];

  const aboutLinks: NavLink[] = [
    { href: "#about", ru: "Об ассоциации", uz: "Uyushma haqida", en: "Association" },
    { href: "#about", ru: "Устав", uz: "Nizom", en: "Charter" },
    { href: "#reviews", ru: "Отзывы", uz: "Fikrlar", en: "Reviews" },
  ];

  const aboutTitle: LocalizedText = { ru: "О нас", uz: "Biz haqimizda", en: "About Us" };
  const svcTitle: LocalizedText = { ru: "Услуги", uz: "Xizmatlar", en: "Services" };
  const contactTitle: LocalizedText = { ru: "Контакты", uz: "Aloqa", en: "Contact" };

  const contactLinks = [
    { href: "tel:+998712020101", label: "📞 +998 71 202-01-01", icon: null },
    { href: "https://t.me/uzblimon", label: "@uzblimon", icon: <FaTelegram size={18} /> },
    { href: "mailto:info@uzblimon.uz", label: "✉️ info@uzblimon.uz", icon: null },
  ];

  return (
    <footer style={{ background: "#111810", color: "rgba(255,255,255,0.65)", padding: "52px 24px 28px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, paddingBottom: 36, borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 28 }}>
          <div>
            <strong style={{ fontFamily: "'Merriweather',serif", fontSize: "1.15rem", color: "#fff", display: "block", marginBottom: 10 }}>🍋 UzLimon</strong>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.65, marginBottom: 16 }}>{desc[lang]}</p>
            <p style={{ fontSize: "0.78rem", opacity: 0.5 }}>ИНН: 207277776 · МФО: 00446<br />р/с: 20212000000891559001</p>
          </div>
          <div>
            <h4 style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#F5D780", marginBottom: 14, fontWeight: 700 }}>
              {aboutTitle[lang]}
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {aboutLinks.map((item, i) => (
                <li key={i} style={{ marginBottom: 9 }}>
                  <a href={item.href} style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>{item[lang]}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#F5D780", marginBottom: 14, fontWeight: 700 }}>
              {svcTitle[lang]}
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {svcLinks.map((item, i) => (
                <li key={i} style={{ marginBottom: 9 }}>
                  <a href="#services" style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>{item[lang]}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#F5D780", marginBottom: 14, fontWeight: 700 }}>
              {contactTitle[lang]}
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {contactLinks.map((item, i) => (
                <li key={i} style={{ marginBottom: 9 }}>
                  <a href={item.href} style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.55)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                    {item.icon}
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", flexWrap: "wrap", gap: 8 }}>
          <span>© 2025 UzLimon. {rights[lang]}</span>
          <span>Toshkent, O'zbekiston 🇺🇿</span>
        </div>
      </div>
    </footer>
  );
}