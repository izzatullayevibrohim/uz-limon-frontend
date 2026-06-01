import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "ru" | "uz" | "en";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue>({ lang: "ru", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("admin_lang") as Lang) || "ru");

  function handleSetLang(l: Lang) {
    setLang(l);
    localStorage.setItem("admin_lang", l);
  }

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

// ─── Translations ───────────────────────────────────────────────
export const T = {
  // LoginPage
  login_subtitle:      { ru: "Войдите в панель администратора", uz: "Administrator paneliga kiring", en: "Sign in to the admin panel" },
  login_label:         { ru: "Логин",    uz: "Login",    en: "Username" },
  login_pass_label:    { ru: "Пароль",   uz: "Parol",    en: "Password" },
  login_btn:           { ru: "🔓 Войти", uz: "🔓 Kirish", en: "🔓 Sign In" },
  login_loading:       { ru: "Вход...",  uz: "Kirish...", en: "Signing in..." },
  login_err_empty:     { ru: "Введите логин и пароль", uz: "Login va parolni kiriting", en: "Enter username and password" },
  login_err_wrong:     { ru: "Неверный логин или пароль", uz: "Login yoki parol noto'g'ri", en: "Invalid username or password" },

  // AdminLayout
  layout_logged_as:    { ru: "Вошли как", uz: "Kirgan foydalanuvchi", en: "Logged in as" },
  layout_logout:       { ru: "🚪 Выйти", uz: "🚪 Chiqish", en: "🚪 Log Out" },
  layout_logout_confirm: { ru: "Вы уверены, что хотите выйти?", uz: "Chiqishni xohlaysizmi?", en: "Are you sure you want to log out?" },
  layout_menu_apps:    { ru: "📋 Заявки", uz: "📋 Arizalar", en: "📋 Applications" },

  // ApplicationsPage — header
  apps_title:          { ru: "Заявки",   uz: "Arizalar",      en: "Applications" },
  apps_subtitle:       { ru: "Управление обращениями от посетителей сайта", uz: "Sayt tashrif buyuruvchilaridan kelgan murojaatlarni boshqarish", en: "Manage requests from website visitors" },

  // Stats
  stat_total:          { ru: "Всего",      uz: "Jami",       en: "Total" },
  stat_pending:        { ru: "В ожидании", uz: "Kutilmoqda", en: "Pending" },
  stat_in_progress:    { ru: "В работе",   uz: "Jarayonda",  en: "In Progress" },
  stat_completed:      { ru: "Завершено",  uz: "Tugallandi", en: "Completed" },
  stat_rejected:       { ru: "Отклонено",  uz: "Rad etildi", en: "Rejected" },

  // Filter / table
  filter_all:          { ru: "Все",        uz: "Barchasi",   en: "All" },
  btn_refresh:         { ru: "🔄 Обновить", uz: "🔄 Yangilash", en: "🔄 Refresh" },
  loading:             { ru: "Загрузка...", uz: "Yuklanmoqda...", en: "Loading..." },
  no_apps:             { ru: "Заявок нет", uz: "Arizalar yo'q", en: "No applications" },

  // Table headers
  th_id:               { ru: "ID",         uz: "ID",        en: "ID" },
  th_name:             { ru: "Имя",        uz: "Ism",       en: "Name" },
  th_phone:            { ru: "Телефон",    uz: "Telefon",   en: "Phone" },
  th_subject:          { ru: "Тема",       uz: "Mavzu",     en: "Subject" },
  th_date:             { ru: "Дата",       uz: "Sana",      en: "Date" },
  th_status:           { ru: "Статус",     uz: "Holat",     en: "Status" },
  th_actions:          { ru: "Действия",   uz: "Amallar",   en: "Actions" },
  btn_view:            { ru: "👁 Просмотр", uz: "👁 Ko'rish", en: "👁 View" },

  // Modal
  modal_app_label:     { ru: "Заявка",     uz: "Ariza",     en: "Application" },
  modal_phone:         { ru: "Телефон",    uz: "Telefon",   en: "Phone" },
  modal_subject:       { ru: "Тема",       uz: "Mavzu",     en: "Subject" },
  modal_date:          { ru: "Дата",       uz: "Sana",      en: "Date" },
  modal_status:        { ru: "Статус",     uz: "Holat",     en: "Status" },
  modal_msg:           { ru: "Сообщение",  uz: "Xabar",     en: "Message" },
  modal_empty:         { ru: "(пусто)",    uz: "(bo'sh)",   en: "(empty)" },
  modal_edit:          { ru: "✏️ Изменить", uz: "✏️ O'zgartirish", en: "✏️ Edit" },
  modal_cancel:        { ru: "✕ Отмена",   uz: "✕ Bekor",  en: "✕ Cancel" },
  err_update_status:   { ru: "Не удалось обновить статус", uz: "Holatni yangilab bo'lmadi", en: "Failed to update status" },
  err_loading:         { ru: "Ошибка загрузки", uz: "Yuklashda xato", en: "Loading error" },
} as const;

export type TKey = keyof typeof T;

export function t(key: TKey, lang: Lang): string {
  return T[key][lang];
}
