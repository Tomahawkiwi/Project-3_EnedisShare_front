/* eslint-disable react/function-component-definition */
import { useRouter } from "next/router";
import { useState } from "react";
import TitleSection from "../../src/components/structureShared/TitleSection";
import { NextPageWithLayout } from "../_app";
import Layout from "../../src/components/layout/Layout";
import { useAuth } from "../../src/context/UserContext";
import LeftBarAdmin from "../../src/components/leftBar/admin/LeftBarAdmin";
import HeaderAdmin from "../../src/components/leftBar/admin/HeaderAdmin";
import UsersAdmin from "../../src/components/layout/UsersAdmin";
import SpacesAdmin from "../../src/components/layout/SpacesAdmin";
import CategoriesAdmin from "../../src/components/layout/CategoriesAdmin";
import PostsAdmin from "../../src/components/layout/PostsAdmin";

const Admin: NextPageWithLayout = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [ressourceActual, setRessourceActual] = useState("Membres");

  if (!user) {
    return <div>Unauthorized</div>;
  }

  if (user.role !== "SUPER_ADMIN") {
    router.push("/403");
  }

  return (
    <>
      <LeftBarAdmin
        ressourceActual={ressourceActual}
        setRessourceActual={setRessourceActual}
      />
      <div className="w-full min-h-[calc(100vh-70px)] md:max-w-[75%]">
        <div className="w-full h-full flex-x-center bg-white-enedis">
          <HeaderAdmin />
          <div className="w-[95%] mt-4">
            <TitleSection titleText={ressourceActual} />
          </div>
          <div className="w-[95%] h-full md:w-[91%] bg-background-enedis mt-6 mb-10 p-10">
            {ressourceActual === "Membres" && <UsersAdmin />}
            {ressourceActual === "Espaces" && <SpacesAdmin />}
            {ressourceActual === "Catégories" && <CategoriesAdmin />}
            {ressourceActual === "Posts" && <PostsAdmin />}
          </div>
        </div>
      </div>
    </>
  );
};

Admin.getLayout = (page) => <Layout>{page}</Layout>;

export default Admin;
