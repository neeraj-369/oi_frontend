import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function AppVersionT() {
  const { applicationId } = useParams();
  const [data, setData] = React.useState([]);
    const [nameValue, setNameValue] = React.useState("");
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the backend API using the applicationId parameter
        const response = await axios.get(`https://backend.cyclic.cloud/appversion/${applicationId}`);
        console.log(response);
        const dataWithIds = response.data.map((row, index) => ({
            ...row,
            id: `${row.ApplicationName}-${row.versionname}-${index}`, // Combine ApplicationName and versionname as the id
          }));
        setNameValue(response.data[0].ApplicationName);
        setData(dataWithIds);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch data from the server.');
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = async (applicationName, versionName) => {
    try {
      const response = await axios.delete(`https://backend.cyclic.cloud/appversion/deleteversion`, {
        data: {
          applicationName,
          versionName,
        },
      });
  
      // Assuming the response contains a message indicating success
      alert(response.data.message);
      
      // If successful, you might want to update the data in your state as well
      const updatedData = data.filter((item) => !(item.ApplicationName === applicationName && item.versionname === versionName));
      setData(updatedData);
    } catch (error) {
      console.error(error);
      alert('Failed to delete the version.');
    }
  };
  const handleActivateClick = async (applicationName, versionName) => {
    console.log("applicationName: " + applicationName + " versionName: " + versionName);
    try {
      // Send a POST request to activate the version
      const response = await axios.post('https://backend.cyclic.cloud/appversion/activate', {
        applicationName,
        versionName,
      });
  
      // Assuming the response contains a message indicating success
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Failed to activate the version.');
    }
  };
  
  // Define the columns for the DataGrid
  const columns = [
    { field: 'versionname', headerName: 'Version Name', width: 200 },
    { field: 'registry', headerName: 'Registry', width: 200 },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
    {
        field: 'activate',
        headerName: 'Activate',
        width: 200,
        renderCell: (params) => (
          <Button variant="outlined" onClick={() => handleActivateClick(params.row.ApplicationName, params.row.versionname)}>
            Activate
          </Button>
        ),
      },
    { field: 'bool', headerName: 'Is Active', width: 150 },
    { 
        field: 'delete',
        headerName: 'Delete Version',
        width: 200,
        renderCell: (params) => (
        <Button variant="outlined" onClick={() => handleDeleteClick(params.row.ApplicationName, params.row.versionname)}>
            Delete
        </Button>
    ),
    },
  ];

  return (
    <>
    <div style={{ height: 400, width: '100%' }}>
        
      <h1>Application : {nameValue}</h1>
      <Stack direction="row" spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField variant='outlined' label='Search' />
          </Grid>
          <Grid item xs={4}>
            <Link to={`/appversions/create/${encodeURIComponent(nameValue)}`}>
                <Button variant='contained'>Create Version</Button>
            </Link>
          </Grid>
        </Grid>
      </Stack>
        <br />
      <DataGrid rows={data} columns={columns} pageSize={5} getRowId={(row) => row.id}/>
    </div>
    </>
  );
}
