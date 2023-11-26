import { Button, CircularProgress } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import Image from "next/image";
import React, { Dispatch } from "react";
import { spaceImageFetcher } from "../../utils/poster";

type Props = {
  params: GridRenderCellParams;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setActualImage: Dispatch<React.SetStateAction<string | undefined>>;
  actualImage?: string;
};

function SpaceImage({
  params,
  isLoading,
  setIsLoading,
  setActualImage,
  actualImage,
}: Props) {
  const handleImageChange = async (imageFile: File) => {
    const formData = new FormData();
    setIsLoading(true);
    formData.append("postImage", imageFile as File);
    const uploadImage = await spaceImageFetcher.post(formData);
    setActualImage(uploadImage.data.url);
    setIsLoading(false);
  };

  return isLoading ? (
    <div className="flex-all-center">
      <CircularProgress />
    </div>
  ) : (
    <div className="w-full h-full relative">
      <Image
        alt={`Cover picture of ${params.row.name}`}
        fill
        src={params.row.imageUrl ?? actualImage}
        className="object-contain"
      />
      <Button
        component="label"
        variant="outlined"
        size="small"
        className="!mx-auto !bg-background-enedis !bg-opacity-50 !absolute !centered-absolute "
      >
        Uploader
        <input
          type="file"
          accept="image/*"
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          onChange={(e) => handleImageChange(e.target.files![0]!)}
          hidden
        />
      </Button>
    </div>
  );
}

export default SpaceImage;
