// services/course.service.ts

import api from "./api";

export interface Course {
  id: number;
  title: string;
  description: string;
  langueId: number;
  langueName: string;
  level: string;
  status: string;
}

export const getCourses = async (): Promise<Course[]> => {
  const response = await api.get("/cours");
  return response.data;
};

export const getCourseById = async (id: number): Promise<Course> => {
  const response = await api.get(`/cours/${id}`);
  return response.data;
};

export const createCourse = async (data: {
  title: string;
  description: string;
  langueId: number;
  level: string;
}) => {
  const response = await api.post("/cours", data);
  return response.data;
};

export const updateCourse = async (
  id: number,
  data: {
    title: string;
    description: string;
    langueId: number;
    level: string;
  }
) => {
  const response = await api.put(`/cours/${id}`, data);
  return response.data;
};

export const deleteCourse = async (id: number) => {
  const response = await api.delete(`/cours/${id}`);
  return response.data;
};