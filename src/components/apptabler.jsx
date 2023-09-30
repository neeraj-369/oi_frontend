import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import axios from 'axios';

export default function AppDataTableR() {
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

  // Custom click handler for the delete button
  const handleDeleteClick = (id, name) => {
    axios
      .delete(`https://backend.cyclic.cloud/test/${id}`, {
        params: { name: name }
      })
      .then((response) => {
        setData((prevData) => prevData.filter((row) => row._id !== id));
        alert('Application named : "' + name + '" and all its versions are deleted successfully');
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to delete the entry.');
      });
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
    //   renderCell: (params) => (
    //     // Use the Link component to wrap the name and provide the link to AppVersionT
    //     <Link to={`/appversions/${encodeURIComponent(params.row._id)}`}>
    //       {params.row.name}
    //     </Link>
    //   ),
    },
    { field: 'versionname', headerName: 'Active Version', width: 150 },
    // { field: 'registry', headerName: 'Registry', width: 200 },
    {
      field: 'link',
      headerName: 'Streaming Link',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="outlined"
          onClick={() => {
            const link = params.row.link;
            if (link.startsWith('http://') || link.startsWith('https://')) {
              window.open(link, '_blank');
            } else {
              window.open(`http://${link}`, '_blank'); // Add "http://" prefix if missing
            }
          }}
        >
          Play Game
        </Button>
      ),
    },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 200,
      renderCell: (params) => (
        <Button variant="outlined" onClick={() => handleDeleteClick(params.row._id, params.row.name)}>
          Delete
        </Button>
      ),
    },
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
            <Link to="/create">
              <Button variant='contained'>Create Application</Button>
            </Link>
          </Grid>
        </Grid>
      </Stack>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={data} columns={columns} pageSize={5} getRowId={getRowId} />
      </div>
    </>
  );
}
