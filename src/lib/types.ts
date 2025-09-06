export interface LoginPayload {
  email: string;
  password: string;
  userType: string;
}

export interface User {
  _id: string;
  fullname: string;
  email: string;
  userType: string;
  permissions: string[];
  __v:         number;
  token:       string;
}

export interface LoginResponse {
  success: boolean;
  data:    User;
  message?: string;
}

export interface RequestPasswordResetPayload {
  email: string;
}

export interface GenericApiResponse {
  success: boolean;
  message: string;
}

export interface UpdatePasswordPayload {
  token: string;
  newPassword: string;
}

export interface PaginatedResponse<T> {
  success:     boolean;
  data:        T[];
  total:       number;
  currentPage: number;
  totalPages:  number;
  message:     string;
}
