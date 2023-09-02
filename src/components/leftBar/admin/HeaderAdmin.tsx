/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Image from "next/image";
import React from "react";

function HeaderAdmin() {
  return (
    <div className="w-full relative z-0 h-[142px] md:h-[210px]">
      <div className="w-full h-full bg-blue-enedis mix-blend-hard-light opacity-[85%] relative z-20" />
      <Image
        alt="site name"
        src="/site_image.png"
        fill
        className="object-cover relative z-10 min-h-full"
      />
      <div className="absolute z-30 centered-absolute w-full font-enedis text-white-enedis">
        <h1 className="text-mob-3xl(welcome+name) font-black md:text-desk-4xl(welcome)">
          Back-office
        </h1>
      </div>
    </div>
  );
}
export default HeaderAdmin;
