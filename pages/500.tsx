/* eslint-disable react/function-component-definition */
import Image from "next/image";
import Link from "next/link";
import { NextPageWithLayout } from "./_app";
import Layout from "../src/components/layout/Layout";

const FiveOhFive: NextPageWithLayout = () => {
  return (
    <div className="w-full relative">
      <Image
        src="/assets/waiter-beers.gif"
        fill
        alt="internal server error"
        className="brightness-50 object-cover"
      />
      <div className="absolute text-white-enedis top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-enedis text-[150px]">500</h1>
      </div>
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white-enedis text-mob-3xl(welcome+name)">
        <Link href="/">
          <p>Go back home</p>
        </Link>
      </div>
    </div>
  );
};

FiveOhFive.getLayout = (page) => <Layout>{page}</Layout>;

export default FiveOhFive;
