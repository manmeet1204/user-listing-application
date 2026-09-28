export interface User {
  id: number;
  name: string;
  email: string;
  enabled: boolean;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface UpdateUserRequest {
  name: string;
  enabled: boolean;
}
