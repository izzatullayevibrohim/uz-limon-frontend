import { apiRequest } from "./client";
import type { Application, ApplicationStatus } from "../types";
import type { ApplicationType } from "../types";

export async function getApplicationTypes(): Promise<ApplicationType[]> {
  const data = await apiRequest<{ applicationTypes: ApplicationType[] }>(
    "/api/get-application-types",
    { auth: false }
  );
  return data.applicationTypes ?? [];
}

interface ApplicationsResponse {
  applications: Application[];
}

interface ApplicationResponse {
  application: Application;
}

export async function getApplications(): Promise<Application[]> {
  const data = await apiRequest<ApplicationsResponse>("/api/admin/applications");
  return data.applications ?? [];
}

export async function updateApplicationStatus(
  id: number,
  status: ApplicationStatus
): Promise<Application> {
  const data = await apiRequest<ApplicationResponse>(
    `/api/admin/applications/${id}/status`,
    {
      method: "PATCH",
      body: { status: String(status) },  // ← String() qo'shildi
    }
  );
  return data.application;
}