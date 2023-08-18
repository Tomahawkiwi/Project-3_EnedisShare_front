/* eslint-disable import/no-named-as-default */
import React from "react";
import TitleSection from "../../structureShared/TitleSection";
import NavigationAdmin from "./NavigationAdmin";

type Props = {
  ressourceActual: string;
  setRessourceActual: (ressourceWanted: string) => void;
};

function LeftBarAdmin({ ressourceActual, setRessourceActual }: Props) {
  return (
    <div className="w-[25%] hidden md:flex-x-center min-w-[230px] bg-background-enedis">
      <div className="w-[82%] mb-20">
        <div className="mb-10">
          <TitleSection titleText="Mes espaces" />
          <p className="text-desk-sm(textPost+multiuse) mb-8">
            Retrouvez ci-dessous les ressources manipulables
          </p>
          <NavigationAdmin
            ressourceActual={ressourceActual}
            setRessourceActual={setRessourceActual}
          />
        </div>
      </div>
    </div>
  );
}

export default LeftBarAdmin;
