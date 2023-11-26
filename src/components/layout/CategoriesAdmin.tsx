import React from "react";
import { useQuery } from "@tanstack/react-query";
import { categoryFetcher } from "../../utils/fetcher";
import CategorieCheckAdmin from "../admin/CategorieCheckAdmin";
import LoaderFocus from "../structureShared/LoaderFocus";

function CategoriesAdmin() {
  const {
    data: allCategories,
    isLoading,
    isError,
  } = useQuery(["allCategories"], () => categoryFetcher.getAllFromAdmin(), {});

  if (isLoading) {
    return <LoaderFocus />;
  }
  if (isError || !allCategories) {
    return <p>Sorry something went wrong</p>;
  }

  return (
    <div>
      <CategorieCheckAdmin data={allCategories} />
    </div>
  );
}

export default CategoriesAdmin;
