import { Button, CircularProgress } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import Image from "next/image";
import React, { useEffect } from "react";
import { spaceUpdater } from "../../utils/updater";
import { spaceFetcher } from "../../utils/fetcher";

type Props = { params: GridRenderCellParams };

function SpaceImage({ params }: Props) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [actualImage, setActualImage] = React.useState("");
  const [updatedImage, setUpdatedImage] = React.useState("");

  useEffect(() => {
    const fetchSpaceImage = async () => {
      const data = await spaceFetcher.getOne(params.row.id);
      setActualImage(data.imageUrl);
    };
    fetchSpaceImage();
    setIsLoading(false);
  }, []);

  const handleImageChange = async (imageFile: File) => {
    const formData = new FormData();
    setIsLoading(true);
    formData.append("imageUrl", imageFile as File);
    const spaceUpdated = await spaceUpdater.spaceImageUpdaterByAdmin(
      params.row.id,
      formData
    );
    setUpdatedImage(spaceUpdated.data.imageUrl);
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
        src={updatedImage !== "" ? updatedImage : actualImage}
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
