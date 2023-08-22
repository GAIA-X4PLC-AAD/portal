import * as React from 'react';
import Box from '@mui/material/Box';
// @ts-ignore
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import {SelfDescription} from "../../types/selfDescription.model";

const intColumns: GridColDef[] = [
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

// type selfDescriptionRow = {
//   id : number
// } & SelfDescription
const DataTable = (props: any) => {
  console.log('DataTable', props.data);
  const [rows, setRows] = useState([]);
  // const [columns, setColumns] = useState<GridColDef[]>([]);
  const [columns, setColumns] = useState(intColumns);
  console.log('initRows', rows);

  useEffect(() => {
    // createColumns();
    createRows();
  }, [])
  const createRows = (): any => {
    const newRows = props.data.map((data: any, id: number) => ({
        id: id + 1,
        sdId: data.id,
        subjectTypes: data.subjectTypes,
        legalName: data.legalName,
        claimsGraphUri: data.claimsGraphUri,
        registrationNumber: data.registrationNumber
      })
    );
    setRows(rows.concat(newRows));
  }

  const createColumns = (): any => {
    const newColumns = props.data.map((data: any, id: number) => ({
        id: id + 1,
        sdId: data.id,
        subjectTypes: data.subjectTypes,
        legalName: data.legalName,
        claimsGraphUri: data.claimsGraphUri,
        registrationNumber: data.registrationNumber
      })
    );
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
