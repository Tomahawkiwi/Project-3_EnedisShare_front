import React from "react";
import { useQuery } from "@tanstack/react-query";
import EspaceCheckAdmin from "../admin/EspaceCheckAdmin";
import { spaceFetcher } from "../../utils/fetcher";
import LoaderFocus from "../structureShared/LoaderFocus";

function SpacesAdmin() {
  const {
    isLoading,
    error,
    data: AllSpaces,
  } = useQuery(["getAllSpaces"], () => spaceFetcher.getAll());

  if (isLoading) {
    return <LoaderFocus />;
  }
  if (error || !AllSpaces) {
    return <p>Sorry something went wrong</p>;
  }
  return (
    <div>
      <EspaceCheckAdmin data={AllSpaces} />
    </div>
  );
}

export default SpacesAdmin;
