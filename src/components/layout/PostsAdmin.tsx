import React from "react";
import { useQuery } from "@tanstack/react-query";
import PostCheckAdmin from "../admin/PostCheckAdmin";
import LoaderFocus from "../structureShared/LoaderFocus";
import { postFetcher } from "../../utils/fetcher";

function PostsAdmin() {
  const {
    isLoading,
    error,
    data: allPosts,
  } = useQuery(["getAllPosts"], () => postFetcher.getAllFromAdmin());

  if (isLoading) {
    return <LoaderFocus />;
  }
  if (error || !allPosts) {
    return <p>Sorry something went wrong</p>;
  }
  return (
    <div>
      <PostCheckAdmin data={allPosts} />
    </div>
  );
}

export default PostsAdmin;
