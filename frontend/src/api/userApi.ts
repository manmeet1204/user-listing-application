import axios from "axios";
import type { CreateUserRequest, UpdateUserRequest, User } from "../types/user";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export async function getUsers(): Promise<User[]> {
  const response = await axios.get<User[]>(`${API_BASE_URL}/users`);
  return response.data;
}

export async function createUser(request: CreateUserRequest): Promise<User> {
  const response = await axios.post<User>(`${API_BASE_URL}/users`, request);
  return response.data;
}

export async function updateUser(id: number, request: UpdateUserRequest): Promise<User> {
  const response = await axios.put<User>(`${API_BASE_URL}/users/${id}`, request);
  return response.data;
}

export async function deleteUser(id: number): Promise<void> {
  await axios.delete(`${API_BASE_URL}/users/${id}`);
}

export function getErrorMessage(err: unknown, fallback: string): string {
  const response = (err as { response?: { data?: { message?: string } } })?.response;
  return response?.data?.message ?? fallback;
}
