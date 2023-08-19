import React from "react";
import { useQuery } from "@tanstack/react-query";
import MembersCheckAdmin from "../admin/MembersCheckAdmin";
import { userFetcher } from "../../utils/fetcher";
import LoaderFocus from "../structureShared/LoaderFocus";

function UsersAdmin() {
  const {
    isLoading,
    error,
    data: Alluser,
  } = useQuery(["getAllUser"], () => userFetcher.getAll());

  if (isLoading) {
    return <LoaderFocus />;
  }
  if (error || !Alluser) {
    return <p>Sorry something went wrong</p>;
  }

  return <MembersCheckAdmin data={Alluser} />;
}

export default UsersAdmin;
