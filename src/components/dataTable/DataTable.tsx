import Box from "@mui/material/Box";
// @ts-ignore
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const participantColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
  },
  {
    field: "sdId",
    headerName: "Provider ID",
    width: 400,
  },
  {
    field: "subjectTypes",
    headerName: "Types",
    width: 100,
  },
  {
    field: "legalName",
    headerName: "Legal name",
    width: 190,
    editable: true,
  },
  {
    field: "claimsGraphUri",
    headerName: "claimsGraphUri",
    width: 270,
    editable: true,
  },
  {
    field: "registrationNumber",
    headerName: "registrationNumber",
    width: 150,
    editable: true,
  },
];

const serviceColumns: GridColDef[] = [
  {
    field: "survey_id",
    headerName: "ID",
    width: 50,
  },
  {
    field: "claimsGraphUri",
    headerName: "Claims Graph Uri",
    width: 200,
  },
  {
    field: "survey_url",
    headerName: "Survey Url",
    width: 500,
  },
  {
    field: "survey_title",
    headerName: "Survey Title",
    width: 200,
    editable: true,
  },
  {
    field: "survey_description",
    headerName: "Survey Description",
    width: 200,
    editable: true,
  },
  {
    field: "survey_creation_time",
    headerName: "Survey Creation Time",
    width: 200,
    editable: true,
  },
  {
    field: "survey_end_time",
    headerName: "Survey End Time",
    width: 200,
    editable: true,
  },
  {
    field: "uri",
    headerName: "Url",
    width: 200,
    editable: true,
  },
];

const DataTable = (props: any) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);

  useEffect(() => {
    createColumns();
    createRows();
  }, []);

  const createRows = (): any => {
    let newRows;
    if (props.type === "service") {
      newRows = props.data.map((data: any, id: number) => ({
        id: id + 1,
        survey_id: data.id,
        claimsGraphUri: data.claimsGraphUri,
        survey_url: data.survey_url,
        survey_title: data.survey_title,
        survey_description: data.survey_description,
        survey_creation_time: data.survey_creation_time,
        survey_end_time: data.survey_end_time,
        uri: data.uri,
      }));
    } else if (props.type === "participants") {
      newRows = props.data.map((data: any, id: number) => ({
        id: id + 1,
        sdId: data.id,
        subjectTypes: data.subjectTypes,
        legalName: data.legalName,
        claimsGraphUri: data.claimsGraphUri,
        registrationNumber: data.registrationNumber,
      }));
    }

    setRows(rows.concat(newRows));
  };

  const createColumns = (): any => {
    let newColumns: GridColDef[] = [];
    if (props.type === "service") {
      newColumns = serviceColumns;
    } else if (props.type === "participants") {
      newColumns = participantColumns;
    }
    setColumns(columns.concat(newColumns));
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        // checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DataTable;
