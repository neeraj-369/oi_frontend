import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid component
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function NameDetailPage() {
  const { name } = useParams();
  const [deployments, setDeployments] = useState([]);
  const [appname,setAppname] = useState("");
  const [specd,setSpecd] = useState("");
  useEffect(() => {
    setAppname(name);
    axios.get(`https://backend.cyclic.cloud/version/deployments/${name}`)
      .then((response) => {
        setDeployments(response.data.deployments);
        setAppname(name);
      })
      .catch((error) => {
        console.error('Error at the instances frontend:', error);
        // Handle error if needed
      });
  }, []);

  const handleDeleteClick = (id, deploymentk) => {
    
    setSpecd(deploymentk);
    axios
      .delete(`https://backend.cyclic.cloud/version/deleted/`, {
        data: { deploymentk , appname}
      })
      .then((response) => {
        // Update deployments state by removing the deleted deployment
        axios.get(`https://backend.cyclic.cloud/version/deployments/${name}`)
        .then((response) => {
        setDeployments(response.data.deployments);
      })
      .catch((error) => {
        console.error('Error at the instances frontend:', error);
        // Handle error if needed
      });
  
        alert('Deployment Instance deleted : "' + deploymentk );
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to delete the entry.', error);
      });
  };
  


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'deployment', headerName: 'Deployment', width: 200 },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 200,
      renderCell: (params) => (
        <Button variant="outlined" onClick={() => handleDeleteClick(params.row._id,params.row.deployment)}>
          Delete
        </Button>
      ),
    },
    // Add more columns as needed
  ];

  const rowss = deployments.map((deployment, index) => ({
    id: index,
    deployment: deployment,
  }));

  return (
    <div id="nameDetail">
      <h1>Application : {name}</h1>
      <Stack direction="row" spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField variant='outlined' label='Search' />
          </Grid>
          <Grid item xs={4}>
          </Grid>
        </Grid>
      </Stack>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows = {rowss} columns={columns} pageSize={5} />
      </div>
      {/* Additional content related to the name detail page */}
    </div>
  );
}
