import React, { useCallback } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { CategoryDeleter } from "../../utils/deleter";
import { categoryUpdater } from "../../utils/updater";

type CategorieCheckAdminProps = {
  data: any;
};

type Tcategorie = {
  id: string;
  name: string;
  space: {
    name: string;
  };
  description: string;
  owner: {
    firstname: string;
    lastname: string;
  };
  isGeneral: boolean;
};

export default function CategorieCheckAdmin({
  data,
}: CategorieCheckAdminProps) {
  console.log(data);
  const [rows, setRows] = React.useState(
    data.map((categorie: Tcategorie) => ({
      id: categorie.id,
      name: categorie.name,
      description: categorie.description,
      owner: `${categorie.owner.firstname} ${categorie.owner.lastname}`,
      space: categorie.space.name,
      isGeneral: categorie.isGeneral,
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
    const updatedSpace = rows.find((row: Tcategorie) => row.id === id);
    return updatedSpace;
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row: Tcategorie) => row.id !== id));
    const CategorieToDelete = CategoryDeleter.delete(id as string);
    return CategorieToDelete;
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row: Tcategorie) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row: Tcategorie) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const rowToUpdate = {
      id: newRow.id,
      name: newRow.name,
      description: newRow.description,
    };
    setRows(
      rows.map((row: Tcategorie) => (row.id === newRow.id ? rowToUpdate : row))
    );
    const updatedCategorie = categoryUpdater.updateByAdmin(
      rowToUpdate.id,
      rowToUpdate
    );
    return rowToUpdate;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleProcessRowUpdateError = useCallback((error: Error) => {
    console.log(error);
  }, []);
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 220, editable: true },
    {
      field: "space",
      headerName: "Space",
      width: 220,
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
      editable: true,
    },
    {
      field: "owner",
      headerName: "Owner",
      width: 220,
    },
    {
      field: "isGeneral",
      headerName: "Is General",
      width: 220,
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
        height: 500,
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
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
