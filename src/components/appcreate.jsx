import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';




import axios from 'axios';
import AWS from 'aws-sdk';
import DropFileInput from './Drop-box/DropFileInput';
// import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};



export default function AppCreate() {
    // Create state to store file

    const [isLinkUpload, setIsLinkUpload] = useState(true);
    const [file, setFile] = useState(null);
    // const [per, setPer] = useState(0);
    const [progress, setProgress] = React.useState(0);
    const [validFile, setValidFile] = useState(true);
    // React.useEffect(() => {
    //     const timer = setInterval(() => {
    //         setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    //     }, 800);
    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, []);

    // Function to upload file to s3

    const starterFunction = ()  => {
        const nameofApp = {
            name: nameValue,
        }
        if(nameValue == "")
        {
            alert("Please Enter the Application Name");
            return ;        
        }
        axios.post('https://backend.cyclic.cloud/test/checkename', nameofApp)
            .then((response) => {
                console.log(response);
                // alert('Given name is valid application name, uploading to AWS S3 ' + response.data.message);
                
                uploadFile();
                console.log("Here in console name checker 1",validFile);
                
                // const history = useHistory();
                // Navigate to the "/applications" page
                // history.push('/applications');
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    alert('Application name already Exists, File upload to S3 has been stopped !');
                    
                    console.log("Here in console name checker 2",validFile);
                } else {
                    // alert('Some Error Occured while connecting to the AWS S3,please check your Connections!');
                    // if(error.response.status === 403)
                    // {
                    //     alert("Enter the Application Name Fucker");
                    //     return 
                    // }
                    console.log("Here in console name checker 3",validFile);
                }
            });
    }

    const uploadFile = async () => {
        // S3 Bucket Name
        
        
            console.log("came to upload file submit");
            const S3_BUCKET = "letsfindsolutions-fileupload2";

        // S3 Region
            const REGION = "ap-south-1";

        // S3 Credentials
            AWS.config.update({
            accessKeyId: "AKIAVDWPRTUWE2NE25UQ",
            secretAccessKey: "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",
            });
            const s3 = new AWS.S3({
            params: { Bucket: S3_BUCKET },
            region: REGION,
            });

        // Files Parameters

            const params = {
                Bucket: S3_BUCKET,
                Key: file.name,
                Body: file,
            };

        // Uploading file to s3


            var upload = s3
            .putObject(params)
            .on("httpUploadProgress", (evt) => {
                // File uploading progress
                console.log(
                    "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
                );
                setProgress(((evt.loaded * 100) / evt.total));
            })
            .promise();

        await upload.then((err, data) => {
            console.log(err);
            // Fille successfully uploaded
            console.log("came to createappfun1");
            CreateAppfun1();
            alert("File uploaded successfully.");
        });  

        
    };
    // Function to handle file and store it to file state
    const handleFileChange = (e) => {
        // Uploaded file
        console.log("came here at file change");
        const file = e[0];
        // Changing file state
        setFile(file);
        console.log(file);
    };


    async function checkDockerRepoExists(username, repository, tag) {
        const url = `https://hub.docker.com/v2/repositories/${username}/${repository}/tags/${tag}`;
        try {
            const response = await axios.get(url);
            return response.status === 200;
        } catch (error) {
            return response.status === 404;
        }
    }

    function checkregistry(registry) {
        var username = ""
        var repository = ""
        var tag = ""

        try {
            const parts = registry.split('/');
            
            if (parts.length !== 2) {
                return false;
            throw new Error('Invalid registry format. It should contain one "/" separator.');

            }
            
            username = parts[0];
            const repositoryWithTag = parts[1].split(':');
            
            if (repositoryWithTag.length !== 2) {
                return false;
                throw new Error('Invalid registry format. It should contain one ":" separator.');

            }
            repository = repositoryWithTag[0];
            tag = repositoryWithTag[1];
            
            console.log(`Username: ${username}`);
            console.log(`Repository: ${repository}`);
            console.log(`Tag: ${tag}`);
            (async () => {
                if (await checkDockerRepoExists(username, repository, tag)) {
                    return true;
                } else {
                    return false;
                }
            })();
        } catch (error) {
            return false;
            console.error(error.message);
        }
    }
    


    const [nameValue, setNameValue] = useState("");
    const [registryValue, setRegistryValue] = useState("");
    const onChangeName = (event) => setNameValue(event.target.value);
    const onChangeRegistry = (event) => setRegistryValue(event.target.value);

    const CreateAppfun = (event) => {
        event.preventDefault();
        console.log("Name: " + nameValue);
        console.log("Registry: " + registryValue);
        const newApp = {
            name: nameValue,
            registry: registryValue,
        }
        const check = checkregistry(registryValue);
        if(check == false){
            alert("Registry doesn't exist!");
            return;
        }
        axios.post('https://backend.cyclic.cloud/test/create', newApp)
            .then((response) => {
                console.log(response);
                alert('Created New Application named : ' + response.data.message);

                // const history = useHistory();
                // Navigate to the "/applications" page
                // history.push('/applications');
            })
            .catch((error) => {
                console.log(error);
                if (error.response && error.response.status === 400) {
                    alert('Application name already Existed, please change!');
                } else {
                    alert('Some Error Occured while connecting to the Backend Server,please check your Connections!');
                }
            });
    }

    const CreateAppfun1 = () => {
        console.log("Name: " + nameValue);
        console.log("Registry: " + "kanikonoregistry");
        let filei = file.name;
        filei = filei.replace(/\..+$/, '');
        const newApp = {
            name: nameValue,
            registry: "kanikonoregistry",
            filename: filei,
        }
        console.log("Raj calling fun1 with kaniko registry");
        axios.post('https://backend.cyclic.cloud/test/create', newApp)
            .then((response) => {
                console.log(response);
                alert('Created New Application named : ' + response.data.message);
                // const history = useHistory();
                // Navigate to the "/applications" page
                // history.push('/applications');
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    alert('Application name already Existed, please change!');
                } else {
                    alert('Some Error Occured while connecting to the Backend Server,please check your Connections!');
                }
            });
    }

    return (


        <>
            <CssBaseline />
            <Container id="AppCreateContainer">
                <Box>
                <div id="toggleContainer" style={{ display: 'flex', justifyContent: 'center' , marginBottom: '10%' }}>
                    <Button variant={isLinkUpload ? 'contained' : 'outlined'} onClick={() => setIsLinkUpload(true)}>Link Upload</Button>
                    <Button variant={!isLinkUpload ? 'contained' : 'outlined'} onClick={() => setIsLinkUpload(false)}>File Upload</Button>
                </div>
                </Box>
                {isLinkUpload ? (
                <Box id="AppCreateTextInput">
                    <Grid>
                        <p style={{ width: "50px" }}>Name:</p>
                        <TextField variant='outlined' value={nameValue} onChange={onChangeName} style={{ paddingTop: "5px", paddingLeft: '20px', }} />
                    </Grid>
                    <Grid>
                        <p>Registry:</p>
                        <TextField variant='outlined' value={registryValue} onChange={onChangeRegistry} style={{ paddingTop: "5px", paddingBottom: "30px", paddingLeft: '8px', }} />
                    </Grid>
                    <Button variant='contained' onClick={CreateAppfun} style={{ }}>
                        Submit
                    </Button>
                </Box>
                ) : (
                <Box id="AppCreateDropInput">
                    <Grid>
                        <p style={{ width: "50px" }}>Name:</p>
                        <TextField variant='outlined' value={nameValue} onChange={onChangeName} style={{ paddingTop: "5px", paddingLeft: '10px', }} />
                    </Grid>
                    <br></br>
                    

                    <Box id="AppCreateDropBox">
                        <DropFileInput onFileChange={(files) => handleFileChange(files)} />
                        <br></br>
                        <Box sx={{ width: '80%' }}>
                            <LinearProgressWithLabel value={progress} />
                        </Box>
                        <br></br>
                        <Button variant='contained' onClick={starterFunction}  >
                        {/* {isLoading ? (
                            <>
                                <img src="loading.gif" alt="Loading" /> Loading... ({progress}%)
                            </>
                            ) : ( */}
                        'Submit'
                        {/* )} */}
                        {/* Submit */}
                        </Button>
                    </Box>
                </Box>
                )}

            </Container >

        </>
    );
}

