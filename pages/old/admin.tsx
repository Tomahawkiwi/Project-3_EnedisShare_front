/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../src/context/UserContext";
import AdminApp from "../../src/components/admin/AdminApp";
import Loader from "../../src/components/structureShared/Loader";
import { NextPageWithLayout } from "../_app";
import Layout from "../../src/components/layout/Layout";

// type Props = {};

const Admin: NextPageWithLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return <div> Vous devez vous connecter pour y accéder</div>;
  }

  useEffect(() => {
    if (router.isReady) {
      setIsLoading(false);
    }
    // authProvider.checkAuth();
    // return () => {
    //   authProvider.logout();
    // };
  }, []);

  if (user.role !== "SUPER_ADMIN") {
    router.push("/403");
  }

  if (isLoading) {
    return <Loader />;
  }
  // authProvider.login(user);

  return <div>{user.role === "SUPER_ADMIN" && <AdminApp />}</div>;
};

Admin.getLayout = (page) => <Layout>{page}</Layout>;

export default Admin;
