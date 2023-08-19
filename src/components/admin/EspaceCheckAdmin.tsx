import React, { useCallback } from "react";
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
} from "@mui/x-data-grid";
import { v4 as uuid } from "uuid";
import { spaceUpdater } from "../../utils/updater";
import spaceDeleter from "../../utils/deleter";
import { spacePoster } from "../../utils/poster";

type TDataProps = {
  data: any;
};

type TSpace = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

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
    setRows((oldRows) => [
      ...oldRows,
      { id, name: "", description: "", ImageUrl: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}
function EspaceCheckAdmin({ data }: TDataProps) {
  const [rows, setRows] = React.useState(
    data.map((space: TSpace) => ({
      id: space.id,
      name: space.name,
      description: space.description,
      imageUrl: space.imageUrl,
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
    const updatedSpace = rows.find((row: TSpace) => row.id === id);
    return updatedSpace;
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row: TSpace) => row.id !== id));
    const SpaceToDelete = spaceDeleter.delete(id as string);
    return SpaceToDelete;
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row: TSpace) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row: TSpace) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    if (newRow.isNew) {
      const PayloadNewSpace = {
        name: newRow.name,
        description: newRow.description,
        imageUrl: newRow.imageUrl || "Donnez une url d'image",
        ownerId: "3cddf358-71fb-4676-af8c-33293801bec0",
        siteId: "88aab5a1-4d7d-412e-9da2-0f082e569dfd",
      };
      const newSpace = spacePoster.post(PayloadNewSpace);
      return newSpace;
    }
    const rowToUpdate = {
      id: newRow.id,
      name: newRow.name,
      description: newRow.description,
      imageUrl: newRow.imageUrl,
    };
    setRows(
      rows.map((row: TSpace) => (row.id === newRow.id ? rowToUpdate : row))
    );
    console.log(rowToUpdate, "rowToUpdate");
    const updatedSpace = spaceUpdater.spaceUpdaterByAdmin(
      rowToUpdate.id,
      rowToUpdate
    );
    console.log(updatedSpace);
    return updatedSpace;
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
      field: "description",
      headerName: "Description",
      width: 300,
      editable: true,
    },
    {
      field: "imageUrl",
      headerName: "Image Url",
      width: 220,
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
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}

export default EspaceCheckAdmin;
