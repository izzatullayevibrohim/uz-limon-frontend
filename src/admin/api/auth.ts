import { apiRequest } from "./client";
import type { LoginResponse } from "../types";


export async function login(username: string, password: string): Promise<LoginResponse> {
  return apiRequest<LoginResponse>(`/api/login`, {
    method: "POST",
    body: { username, password },
    auth: false,
  });
}

export async function logout(): Promise<void> {
  await apiRequest("/api/logout", { method: "POST" });
}