import React, { useState, useEffect } from 'react';
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
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from '@mui/material';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
// import './StudentPage.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { base_url } from '../constants';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const StudentPage = () => {
  const Navigate = useNavigate();

  const sizes = {
    sm: '4',
    xs: '6'
  }
  const [labList, setLabList] = useState([]);

  const fetchLabs = async (e) => {

    try {
      const response = await axios.get(`${base_url}/test1/labs/`);
      setLabList(response?.data);
      console.log('Response from the backend:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchLabs();
  }, [])



  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', minHeight: '80vh', margin: '10px 0', border: '20px solid #e0e0e0' }}>
        <h1>Welcome Student</h1>

        <h3>Available Labs</h3>
        <Grid container columnSpacing={5} rowSpacing={2}>
          {labList?.map((item, index)=>(

            <Grid item xs={sizes.xs} sm={sizes.sm} key ={item.id}>
              <Card sx={{ maxWidth: 345 }} style={{boxShadow:'2px 2px 3px 1px gray'}} onClick={()=>{Navigate(`/student/lab/${item?.id}`)}}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="160"
                    image="sample.png"
                    alt={item?.name}
                  />
                  <CardContent style={{height:'90px', backgroundColor:'#f5f5f5'}}>
                    <Typography gutterBottom variant="h5" component="div">
                      {item?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate 
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}

          
        </Grid>
        

      </Paper>
    </Container>
  )
}

export default StudentPage