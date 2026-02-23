import api from "./api";

export const createReservation = async (planId: number) => {
  const response = await api.post(`/reservations/${planId}`);
  return response.data;
};

export const getAllReservations = async () => {
  const response = await api.get("/reservations");
  return response.data;
};

export const getMyReservations = async () => {
  const response = await api.get("/reservations/my");
  return response.data;
};

export const approveReservation = async (id: number) => {
  const response = await api.put(`/reservations/${id}/approve`);
  return response.data;
};

export const rejectReservation = async (id: number) => {
  const response = await api.put(`/reservations/${id}/reject`);
  return response.data;
};
