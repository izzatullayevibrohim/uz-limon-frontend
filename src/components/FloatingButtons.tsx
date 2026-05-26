export default function FloatingButtons() {
  return (
    <div style={{ position: "fixed", bottom: 24, right: 20, display: "flex", flexDirection: "column", gap: 12, zIndex: 300 }}>
      <a href="tel:+998712020101" style={{ width: 56, height: 56, borderRadius: "50%", background: "#B85C38", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", textDecoration: "none" }}>📞</a>
      <a href="https://t.me/uzblimon" style={{ width: 56, height: 56, borderRadius: "50%", background: "#229ED9", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", textDecoration: "none" }}>✈️</a>
    </div>
  );
}