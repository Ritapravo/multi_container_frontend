import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Grid,
} from '@mui/material';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import './InstructorPage.css';
import axios from 'axios';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { base_url } from '../constants';
import Editor from '../MdEditor';
import { Description } from '@mui/icons-material';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const InstructorPage = () => {
  const [labName, setLabName] = useState('');
  const [labDescription, setLabDescription] = useState('');
  const [dockerComposeFile, setDockerComposeFile] = useState([]);
  const [mountFiles, setMountFiles] = useState([]);
  const [graderFiles, setGraderFiles] = useState(null);
  const [graderConfigFile, setGraderConfigFile] = useState(null);

  const sizes = {
    sm : '6',
    xs : '12'
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('lab', labName);
    formData.append('labDescription', labDescription);
    if (dockerComposeFile) {
      formData.append('dockerCompose', dockerComposeFile[0]?.file);
      console.log("INSIDE==",dockerComposeFile[0]?.file);
    }


    if (mountFiles.length > 0) {
      mountFiles.forEach((file) => {
        formData.append('mounts', file?.file);
      });
    }

    if (graderFiles) {
      formData.append('graderMount', graderFiles[0]?.file);
    }

    if (graderConfigFile) {
      formData.append('configFile', graderConfigFile[0]?.file);
    }
    console.log("formdata==",formData);
    try {
      const response = await axios.post(`${base_url}/test1/createLab/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response from the backend as needed
      console.log('Response from the backend:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: '20px', margin: '10px 0', border: '20px solid #c2c0c0' }}>
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
          Create New Lab
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Lab Name"
            fullWidth
            variant="outlined"
            margin="normal"
            value={labName}
            onChange={(e) => setLabName(e.target.value)}
            className="form-group"
          />
          <Typography variant="h6" gutterBottom>
            Lab Description
          </Typography>
          <Editor field={labDescription} setField={setLabDescription}/>
          
          <Grid container columnSpacing={5} rowSpacing={2}>
            <Grid item xs={sizes.xs} sm={sizes.sm}>
              <div style={{ margin: '10px 0' }}>
                <Typography variant="h6" gutterBottom>
                  Docker Compose File
                </Typography>


                <FilePond
                  allowMultiple={false}
                  files={dockerComposeFile}
                  onupdatefiles={setDockerComposeFile}
                  name="files"
                />

              </div>
            </Grid>
            <Grid item xs={sizes.xs} sm={sizes.sm}>

              <div style={{ margin: '10px 0' }}>
                <Typography variant="h6" gutterBottom>
                  Grader Config File
                </Typography>


                <FilePond
                  allowMultiple={false}
                  files={graderConfigFile}
                  onupdatefiles={setGraderConfigFile}
                  name="files"
                />

              </div>
            </Grid>


            <Grid item xs={sizes.xs} sm={sizes.sm}>

              <div style={{ margin: '10px 0' }}>
                <Typography variant="h6" gutterBottom>
                  Grader Files
                </Typography>


                <FilePond
                  allowMultiple={false}
                  files={graderFiles}
                  onupdatefiles={setGraderFiles}
                  name="files"
                />

              </div>
            </Grid>
            {/* Mounts field allowing multiple file uploads */}
            <Grid item xs={sizes.xs} sm={sizes.sm}>

              <div style={{ margin: '10px 0' }}>
                <Typography variant="h6" gutterBottom>
                  Mounts
                </Typography>

                <FilePond
                  allowMultiple={true} // Allow multiple file uploads
                  files={mountFiles}
                  onupdatefiles={setMountFiles}
                />
              </div>
              {/* Similar sections for other file inputs */}
            </Grid>
          </Grid>
          <div style={{ textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              // onClick={(e) => {
              //   handleSubmit(e);
              // }}
            >
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  )
}

export default InstructorPage