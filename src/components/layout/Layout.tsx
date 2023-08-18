import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "../Footer/Footer";
import Navbar from "./Navbar";
import Loader from "../structureShared/Loader";
import { useAuth } from "../../context/UserContext";

interface IProps {
  children: ReactNode;
  sideBar?: ReactNode;
}

export default function Layout({ children, sideBar }: IProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (router.isReady) {
      setIsLoading(false);
    }
  }, []);

  if (!user) {
    return (
      <div className="w-full h-full flex-all-center text-desk-md(titlePubli+multiuse)">
        Connectez-vous pour entrer sur le réseau Enedis Share
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="grow items-center flex-col">
      <Navbar />
      <div className="flex justify-between w-full min-h-[calc(100vh-70px)]">
        {sideBar && sideBar}
        {children}
      </div>
      <Footer />
    </div>
  );
}
