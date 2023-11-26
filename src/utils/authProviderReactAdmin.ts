import { AuthProvider } from "react-admin";
import { userFetcher } from "./fetcher";
import { TUser } from "../types/main";

const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const superAdmins = await userFetcher.getAllSuperAdminsFromAdmin();

    const stringsSuperAdmins: any[] = [];
    superAdmins.map((superAdmin: TUser) =>
      stringsSuperAdmins.push(
        superAdmin.firstname.toLowerCase() + superAdmin.lastname.toLowerCase()
      )
    );

    if (!stringsSuperAdmins.includes((username + password).toLowerCase())) {
      return Promise.reject();
    }

    localStorage.setItem("adminConnected", username + password);
    return Promise.resolve();
  },

  logout: () => {
    localStorage.removeItem("adminConnected");
    return Promise.resolve();
  },

  checkAuth: () =>
    localStorage.getItem("adminConnected")
      ? Promise.resolve()
      : Promise.reject(),

  checkError: (error) => {
    const { status } = error;
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },

  getPermissions: () => Promise.resolve(""),
};

export default authProvider;
