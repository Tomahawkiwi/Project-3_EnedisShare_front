import { DataGrid, GridRowModel } from "@mui/x-data-grid";
import { useCallback } from "react";
import { userUpdater } from "../../utils/updater";

type TData = {
  data: any;
};

type TUser = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  birthday: string;
  role: string;
  workLocation: string;
  imageUrl: string;
  team: {
    name: string;
  };
};

function AdminAppV2({ data }: TData) {
  const rows = data.map((user: TUser) => ({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    birthday: new Date(user.birthday),
    role: user.role,
    workLocation: user.workLocation,
    teamName: user.team.name,
    imageUrl: user.imageUrl,
  }));

  const columns = [
    { field: "firstname", headerName: "Firstname", width: 180 },
    { field: "lastname", headerName: "Lastname", width: 180 },
    { field: "email", headerName: "Email", width: 220, editable: true },
    {
      field: "birthday",
      headerName: "Birthday",
      type: "date",
      width: 130,
      editable: true,
    },
    { field: "role", headerName: "Role", width: 160, editable: true },
    {
      field: "workLocation",
      headerName: "Work Location",
      width: 150,
      editable: true,
    },
    { field: "teamName", headerName: "Team Name", width: 220, editable: true },
    {
      field: "imageUrl",
      headerName: "Image Url",
      width: 180,
    },
  ];

  const processRowUpdate = useCallback(async (newRow: GridRowModel) => {
    const updatedUser = await userUpdater.userUpdaterByAdmin(newRow.id, newRow);
    return updatedUser;
  }, []);

  const handleProcessRowUpdateError = useCallback((error: Error) => {
    console.log(error);
  }, []);

  return (
    <div className="w-10/12 flex justify-center border border-blue-enedis">
      <div
        style={{
          height: 700,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <DataGrid
          editMode="row"
          rows={rows}
          columns={columns}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
        />
      </div>
    </div>
  );
}

export default AdminAppV2;
