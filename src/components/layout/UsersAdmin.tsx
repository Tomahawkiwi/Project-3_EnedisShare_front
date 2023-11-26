import React from "react";
import { useQuery } from "@tanstack/react-query";
import MembersCheckAdmin from "../admin/MembersCheckAdmin";
import { teamFetcher, userFetcher } from "../../utils/fetcher";
import LoaderFocus from "../structureShared/LoaderFocus";

function UsersAdmin() {
  const {
    isLoading,
    error,
    data: Alluser,
  } = useQuery(["getAllUser"], () => userFetcher.getAllFromAdmin());

  const {
    isLoading: isLoadingTeam,
    error: errorTeam,
    data: AllTeams,
  } = useQuery(["getAllTeams"], () => teamFetcher.getAllFromAdmin());

  if (isLoadingTeam) {
    return <LoaderFocus />;
  }

  if (errorTeam) {
    return <p>Sorry something went wrong</p>;
  }

  if (isLoading) {
    return <LoaderFocus />;
  }
  if (error || !Alluser) {
    return <p>Sorry something went wrong</p>;
  }

  return <MembersCheckAdmin data={Alluser} teams={AllTeams} />;
}

export default UsersAdmin;
