/* eslint-disable react/jsx-boolean-value */
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
  GridRenderCellParams,
  useGridApiContext,
} from "@mui/x-data-grid";
import { Select, SelectChangeEvent } from "@mui/material";
import { postUpdater } from "../../utils/updater";
import { postDeleter } from "../../utils/deleter";

type PostCheckAdminProps = {
  data: any;
};

type TPosts = {
  id: string;
  title: string;
  content: string;
  author: {
    firstname: string;
    lastname: string;
  };
  isDisabled: boolean;
  category: {
    name: string;
    space: {
      name: string;
    };
  };
};

function SelectEditInputCell(props: GridRenderCellParams) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event: SelectChangeEvent) => {
    const newValue = event.target.value === "true";

    await apiRef.current.setEditCellValue({
      id,
      field,
      value: newValue,
    });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", pr: 2 }}>
      <Select
        value={value}
        onChange={handleChange}
        size="small"
        sx={{ height: 1 }}
        native
        autoFocus
      >
        <option value="true">Oui</option>
        <option value="false">Non</option>
      </Select>
    </Box>
  );
}

const renderSelectEditInputCell: GridColDef["renderCell"] = (params) => {
  return <SelectEditInputCell {...params} />;
};

function PostCheckAdmin({ data }: PostCheckAdminProps) {
  const [rows, setRows] = React.useState(
    data.map((post: TPosts) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      author: `${post.author.firstname} ${post.author.lastname}`,
      categorie: post.category.name,
      space: post.category.space.name,
      isDisabled: post.isDisabled === true ? "Oui" : "Non",
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
    const updatedSpace = rows.find((row: TPosts) => row.id === id);
    return updatedSpace;
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row: TPosts) => row.id !== id));
    const postToDelete = postDeleter.delete(id as string);
    return postToDelete;
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row: TPosts) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row: TPosts) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const payload = {
      isDisabled:
        typeof newRow.isDisabled === "string"
          ? newRow.isDisabled.toLowerCase() !== "true"
          : Boolean(newRow.isDisabled),
    };
    setRows(rows.map((row: TPosts) => (row.id === newRow.id ? newRow : row)));
    const updatedPost = postUpdater.postUpdaterByAdmin(newRow.id, payload);

    return updatedPost;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleProcessRowUpdateError = useCallback((error: Error) => {
    console.log(error);
  }, []);

  const columns: GridColDef[] = [
    { field: "title", headerName: "Titre", width: 220, editable: true },
    {
      field: "content",
      headerName: "Contenu",
      width: 220,
    },
    {
      field: "author",
      headerName: "Auteur",
      width: 300,
    },
    {
      field: "categorie",
      headerName: "Categorie",
      width: 220,
    },
    {
      field: "space",
      headerName: "Espace",
      width: 220,
    },
    {
      field: "isDisabled",
      headerName: "Desactiver",
      width: 220,
      renderEditCell: renderSelectEditInputCell,
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
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}

export default PostCheckAdmin;
