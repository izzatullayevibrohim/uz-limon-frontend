import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { useLang, t } from "../context/LangContext";
import type { Lang, LocalizedText } from "../context/LangContext";

interface RawSubject {
  id: number;
  name_uz: string;
  name_ru: string;
  name_en: string;
}

interface Subject extends LocalizedText {
  id: number;
}

interface FormState {
  name: string;
  phone: string;
  subjectId: number | null;
  msg: string;
}

interface LabelSet {
  tag: string;
  title: string;
  contacts: string;
  leave: string;
  name: string;
  phone: string;
  subject: string;
  msg: string;
  send: string;
  sending: string;
  success: string;
  addr: string;
  addrVal: string;
  hours: string;
  hoursVal: string;
  err: string;
  errSubject: string;
  errSend: string;
  loading: string;
  loadError: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function Contact() {
  const { lang } = useLang();
  const [form, setForm] = useState<FormState>({ name: "", phone: "", subjectId: null, msg: "" });
  const [sent, setSent] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const labels: Record<Lang, LabelSet> = {
    ru: { tag: "Свяжитесь с нами", title: "Мы всегда рядом", contacts: "Наши контакты", leave: "Оставить заявку", name: "Ваше имя", phone: "Номер телефона", subject: "Тема обращения", msg: "Сообщение", send: "📩 Отправить заявку", sending: "Отправка...", success: "✅ Заявка отправлена! Мы свяжемся с вами в течение 24 часов.", addr: "Адрес", addrVal: "100011, Ташкент, Шайхонтахурский р-н, ул. Абая 4А", hours: "Часы работы", hoursVal: "Пн–Пт: 9:00–18:00 · Сб: 9:00–13:00", err: "Пожалуйста, заполните имя и телефон.", errSubject: "Пожалуйста, выберите тему обращения.", errSend: "Не удалось отправить заявку. Попробуйте позже.", loading: "Загрузка...", loadError: "Не удалось загрузить темы" },
    uz: { tag: "Biz bilan bog'laning", title: "Biz doimo yondashmiz", contacts: "Bizning kontaktlar", leave: "Ariza qoldirish", name: "Ismingiz", phone: "Telefon raqami", subject: "Murojaat mavzusi", msg: "Xabar", send: "📩 Ariza yuborish", sending: "Yuborilmoqda...", success: "✅ Ariza yuborildi! 24 soat ichida siz bilan bog'lanamiz.", addr: "Manzil", addrVal: "100011, Toshkent, Shayxontohur t., Abay k. 4A", hours: "Ish vaqti", hoursVal: "Du–Ju: 9:00–18:00 · Sh: 9:00–13:00", err: "Iltimos, ism va telefon raqamini to'ldiring.", errSubject: "Iltimos, murojaat mavzusini tanlang.", errSend: "Arizani yuborib bo'lmadi. Keyinroq urinib ko'ring.", loading: "Yuklanmoqda...", loadError: "Mavzularni yuklab bo'lmadi" },
    en: { tag: "Get in Touch", title: "We Are Always Here", contacts: "Our Contacts", leave: "Leave a Request", name: "Your Name", phone: "Phone Number", subject: "Subject", msg: "Message", send: "📩 Send Request", sending: "Sending...", success: "✅ Request sent! We will contact you within 24 hours.", addr: "Address", addrVal: "100011, Tashkent, Shaykhontakhur dist., Abay St. 4A", hours: "Working Hours", hoursVal: "Mon–Fri: 9:00–18:00 · Sat: 9:00–13:00", err: "Please fill in your name and phone number.", errSubject: "Please select a subject.", errSend: "Failed to send request. Please try again later.", loading: "Loading...", loadError: "Failed to load subjects" },
  };
  const l = labels[lang];

  // Load subjects from backend
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        setLoadError(null);
        const response = await fetch(`${API_URL}/api/get-application-types`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        const raw: RawSubject[] = data.applicationTypes ?? [];

        // Normalize: name_xx -> xx
        const list: Subject[] = raw.map(item => ({
          id: item.id,
          ru: item.name_ru,
          uz: item.name_uz,
          en: item.name_en,
        }));

        setSubjects(list);

        // Default: first subject
        if (list.length > 0) {
          setForm(prev => ({ ...prev, subjectId: list[0].id }));
        }
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : "Unknown error");
        console.error("Failed to fetch subjects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  async function handleSubmit(): Promise<void> {
    if (!form.name || !form.phone) { alert(l.err); return; }
    if (!form.subjectId) { alert(l.errSubject); return; }

    try {
      setSending(true);
      const response = await fetch(`${API_URL}/api/create-application`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          full_name: form.name,
          phone_number: form.phone,
          application_type_id: form.subjectId,
          description: form.msg,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error ?? data.message ?? `HTTP ${response.status}`);
      }

      setSent(true);
      setForm({
        name: "",
        phone: "",
        subjectId: subjects[0]?.id ?? null,
        msg: "",
      });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error("Failed to send application:", err);
      alert(l.errSend);
    } finally {
      setSending(false);
    }
  }

  const inputStyle: CSSProperties = { width: "100%", border: "2px solid #DDD0B8", borderRadius: 8, padding: "14px 16px", fontSize: "1rem", color: "#1E1A14", background: "#fff", outline: "none", fontFamily: "inherit", boxSizing: "border-box" };
  const labelStyle: CSSProperties = { fontSize: "0.82rem", fontWeight: 600, color: "#4A4438", marginBottom: 5, display: "block" };

  return (
    <section id="contact" style={{ padding: "64px 24px", background: "#F5EDD6" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B6208", fontWeight: 700, marginBottom: 8 }}>{l.tag}</div>
        <div style={{ width: 56, height: 4, background: "#C8900A", borderRadius: 2, marginBottom: 16 }} />
        <h2 style={{ fontFamily: "'Merriweather',serif", fontSize: "clamp(1.5rem,4vw,2rem)", fontWeight: 700, color: "#1B5E20", marginBottom: 40 }}>{l.title}</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          {/* Contacts */}
          <div>
            <h3 style={{ fontFamily: "'Merriweather',serif", fontSize: "1.4rem", color: "#1B5E20", marginBottom: 22 }}>{l.contacts}</h3>
            <a href="tel:+998712020101" style={{ display: "flex", alignItems: "center", gap: 14, background: "#B85C38", color: "#fff", fontWeight: 700, fontSize: "1.1rem", padding: "18px 24px", borderRadius: 12, textDecoration: "none", marginBottom: 12 }}>
              📞 +998 71 202-01-01
            </a>
            <a href="https://t.me/uzblimon" style={{ display: "flex", alignItems: "center", gap: 14, background: "#229ED9", color: "#fff", fontWeight: 700, fontSize: "1.1rem", padding: "18px 24px", borderRadius: 12, textDecoration: "none", marginBottom: 24 }}>
              ✈️ Telegram: @uzblimon
            </a>
            {[
              { icon: "📍", label: l.addr, val: l.addrVal },
              { icon: "✉️", label: "Email", val: "info@uzblimon.uz" },
              { icon: "🕐", label: l.hours, val: l.hoursVal },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, minWidth: 44, background: "#E8F5E9", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.07em", color: "#8A7E6E", marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontSize: "1rem", fontWeight: 600, color: "#1E1A14" }}>{item.val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div>
            <h3 style={{ fontFamily: "'Merriweather',serif", fontSize: "1.4rem", color: "#1B5E20", marginBottom: 22 }}>{l.leave}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={labelStyle}>{l.name}</label>
                <input style={inputStyle} type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Akbar Nazarov" />
              </div>
              <div>
                <label style={labelStyle}>{l.phone}</label>
                <input style={inputStyle} type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+998 _ _ _  _ _  _ _  _ _" />
              </div>
              <div>
                <label style={labelStyle}>{l.subject}</label>
                <select
                  style={inputStyle}
                  value={form.subjectId ?? ""}
                  onChange={e => setForm({ ...form, subjectId: Number(e.target.value) })}
                  disabled={loading || !!loadError}
                >
                  {loading && <option>{l.loading}</option>}
                  {loadError && <option>{l.loadError}</option>}
                  {!loading && !loadError && subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {t(s, lang)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>{l.msg}</label>
                <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 96 }} value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} />
              </div>
              <button
                onClick={handleSubmit}
                disabled={sending}
                style={{
                  background: sending ? "#5a8c5e" : "#1B5E20",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  padding: "16px 32px",
                  borderRadius: 12,
                  border: "none",
                  cursor: sending ? "not-allowed" : "pointer",
                }}
              >
                {sending ? l.sending : l.send}
              </button>
              {sent && (
                <div style={{ background: "#E8F5E9", color: "#1B5E20", border: "1px solid #a5d6a7", borderRadius: 8, padding: "14px 18px", fontWeight: 600 }}>
                  {l.success}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}