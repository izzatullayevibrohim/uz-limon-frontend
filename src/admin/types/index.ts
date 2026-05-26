export type ApplicationStatus = "pending" | "in_progress" | "completed" | "rejected";

export interface ApplicationType {
  id: number;
  name_uz: string;
  name_ru: string;
  name_en: string;
}

export interface Application {
  id: number;
  full_name: string;
  phone_number: string;
  application_type_id: number;
  application_type?: ApplicationType;
  description: string;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: number;
  username: string;
  name?: string;
}

export interface LoginResponse {
  token: string;
  user: AdminUser;
}