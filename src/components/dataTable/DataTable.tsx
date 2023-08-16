import * as React from 'react';
import Box from '@mui/material/Box';
// @ts-ignore
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import {SelfDescription} from "../../types/selfDescription.model";

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50
  },
  {
    field: 'sdId',
    headerName: 'Provider ID',
    width: 350
  },
  {
    field: 'subjectTypes',
    headerName: 'Types',
    width: 150
  },
  {
    field: 'legalName',
    headerName: 'Legal name',
    width: 200,
    editable: true,
  },
  {
    field: 'claimsGraphUri',
    headerName: 'claimsGraphUri',
    width: 300,
    editable: true,
  },
  {
    field: 'registrationNumber',
    headerName: 'registrationNumber',
    width: 150,
    editable: true,
  },
];

// const rows = [
//   {"id":1,"sd_id":"did:example:plc-aad/infineon","subjectTypes":["LegalPerson"],"legalName":"Infineon Technologies AG","claimsGraphUri":["did:web:compliance.lab.gaia-x.eu"],"registrationNumber":"DE812655055"},
//   {"id":2,"sd_id":"https://w3id.org/gaia-x/gax-trust-framework#Provider1","subjectTypes":["LegalPerson"],"legalName":"Provider Name","claimsGraphUri":["http://gaiax.de"],"registrationNumber":"1234"}
// ];

const rows = [
  {
    id: 1,
    sdId: "did:example:plc-aad/infineon",
    subjectTypes: ["LegalPerson"],
    legalName: "Infineon Technologies AG",
    claimsGraphUri: ["did:web:compliance.lab.gaia-x.eu"],
    registrationNumber: "DE812655055"
  },
  {
    id: 2,
    sdId: "https://w3id.org/gaia-x/gax-trust-framework#Provider1",
    subjectTypes: ["LegalPerson"],
    legalName: "Provider Name",
    claimsGraphUri: ["http://gaiax.de"],
    registrationNumber: "1234"
  }
];

type selfDescriptionRow = SelfDescription & {
  id : number
}
const DataTable = (props: any) => {
  console.log('DataTable', props.data);
  // const [rows, setRows] = useState([]);

  useEffect(() => {
    // createRows();
  }, [])
  const createRows = (): any => {
    props.data.map((participant: any) => console.log(participant));
    let row = props.data.map((participant: any, id: number) => (
      {
        id: id + 1,
        sdId: participant.id,
        subjectTypes: participant.subjectTypes,
        legalName: participant.legalName,
        claimsGraphUri: participant.claimsGraphUri,
        registrationNumber: participant.registrationNumber
      })
    );
    console.log("Row", row);
    // setRows([...rows, row]);
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
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default DataTable;
