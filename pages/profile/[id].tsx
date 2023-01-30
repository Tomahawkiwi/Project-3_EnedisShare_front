import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Layout from "../../src/components/layout/Layout";
import Loader from "../../src/components/Loader";
import CategoryPost from "../../src/components/posts/structurePost/displayPost/CategoryPost";
import DatePost from "../../src/components/posts/structurePost/displayPost/DatePost";
import TitlePost from "../../src/components/posts/structurePost/displayPost/TitlePost";
import ProfilePicMini from "../../src/components/structure/ProfilePicMini";
import TeamMembersList from "../../src/components/teams/TeamMembersList";
import { useAuth } from "../../src/context/UserContext";
import { formatDate } from "../../src/utils/constants";
import {
  categoryFetcher,
  postFetcher,
  teamFetcher,
  userFetcher,
} from "../../src/utils/fetcher";

interface ShowContent {
  [postId: string]: boolean;
}

function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const { user: userConnected } = useAuth();
  const [showContent, setShowContent] = useState<ShowContent>({});

  const {
    data: user,
    isLoading,
    error,
  } = useQuery(["users", `user-${id}`], () => userFetcher.getOne(`${id}`));

  const { data: team } = useQuery(["teams", `user-${user?.teamId}`], () =>
    teamFetcher.getOne(`${user?.teamId}`)
  );
  const { data: myCategories } = useQuery(
    ["categories", `user-${user?.teamId}`],
    () => categoryFetcher.getAllByUser(`${id}`)
  );

  const { data: posts } = useQuery(["posts"], () =>
    postFetcher.getAllPostUserConnected()
  );

  if (!user || !myCategories || !posts || isLoading) {
    return <Loader />;
  }

  if (error) {
    <p>Error</p>;
  }

  const handleContentClick = (postId: string) => {
    setShowContent((prevState) => {
      return {
        ...prevState,
        [postId]: !prevState[postId],
      };
    });
  };

  return (
    <div className="w-full">
      <div className="bg-background-enedis w-[95%] m-auto mt-5  pb-10 lg:flex lg:justify-between lg:w-[80%]">
        <div className="flex lg:w-[40%]">
          <div className=" w-1/2 m-4 flex flex-col items-center">
            <img
              src={user.imageUrl || "/profile_image.png"}
              alt="profil"
              className="w-[126px] h-[126px] rounded-[50%] my-[5%] object-cover"
            />
            {userConnected?.id === id && (
              <Link href="/profile/settings">
                <button
                  type="button"
                  className="  text-left px-2  w-[131px] rounded-full h-[53px] bg-green-enedis text-white-enedis text-mob-lg(CTA+input) flex justify-around items-center "
                >
                  <Image
                    src="/assets/picto-set 1.png"
                    width={25}
                    height={25}
                    alt="picto enedis"
                    className="w-[25px] h-[25px]"
                  />
                  Modifier
                  <br /> mes infos
                </button>
              </Link>
            )}
          </div>
          <div className=" space-y-2  w-1/2  text-left mt-8 ">
            <p className="font-bold text-[28px] pb-2">{user.firstname}</p>
            <p className="font-bold text-[28px] w-fit pb-4">
              {user.lastname.toUpperCase()}
            </p>
            <div className="flex ">
              <Image
                src="/assets/ENEDIS_PICTO_029_SerrageMains_BLEU_RVB_EXE 1.png"
                width={25}
                height={25}
                alt="picto enedis"
                className="mr-4 w-[25px] h-[25px]"
              />
              <p className="flex items-center border border-blue-enedis rounded-full w-fit px-2  h-[24px]  text-mob-sm(multiuse) lg:text-desk-lg(titlePubli+multiuse) ">
                {team?.name}
              </p>
            </div>
            <div className="flex ">
              <Image
                src="/assets/ENEDIS_PICTO_006_Geolocalisation_BLEU_RVB_EXE 1.png"
                width={25}
                height={25}
                alt="picto enedis"
                className="mr-4 w-[25px] h-[25px]"
              />
              <p className="flex items-center border border-blue-enedis rounded-full w-fit px-2  h-[24px]  text-mob-sm(multiuse) lg:text-desk-lg(titlePubli+multiuse)">
                {user.workLocation}
              </p>
            </div>
            <div className=" flex">
              <Image
                src="/assets/ENEDIS_PICTO_018_Contact_BLEU_RVB_EXE 1.png"
                width={25}
                height={25}
                alt="picto enedis"
                className="mr-4 w-[25px] h-[25px]"
              />
              <p className="flex items-center border border-blue-enedis rounded-full w-fit px-2  h-[24px]  text-mob-sm(multiuse) lg:text-desk-lg(titlePubli+multiuse) truncate ">
                {user.email}
              </p>
            </div>
            <div className=" flex">
              <Image
                src="/assets/picto-birthday 1.png"
                width={25}
                height={25}
                alt="picto enedis"
                className="mr-4 w-[25px] h-[25px]"
              />

              <p className="flex items-center border border-blue-enedis rounded-full w-fit px-2  h-[24px] text-mob-sm(multiuse) lg:text-desk-lg(titlePubli+multiuse)">
                {formatDate(new Date(user.birthday || "null"))}
              </p>
            </div>
          </div>
        </div>
        <div className="flex lg:w-[60%]">
          <div className="w-1/2 flex flex-col items-center pt-4 pl-4">
            <h3 className="mb-2 text-mob-lg(multiuse) lg:text-desk-xl(section)">
              Mon équipe
            </h3>
            <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis lg:w-[80%] mb-5" />
            <div className=" pl-12">
              <TeamMembersList />
            </div>
          </div>

          <div className="w-1/2 flex flex-col items-center pt-4 pb-4">
            <h3 className="mb-2 text-mob-lg(multiuse) lg:text-desk-xl(section)">
              Mes catégories
            </h3>
            <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis lg:w-[80%]" />
            <ul className="mt-5 space-y-2">
              {myCategories?.map((category) =>
                category.ownerId === user.id ? (
                  <div className="flex ">
                    <li
                      className="border text-mob-sm(multiuse) lg:text-desk-lg(titlePubli+multiuse) border-blue-enedis rounded-full h-[30px] w-fit pt-1 px-2  "
                      key={category.id}
                    >
                      {category.name}
                    </li>

                    <Image
                      src="/assets/Group 87.png"
                      width={30}
                      height={30}
                      alt="owner"
                      className="h-[30px] w-[30px] -ml-1"
                    />
                  </div>
                ) : (
                  <li
                    className="border border-blue-enedis rounded-full h-[30px] w-fit pt-1 px-2 truncate text-mob-sm(multiuse) lg:text-desk-lg(titlePubli+multiuse)"
                    key={category.id}
                  >
                    {category.name}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className=" flex flex-col items-center pt-4 pb-4a w-full">
        <h3 className="mb-2 text-mob-lg(multiuse) lg:text-desk-xl(section)">
          Mon activité
        </h3>
        <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis" />
      </div>
      <div className=" flex flex-col items-center pt-4 pb-4a w-full">
        <h3 className="mb-2 text-mob-lg(multiuse) lg:text-desk-xl(section)">
          Mes dernières publications
        </h3>
        <hr className="h-[6px] w-2/3 rounded-full bg-blue-enedis" />

        {posts?.map((post) => (
          <div className="my-5 px-5  min-w-[90%] max-w-[90%] border-l-8 border-green-enedis">
            <div className="flex  justify-between mb-2 m-auto">
              <div className="flex">
                <ProfilePicMini
                  firstname={`${post.author?.firstname}`}
                  imageUrl={`${post.author?.imageUrl}`}
                  lastname={`${post.author?.lastname}`}
                  key={post.id}
                />
                <div className=" ml-2 ">
                  <CategoryPost categoryName={`${post.category?.name}`} />
                </div>
              </div>
              <DatePost datePost={post.createdAt} />
            </div>
            <button
              type="button"
              className="w-5/6 ml-10"
              onClick={() => handleContentClick(post.id)}
            >
              <TitlePost title={post.title} />
              {showContent[post.id] && (
                <div className="text-left p-3 ml-2 w-full  rounded-app-bloc mt-2 break-all bg-white-enedis">
                  <p>{post.content}</p>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

Profile.getLayout = (page: never) => <Layout sideBar>{page}</Layout>;

export default Profile;
