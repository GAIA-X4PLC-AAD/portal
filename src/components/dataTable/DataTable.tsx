import Box from '@mui/material/Box';
// @ts-ignore
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useEffect, useState} from "react";

const participantColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50
  },
  {
    field: 'sdId',
    headerName: 'Provider ID',
    width: 400
  },
  {
    field: 'subjectTypes',
    headerName: 'Types',
    width: 100
  },
  {
    field: 'legalName',
    headerName: 'Legal name',
    width: 190,
    editable: true,
  },
  {
    field: 'claimsGraphUri',
    headerName: 'claimsGraphUri',
    width: 270,
    editable: true,
  },
  {
    field: 'registrationNumber',
    headerName: 'registrationNumber',
    width: 150,
    editable: true,
  },
];

const serviceColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50
  },
  {
    field: 'sdId',
    headerName: 'Self Description ID',
    width: 400
  },
  {
    field: 'surveyID',
    headerName: 'Survey ID',
    width: 250
  },
  {
    field: 'surveyTitle',
    headerName: 'Survey Title',
    width: 190,
    editable: true,
  },
  {
    field: 'surveyDescription',
    headerName: 'Survey Description',
    width: 270,
    editable: true,
  },
  {
    field: 'surveyStartTime',
    headerName: 'Survey Start Time',
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
  }, [])
  const createRows = (): any => {
    let newRows;
    if (props.type === "service") {
      newRows = props.data.map((data: any, id: number) => ({
          id: id + 1,
          sdId: data.id,
          surveyID: data.survey_id,
          surveyTitle: data.survey_title,
          surveyDescription: data.survey_description,
          surveyStartTime: data.survey_start_time
        })
      );
    } else if (props.type === "participants") {
      newRows = props.data.map((data: any, id: number) => ({
          id: id + 1,
          sdId: data.id,
          subjectTypes: data.subjectTypes,
          legalName: data.legalName,
          claimsGraphUri: data.claimsGraphUri,
          registrationNumber: data.registrationNumber
        })
      );
    }

    setRows(rows.concat(newRows));
  }

  const createColumns = (): any => {
    let newColumns;
    if (props.type === "service") {
      newColumns = serviceColumns;
    } else if (props.type === "participants") {
      newColumns = participantColumns;
    }
    setColumns(columns.concat(newColumns));
  }

  return (
    <Box sx={{height: 400, width: '100%'}}>
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
}

export default DataTable;
