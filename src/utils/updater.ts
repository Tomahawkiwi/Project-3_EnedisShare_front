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
    await axiosInstance.put<TUser>(`/users/admin/${userId}`, data),
};

export const categoryUpdater = {
  disable: async (categoryId: string) =>
    (await axiosInstance.put<TCategory>(`/categories/${categoryId}/disable`))
      .data,
};

export const spaceUpdater = {
  spaceUpdaterByAdmin: async (spaceId: string, data: any) =>
    await axiosInstance.put<TSpace>(`/spaces/admin/${spaceId}`, data),
};
