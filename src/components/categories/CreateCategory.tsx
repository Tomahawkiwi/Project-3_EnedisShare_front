import React, { useState } from "react";
import { useAuth } from "../../context/UserContext";
import { imageFetcher, categoryFetcher } from "../../utils/poster";
import CategoryTitle from "./CategoryTitle";
import UploadArea from "./UploadArea";
import CTA from "../structure/CTA";
import SubmittedCategory from "./SubmittedCategory";
import ProfilePic from "./ProfilePic";
import SiteChoosing from "./SpaceChoosing";

function CreateCategory() {
  const { user } = useAuth();

  const [spaceChosen, setSpaceChosen] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [triedToSubmit, setTriedToSubmit] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!user) {
    return <div>Please connect first</div>;
  }

  const handleSubmit = async () => {
    if (!title || !image || !spaceChosen) {
      return setTriedToSubmit(true);
    }
    const spaceSubmitted = await categoryFetcher.post(
      title,
      image,
      user.id,
      spaceChosen
    );

    if (image) {
      const formData = new FormData();
      formData.append("categoryImage", image as File);
      formData.append("categoryId", spaceSubmitted.data.id);
      await imageFetcher.post(formData);
    }

    return setSubmitted(true);
  };

  return (
    <div>
      {!submitted ? (
        <>
          <div className="h-fit md:flex md:mb-4 md:space-x-3">
            <div className="min-w-[37%] flex items-center justify-between mb-[10px] space-x-3 md:mb-0">
              <ProfilePic
                firstname={user.firstname}
                lastname={user.lastname}
                imageUrl={user.imageUrl}
              />
              <SiteChoosing setSpaceChosen={setSpaceChosen} />
            </div>
            <div className="w-full mb-[15px] md:mb-0">
              <CategoryTitle setTitle={setTitle} />
            </div>
          </div>
          <UploadArea
            handleSubmit={handleSubmit}
            image={image}
            setImage={setImage}
          />
          {triedToSubmit && (
            <p className="w-full text-mob-sm(multiuse) mt-4 font-regular text-redError-enedis">
              <span className="font-bold">ATTENTION :</span> vérifiez que votre
              espace a au moins un site, un titre et une description
            </p>
          )}
          <div className="absolute w-full centered-x-absolute -bottom-20">
            <CTA text="Je publie" action={handleSubmit} />
          </div>
        </>
      ) : (
        <SubmittedCategory />
      )}
    </div>
  );
}

export default CreateCategory;
