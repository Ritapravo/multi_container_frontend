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
import { Link, useNavigate, useParams } from 'react-router-dom';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import MarkdownIt from 'markdown-it';
import { base_url } from '../constants';
import swal from 'sweetalert';


const AttemptPage = () => {
    const Navigate = useNavigate();
    const params = useParams();
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    const sizes = {
        sm: '4',
        xs: '6'
    }
    const [labDetails, setLabDetails] = useState(null);

    const fetchLabs = async (e) => {

        try {
            const response = await axios.get(`${base_url}/test1/labs/${params.labId}`);
            setLabDetails(response?.data);
            document.getElementById('desc').innerHTML=mdParser.render(response?.data?.description);
            console.log('Response from the backend:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const attemptLab = async (e) => {

      try {
        const response = await axios.get(`${base_url}/test1/attemptLab/${params.labId}`);
        console.log('Response from the backend:', response.data);
        swal({
          title: 'Lab Started',
          text: 'Attempt your lab',
          icon: 'success',
        });
      } catch (error) {
        console.error('Error:', error);
        swal({
          title: 'ERROR',
          text: 'Some error occured!!',
          icon: 'error',
        });
      }
    };

    useEffect(() => {
        fetchLabs();
    }, [])

    return (
        <Container>
            <Paper elevation={3} style={{ padding: '20px', minHeight: '80vh', margin: '10px 0', border: '20px solid #e0e0e0' }}>
                <div style={{minHeight: '80vh',display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                    <div>
                        <h1>Lab Name: {labDetails?.name}</h1>

                        
                        
                      
                    </div>

                    <div style={{textAlign:'center'}}>
                        <Button onClick={()=>attemptLab()} variant='contained' color='success'> Evaluate Lab </Button>
                    </div>

                    {/* {labList?.map((item, index)=>(

            <Grid item xs={sizes.xs} sm={sizes.sm}>
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
          ))} */}


                </div>


            </Paper>
        </Container>
    )
}

export default AttemptPage;