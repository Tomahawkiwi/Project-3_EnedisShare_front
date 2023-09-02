import * as React from "react";
import { v4 as uuid } from "uuid";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import { userUpdater } from "../../utils/updater";
import { userPoster } from "../../utils/poster";

type TData = {
  data: any;
  teams: any;
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
  isDisabled: boolean;
};

const roles = ["ADMIN", "USER", "SUPER_ADMIN"];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = uuid();
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "firstname" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add User
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid({ data, teams }: TData) {
  const [rows, setRows] = React.useState(
    data.map((user: TUser) => ({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      birthday: new Date(user.birthday),
      role: user.role,
      workLocation: user.workLocation,
      teamName: user.team.name,
      imageUrl: user.imageUrl,
      isDisabled: user.isDisabled,
    }))
  );
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      // eslint-disable-next-line no-param-reassign
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row: TUser) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row: TUser) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row: TUser) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    if (newRow.isNew) {
      const payloadNewUser = {
        id: newRow.id,
        firstname: newRow.firstname,
        lastname: newRow.lastname,
        password: `${newRow.firstname}${newRow.lastname}`,
        email: newRow.email,
        birthday: newRow.birthday,
        role: newRow.role,
        workLocation: newRow.workLocation,
        isDisabled: false,
        teamId: teams.find((team: any) => team.name === newRow.teamName).id,
        imageUrl:
          "https://res.cloudinary.com/tomahawkiwi/image/upload/v1693666511/enedis-share-2023-pour-titre/profileImages/istockphoto-1456244103-612x612_oto95u.webp",
      };
      const newUser = userPoster.post(payloadNewUser);
      return newUser;
    }
    const updatedUser = await userUpdater.userUpdaterByAdmin(newRow.id, newRow);
    return updatedUser;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    console.log(error);
  }, []);

  const columns: GridColDef[] = [
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
    { field: "firstname", headerName: "Firstname", width: 100, editable: true },
    { field: "lastname", headerName: "Lastname", width: 100, editable: true },
    { field: "email", headerName: "Email", width: 200, editable: true },
    {
      field: "birthday",
      headerName: "Birthday",
      type: "date",
      width: 90,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 90,
      type: "singleSelect",
      valueOptions: roles,
      editable: true,
    },
    {
      field: "workLocation",
      headerName: "Work Location",
      width: 90,
      editable: true,
    },
    {
      field: "teamName",
      headerName: "Team Name",
      width: 140,
      editable: true,
      type: "singleSelect",
      valueOptions: teams.map((team: any) => team.name),
    },
    {
      field: "isDisabled",
      headerName: "Disabled",
      type: "boolean",
      width: 90,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: "fit-content",
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        className="!text-desk-xs(date)"
        rowHeight={100}
      />
    </Box>
  );
}
