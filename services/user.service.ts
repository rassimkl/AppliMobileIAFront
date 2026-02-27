import api from "./api";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "ETUDIANT" | "ENSEIGNANT";
  enabled: boolean;
  createdAt: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "ETUDIANT" | "ENSEIGNANT";
  languages: number[];
}

// 🔹 CREATE USER (ADMIN)
export const createUser = async (
  data: CreateUserRequest
): Promise<User> => {
  const response = await api.post<User>("/users/create", data);
  return response.data;
};

// 🔹 GET USERS BY ROLE
export const getUsersByRole = async (
  role: "ETUDIANT" | "ENSEIGNANT"
): Promise<User[]> => {
  const response = await api.get<User[]>(`/users/role/${role}`);
  return response.data;
};

// 🔹 DELETE USER
export const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

// 🔹 UPDATE USER
export const updateUser = async (
  id: number,
  data: {
    firstName: string;
    lastName: string;
    email: string;
    languages: number[];
  }
) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};