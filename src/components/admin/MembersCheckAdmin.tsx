import { DataGrid, GridRenderCellParams, GridRowModel } from "@mui/x-data-grid";
import { useCallback } from "react";
import { Avatar } from "@mui/material";
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

function MembersCheckAdmin({ data }: TData) {
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
    {
      field: "imageUrl",
      headerName: "Avatar",
      width: 70,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="w-full h-full flex-all-center">
            <Avatar
              alt={`${params.row.firstname} ${params.row.lastname}`}
              src={params.value}
            />
          </div>
        );
      },
    },
    { field: "firstname", headerName: "Firstname", width: 100 },
    { field: "lastname", headerName: "Lastname", width: 100 },
    { field: "email", headerName: "Email", width: 200, editable: true },
    {
      field: "birthday",
      headerName: "Birthday",
      type: "date",
      width: 90,
      editable: true,
    },
    { field: "role", headerName: "Role", width: 90, editable: true },
    {
      field: "workLocation",
      headerName: "Work Location",
      width: 90,
      editable: true,
    },
    { field: "teamName", headerName: "Team Name", width: 140, editable: true },
  ];

  const processRowUpdate = useCallback(async (newRow: GridRowModel) => {
    const updatedUser = await userUpdater.userUpdaterByAdmin(newRow.id, newRow);
    return updatedUser;
  }, []);

  const handleProcessRowUpdateError = useCallback((error: Error) => {
    console.log(error);
  }, []);

  return (
    <div
      style={{
        height: 700,
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
        className="!text-desk-xs(date)"
      />
    </div>
  );
}

export default MembersCheckAdmin;
