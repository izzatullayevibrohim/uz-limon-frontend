import { apiRequest } from "./client";
import type { Application, ApplicationStatus } from "../types";

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
      body: { status },
    }
  );
  return data.application;
}