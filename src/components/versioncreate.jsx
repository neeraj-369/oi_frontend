import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import DropFileInput from './Drop-box/DropFileInput';
// import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

export default function VersionCreate() {
    const { applicationname } = useParams();

    const [nameValue, setNameValue] = useState(applicationname);
    const [registryValue, setRegistryValue] = useState("");
    const onChangeRegistry = (event) => setRegistryValue(event.target.value);

    const CreateAppfun = (event) => {
        event.preventDefault();
        console.log("Name: " + nameValue);
        console.log("Registry: " + registryValue);
        const newApp = {
            name: nameValue,
            registry: registryValue,
        }
        axios.post('https://backend.cyclic.cloud/appversion/createversion', newApp)
            .then((response) => {
                console.log(response);
                alert('Created New Version named : ' + response.data.message);
                
                // const history = useHistory();
                // Navigate to the "/applications" page
                // history.push('/applications');
            })
            .catch((error) => {
                console.log(error);
                alert('Failed to Create Version: Something went wrong.'+ error);
                }
            );
    }

    const onFileChange = (files) => {
        console.log(files);
    }

    return (
        <>
            <CssBaseline />
            <Container id="AppCreateContainer">
            <h2 style={{display: "flex", justifyContent: "center"}}>Create new Version for Application : {nameValue}</h2>
                <Box id="AppCreateTextInput">
                    <Grid>
                        <p style={{ width: "50px" }}>Name:</p>
                        <TextField disabled id="outlined-disabled" value={nameValue}  style={{ paddingTop: "5px", paddingLeft: '10px', }} />
                    </Grid>
                    <Grid>
                        <p>Registry:</p>
                        <TextField variant='outlined' value={registryValue} onChange={onChangeRegistry} style={{ paddingTop: "5px", paddingBottom: "5px", paddingLeft: '10px', }} />
                    </Grid>
                    <Button variant='contained' onClick={CreateAppfun} >
                        Submit
                    </Button>
                </Box>
                <h2 style={{display: "flex", justifyContent: "center"}}>Dropdown</h2>
                <Box id="AppCreateDropBox">
                    <DropFileInput onFileChange={(files) => onFileChange(files)} />
                    <Button variant='contained' onClick={CreateAppfun} >
                        Submit
                    </Button>
                </Box>
        </Container >

        </>
    );
}