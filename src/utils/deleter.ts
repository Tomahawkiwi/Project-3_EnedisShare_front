import axiosInstance from "./axiosInstance";

export const spaceDeleter = {
  delete: async (spaceId: string) =>
    (await axiosInstance.delete(`/spaces/${spaceId}`)).data,
};

export const CategoryDeleter = {
  delete: async (categoryId: string) =>
    (await axiosInstance.delete(`/categories/${categoryId}`)).data,
};

export const postDeleter = {
  delete: async (postId: string) =>
    (await axiosInstance.delete(`/posts/${postId}`)).data,
};
