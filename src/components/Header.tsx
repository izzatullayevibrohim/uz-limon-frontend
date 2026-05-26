import { useState, type MouseEvent } from "react";
import {type LocalizedText} from "../context/LangContext"
import { useLang, t } from "../context/LangContext";
import { NAV_LINKS } from "../data/content";

interface NavLink extends LocalizedText {
  href: string;
}

export default function Header() {
  const { lang } = useLang();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const callLabel: LocalizedText = { ru: "Позвонить", uz: "Qo'ng'iroq", en: "Call Us" };
  const subtitle: LocalizedText = { ru: "Ассоциация цитрусовых", uz: "Sitrus uyushmasi", en: "Citrus Association" };

  return (
    <>
      <header style={{
        background: "#fff", borderBottom: "3px solid #C8900A",
        position: "sticky", top: 0, zIndex: 200,
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto", padding: "14px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
        }}>
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{
              width: 50, height: 50, background: "#1B5E20", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem",
            }}>🍋</div>
            <div>
              <strong style={{ fontFamily: "'Merriweather',serif", fontSize: "1.25rem", color: "#1B5E20", display: "block", lineHeight: 1.1 }}>
                UzLimon
              </strong>
              <span style={{ fontSize: "0.7rem", color: "#8A7E6E", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {subtitle[lang]}
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav-hide">
            {(NAV_LINKS as NavLink[]).map((link) => (
              <a key={link.href} href={link.href} style={{
                fontSize: "0.88rem", fontWeight: 600, color: "#4A4438",
                padding: "8px 12px", borderRadius: 8, textDecoration: "none",
                transition: "0.22s ease", whiteSpace: "nowrap",
              }}
                onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
                  const target = e.currentTarget;
                  target.style.background = "#E8F5E9";
                  target.style.color = "#1B5E20";
                }}
                onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
                  const target = e.currentTarget;
                  target.style.background = "transparent";
                  target.style.color = "#4A4438";
                }}
              >
                {t(link, lang)}
              </a>
            ))}
          </nav>

          {/* Call button + hamburger */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <a href="tel:+998712020101" style={{
              background: "#B85C38", color: "#fff", fontWeight: 700, fontSize: "0.9rem",
              padding: "10px 20px", borderRadius: 8, display: "flex", alignItems: "center",
              gap: 8, textDecoration: "none", whiteSpace: "nowrap",
            }}>
              📞 {t(callLabel, lang)}
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              style={{ display: "flex", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 8 }}
              aria-label="Menu"
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{ width: 26, height: 2.5, background: "#1E1A14", borderRadius: 2, display: "block" }} />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(27,94,32,0.97)",
          zIndex: 500, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 6, padding: "40px 24px",
        }}>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute", top: 20, right: 20,
              background: "rgba(255,255,255,0.15)", color: "#fff",
              width: 44, height: 44, borderRadius: "50%", border: "none",
              fontSize: "1.5rem", cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center",
            }}
          >✕</button>
          {(NAV_LINKS as NavLink[]).map((link) => (
            <a key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "#fff", fontSize: "1.4rem", fontWeight: 700,
                padding: "14px 32px", borderRadius: 12, textAlign: "center",
                width: "100%", maxWidth: 320, textDecoration: "none",
              }}
            >
              {t(link, lang)}
            </a>
          ))}
          <a href="tel:+998712020101" style={{
            background: "#B85C38", color: "#fff", fontSize: "1.1rem", fontWeight: 700,
            padding: "14px 32px", borderRadius: 12, marginTop: 8,
            textDecoration: "none", textAlign: "center", width: "100%", maxWidth: 320,
          }}>
            📞 +998 71 202-01-01
          </a>
          <a href="https://t.me/uzblimon" style={{
            background: "#229ED9", color: "#fff", fontSize: "1.1rem", fontWeight: 700,
            padding: "14px 32px", borderRadius: 12, textDecoration: "none",
            textAlign: "center", width: "100%", maxWidth: 320,
          }}>
            ✈️ Telegram
          </a>
        </div>
      )}
    </>
  );
}