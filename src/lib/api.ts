import { LoginPayload, LoginResponse, RequestPasswordResetPayload, GenericApiResponse, UpdatePasswordPayload, PaginatedResponse, User } from "./types";
import { session } from "./session";
import { TransactionsResponse } from "@/types/transaction";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_BASE_URL environment variable");
}

async function handleResponse<T extends { success: boolean; message?: string; error?: string }>(response: Response): Promise<T> {
  const result: T = await response.json();

  const message = (result as any)?.message as string | undefined;
  const error = (result as any)?.error as string | undefined;
  const isUnauthorized = response.status === 401 || /jwt expired|token expired/i.test(message || "") || /jwt expired|token expired/i.test(error || "");

  if (isUnauthorized) {
    try {
      session.removeToken();
    } catch {}
    if (typeof window !== "undefined") {
      window.location.replace("/signin");
    }
    throw new Error(message || "Unauthorized");
  }

  if (!response.ok || !result.success) {
    throw new Error(message || "An API error occurred.");
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

  getTransactions: async (
    token: string,
    params: { page: number; limit: number }
  ): Promise<TransactionsResponse> => {
    const url = new URL(`${API_BASE_URL}/admin/transactions`);
    url.searchParams.set("page", String(params.page));
    url.searchParams.set("limit", String(params.limit));

    const response = await fetch(url.toString(), {
      headers: { "Authorization": `Bearer ${token}` },
    });
    return handleResponse<TransactionsResponse>(response);
  },

  filterTransactions: async (
    token: string,
    params: {
      page: number;
      limit: number;
      eventType?: string;
      channel?: string;
      minAmount?: number;
      maxAmount?: number;
      search?: string;
    }
  ): Promise<TransactionsResponse> => {
    const url = new URL(`${API_BASE_URL}/admin/filter/transactions`);
    url.searchParams.set("page", String(params.page));
    url.searchParams.set("limit", String(params.limit));
    if (params.eventType) url.searchParams.set("eventType", params.eventType);
    if (params.channel) url.searchParams.set("channel", params.channel);
    if (params.minAmount !== undefined) url.searchParams.set("minAmount", String(params.minAmount));
    if (params.maxAmount !== undefined) url.searchParams.set("maxAmount", String(params.maxAmount));
    if (params.search) url.searchParams.set("search", params.search);

    const response = await fetch(url.toString(), {
      headers: { "Authorization": `Bearer ${token}` },
    });
    return handleResponse<TransactionsResponse>(response);
  },
};
