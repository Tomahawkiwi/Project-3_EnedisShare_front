/* eslint-disable react/function-component-definition */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { NextPageWithLayout } from "./_app";
import Layout from "../src/components/layout/Layout";
import AdminAppV2 from "../src/components/admin/AdminAppV2";
import { userFetcher } from "../src/utils/fetcher";

// type Props = {};

const Admin: NextPageWithLayout = () => {
  const {
    isLoading,
    error,
    data: Alluser,
  } = useQuery(["getAllUser"], () => userFetcher.getAll());

  if (isLoading || error) {
    return <div>Loading or there was an error</div>;
  }

  return (
    <div>
      <AdminAppV2 data={Alluser} />
    </div>
  );
};

Admin.getLayout = (page) => <Layout>{page}</Layout>;

export default Admin;
