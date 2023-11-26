import {
  TCategory,
  TOneTeam,
  TSite,
  TSpace,
  TTeam,
  TUser,
  TPost,
  TComment,
} from "../types/main";

/* eslint-disable @typescript-eslint/return-await */
import axiosInstance from "./axiosInstance";

export const userFetcher = {
  getAll: async () => (await axiosInstance.get("/users")).data,
  getOne: async (id: string) =>
    (await axiosInstance.get<TUser>(`/users/${id}`)).data,
  getAllByTeam: async (teamId: string) =>
    (await axiosInstance.get<TUser[]>(`/users?team=${teamId}`)).data,
  getAllBySpace: async ({ spaceId }: { spaceId: string }) =>
    (await axiosInstance.get<TUser[]>(`/users?spaceId=${spaceId}`)).data,
  getAllByCategory: async (CategoryId: string) =>
    (await axiosInstance.get<TUser[]>(`/users?categoryId=${CategoryId}`)).data,
  getAllFromAdmin: async () =>
    (await axiosInstance.get("/users?fromAdmin=true")).data,
  getAllSuperAdminsFromAdmin: async () =>
    (await axiosInstance.get<TUser[]>("/users?role=SUPER_ADMIN?fromAdmin=true"))
      .data,
};

export const spaceFetcher = {
  getAll: async () => (await axiosInstance.get<[TSpace]>("/spaces")).data,
  getAllWithCategories: async () =>
    (await axiosInstance.get<[TSpace]>("/spaces?categories=true")).data,
  getOne: async (id: string) =>
    (await axiosInstance.get<TSpace>(`/spaces/${id}`)).data,
  getOneWithCategories: async (id: string) =>
    (await axiosInstance.get<TSpace>(`/spaces/${id}?categories=true`)).data,
  getOneWithCategoriesAndOwner: async (id: string) =>
    (
      await axiosInstance.get<TSpace>(
        `/spaces/${id}?categories=true&owner=true`
      )
    ).data,
  getAllFromAdmin: async () =>
    (await axiosInstance.get<[TSpace]>("/spaces?fromAdmin=true")).data,
};

export const categoryFetcher = {
  getAll: async () =>
    (await axiosInstance.get<TCategory[]>("/categories")).data,
  getAllByUser: async (id: string) =>
    (await axiosInstance.get<TCategory[]>(`/categories?userID=${id}`)).data,
  getOne: async (id: string) =>
    (await axiosInstance.get<TCategory>(`/categories/${id}`)).data,
  getOneWithSpace: async (id: string) =>
    (await axiosInstance.get<TCategory>(`/categories/${id}?space=true`)).data,
  getAllFromAdmin: async () =>
    (await axiosInstance.get<TCategory[]>("/categories?fromAdmin=true")).data,

  addUserToCategory: async (categoryId: string, usersToConnect: string[]) =>
    (
      await axiosInstance.put(
        `/categories/${categoryId}/addUser`,
        usersToConnect
      )
    ).data,
  removeUserToCategory: async (
    categoryId: string,
    usersToDisconnect: string[]
  ) =>
    (
      await axiosInstance.put(
        `/categories/${categoryId}/removeUser`,
        usersToDisconnect
      )
    ).data,
};

export const teamFetcher = {
  getAllFromAdmin: async () =>
    (await axiosInstance.get<TTeam>("/teams?fromAdmin=true")).data,
  getOne: async (id: string) =>
    (await axiosInstance.get<TOneTeam>(`/teams/${id}`)).data,
  getOneTeamAllMembers: async (id: string) =>
    (await axiosInstance.get(`/teams/${id}?members=true`)).data,
};

export const siteFetcher = {
  getAll: async () => (await axiosInstance.get<TSite>("/sites")).data,
  getSitesByMember: async (idMember: string) =>
    (await axiosInstance.get<[TSite]>(`/sites?members=${idMember}`)).data,
};

export const postFetcher = {
  getAllFromAdmin: async () =>
    (await axiosInstance.get("/posts?fromAdmin=true")).data,

  getLatestPostBySpaceWithImage: async ({ spaceId }: { spaceId: string }) =>
    (
      await axiosInstance.get<TPost[]>(
        `/posts?spaceId=${spaceId}&author=true&category=true&image=true&limit=1`
      )
    ).data,
  getLatestPostByCategoryWithImage: async ({
    categoryId,
  }: {
    categoryId: string;
  }) =>
    (
      await axiosInstance.get<[TPost]>(
        `/posts?categoryId=${categoryId}&author=true&category=true&image=true&limit=1`
      )
    ).data,
  getAllByCategory: async ({ categoryId }: { categoryId: string }) =>
    (
      await axiosInstance.get<TPost[]>(
        `/posts?categoryId=${categoryId}&author=true&image=true`
      )
    ).data,
  getAllPostsShared: async () =>
    (await axiosInstance.get<TPost[]>(`/posts?category=true&author=true`)).data,
};

export const commentFetcher = {
  getAllByPostWithAuthor: async ({ postId }: { postId: string }) =>
    (
      await axiosInstance.get<TComment[]>(
        `/comments?postId=${postId}&author=true`
      )
    ).data,
  getCommentsByPostId: async (postId: string) =>
    await (
      await axiosInstance.get<TComment[]>(
        `/comments?postId=${postId}&author=true`
      )
    ).data,
};
