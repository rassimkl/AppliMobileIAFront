import api from "./api";

export interface Langue {
  id: number;
  name: string; // FR, EN, ES
}

export const createLangue = async (name: string): Promise<Langue> => {
  const response = await api.post("/langues", { name });
  return response.data;
};

export const getLangues = async (): Promise<Langue[]> => {
  const response = await api.get<Langue[]>("/langues");
  return response.data;
};

export const deleteLangue = async (id: number) => {
  const response = await api.delete(`/langues/${id}`);
  return response.data;
};