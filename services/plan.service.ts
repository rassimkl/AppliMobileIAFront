import api from "./api";

// ==============================
// INTERFACE PLAN
// ==============================
export interface Plan {
  id: number;
  courseTitle: string;
  language: string;
  level: string;
  numberOfHours: number;
  type: string;
  maxParticipants: number | null;
  price: number;
}

// ==============================
// GET ALL PLANS
// ==============================
export const getPlans = async (): Promise<Plan[]> => {
  const response = await api.get("/plans");
  return response.data;
};

export const getPlanById = async (id: number) => {
  const response = await api.get(`/plans/${id}`);
  return response.data;
};

// ==============================
// CREATE PLAN (ADMIN)
// ==============================
export const createPlan = async (data: {
  courseId: number;
  numberOfHours: number;
  type: string;
  maxParticipants: number | null;
  price: number;
}) => {
  const response = await api.post(`/plans/${data.courseId}`, {
    numberOfHours: data.numberOfHours,
    type: data.type,
    maxParticipants: data.maxParticipants,
    price: data.price,
  });

  return response.data;
};

// ==============================
// DELETE PLAN (ADMIN)
// ==============================
export const deletePlan = async (id: number) => {
  const response = await api.delete(`/plans/${id}`);
  return response.data;
};

export const updatePlan = async (
  id: number,
  data: {
    numberOfHours: number;
    type: string;
    maxParticipants: number | null;
    price: number;
  }
) => {
  const response = await api.put(`/plans/${id}`, data);
  return response.data;
};
