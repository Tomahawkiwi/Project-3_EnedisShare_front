import { TUser, TCategory, TSpace } from "../types/main";

/* eslint-disable @typescript-eslint/return-await */
import axiosInstance from "./axiosInstance";

export const userUpdater = {
  updateProfilePic: async (userId: string, formData: FormData) =>
    await axiosInstance.put<TUser>(`/users/${userId}`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    }),
  userUpdaterByAdmin: async (userId: string, data: any) =>
    await axiosInstance.put<TUser>(`/users/${userId}?fromAdmin=true`, data),
};

export const categoryUpdater = {
  disable: async (categoryId: string) =>
    (await axiosInstance.put<TCategory>(`/categories/${categoryId}/disable`))
      .data,

  updateByAdmin: async (categoryId: string, data: any) =>
    await axiosInstance.put(`/categories/${categoryId}?fromAdmin=true`, data),
};

export const spaceUpdater = {
  spaceUpdaterByAdmin: async (spaceId: string, data: any) =>
    await axiosInstance.put<TSpace>(`/spaces/admin/${spaceId}`, data),
  spaceImageUpdaterByAdmin: async (spaceId: string, formData: FormData) =>
    await axiosInstance.put<TSpace>(
      `/spaces/${spaceId}?fromAdmin=true`,
      formData,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    ),
};

export const postUpdater = {
  postUpdaterByAdmin: async (postId: string, data: any) => {
    try {
      await axiosInstance.put(`/posts/${postId}?fromAdmin=true`, data);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  },
};
