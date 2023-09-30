import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import axios from 'axios';

export default function AppDataTable() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    // Fetch data from the backend API
    axios
      .get('https://backend.cyclic.cloud/test')
      .then((response) => {
        setData(response.data); // Set the response data to the state directly
        console.log("data is :" + response.data);
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to fetch data from the server.');
      });
  }, []);
  
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
      <Link to={`/appversions/${encodeURIComponent(params.row._id)}`} style={{ textDecoration: 'none' }}>
      <Button variant="contained" style={{ color: 'white', backgroundColor: '#3992ff' }}>
        {params.row.name}
      </Button>
      </Link>

      ),
    },    
    { field: 'versionname', headerName: 'Active Version', width: 150 },
    { field: 'registry', headerName: 'Registry', width: 200 },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
  ];
  const getRowId = (row) => row._id;
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField variant='outlined' label='Search' />
          </Grid>
          <Grid item xs={4}>
            {/* <Link to="/applications/create">
              <Button variant='contained'>Create Application</Button>
            </Link> */}
          </Grid>
        </Grid>
      </Stack>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={data} columns={columns} pageSize={5} getRowId={getRowId} />
      </div>
    </>
  );
}
