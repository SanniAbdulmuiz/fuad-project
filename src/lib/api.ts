import { LoginPayload, LoginResponse, RequestPasswordResetPayload, GenericApiResponse, UpdatePasswordPayload, PaginatedResponse, User } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_BASE_URL environment variable");
}

async function handleResponse<T extends { success: boolean; message?: string }>(response: Response): Promise<T> {
  const result: T = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.message || "An API error occurred.");
  }
  return result;
}

export const api = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handleResponse<LoginResponse>(response);
  },

  requestPasswordReset: async (payload: RequestPasswordResetPayload): Promise<GenericApiResponse> => {
    const response = await fetch(`${API_BASE_URL}/user/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handleResponse<GenericApiResponse>(response);
  },

  updatePassword: async (payload: UpdatePasswordPayload): Promise<GenericApiResponse> => {
    const response = await fetch(`${API_BASE_URL}/user/update-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handleResponse<GenericApiResponse>(response);
  },

  getAllUsers: async (token: string): Promise<PaginatedResponse<User>> => {
    const response = await fetch(`${API_BASE_URL}/user/users`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    return handleResponse<PaginatedResponse<User>>(response);
  },

  getAllTrainers: async (token: string): Promise<PaginatedResponse<any>> => {
    const response = await fetch(`${API_BASE_URL}/user/trainers`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    return handleResponse<PaginatedResponse<any>>(response);
  },

  getAllGyms: async (token: string): Promise<PaginatedResponse<any>> => {
    const response = await fetch(`${API_BASE_URL}/user/gyms`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    return handleResponse<PaginatedResponse<any>>(response);
  },
};
