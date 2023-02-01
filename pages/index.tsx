/* eslint-disable react/function-component-definition */
import PublicationFirstArea from "../src/components/posts/HeaderPublication/PublicationFirstArea";
import ListSpaceCardsForHP from "../src/components/spaces/inHP/ListSpaceCardsForHP";
import HeaderHP from "../src/components/structureShared/HeaderHP";
import TitleSection from "../src/components/structureShared/TitleSection";
import LeftBar from "../src/components/leftBar/inHP/LeftBar";
import { NextPageWithLayout } from "./_app";
import Layout from "../src/components/layout/Layout";

const Home: NextPageWithLayout = () => {
  return (
    <div className="w-screen">
      <div className="w-full flex-x-center bg-white-enedis">
        <HeaderHP />
        <div className="w-[95%] md:w-[91%] mb-24">
          <PublicationFirstArea />
          <TitleSection titleText="À la Une sur mes espaces" />
          <ListSpaceCardsForHP />
        </div>
      </div>
    </div>
  );
};

Home.getLayout = (page) => <Layout sideBar={<LeftBar />}>{page}</Layout>;

export default Home;
