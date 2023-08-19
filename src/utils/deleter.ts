import axiosInstance from "./axiosInstance";

const spaceDeleter = {
  delete: async (spaceId: string) =>
    (await axiosInstance.delete(`/spaces/${spaceId}`)).data,
};

export default spaceDeleter;
