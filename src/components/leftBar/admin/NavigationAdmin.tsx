/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Image from "next/image";
import React from "react";

type Props = {
  ressourceActual: string;
  setRessourceActual: (ressourceWanted: string) => void;
};

function NavigationAdmin({ ressourceActual, setRessourceActual }: Props) {
  const ressources = [
    { id: 1, text: "Membres" },
    { id: 2, text: "Espaces" },
    { id: 3, text: "Catégories" },
    { id: 4, text: "Posts" },
  ];

  return (
    <div className="w-full flex-x-center space-y-2 overflow-auto">
      {ressources.map((ressource) => (
        <button
          type="button"
          key={ressource.id}
          onClick={() => setRessourceActual(ressource.text)}
          className="h-full w-full"
        >
          <div className="w-full relative z-0 h-[70px] rounded-app-bloc overflow-hidden">
            <div
              className={`w-full h-full ${
                ressourceActual === ressource.text
                  ? "bg-background-enedis"
                  : "bg-blue-enedis opacity-[85%]"
              } mix-blend-hard-light opacity-[85%] relative z-20`}
            />
            <Image
              alt={ressource.text}
              src="/site_image.png"
              fill
              className="object-cover relative z-10 min-h-full"
            />
            <div className="w-full h-full px-5 py-3 flex-all-center absolute z-30 centered-absolute font-enedis text-white-enedis">
              <h1
                className={`text-desk-lg(CTA+input) font-bold ${
                  ressourceActual === ressource.text && "text-blue-enedis"
                }`}
              >
                {ressource.text}
              </h1>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default NavigationAdmin;
