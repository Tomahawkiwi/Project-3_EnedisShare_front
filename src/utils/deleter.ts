import axiosInstance from "./axiosInstance";

export const spaceDeleter = {
  deleteFromAdmin: async (spaceId: string) =>
    (await axiosInstance.delete(`/spaces/${spaceId}`)).data,
};

export const CategoryDeleter = {
  deleteFromAdmin: async (categoryId: string) =>
    (await axiosInstance.delete(`/categories/${categoryId}`)).data,
};

export const postDeleter = {
  deleteFromAdmin: async (postId: string) =>
    (await axiosInstance.delete(`/posts/${postId}?fromAdmin=true`)).data,
};
