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


const LabPage = () => {
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

    useEffect(() => {
        fetchLabs();
    }, [])

    return (
        <Container>
            <Paper elevation={3} style={{ padding: '20px', minHeight: '80vh', margin: '10px 0', border: '20px solid #e0e0e0' }}>
                <div style={{minHeight: '80vh',display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                    <div>
                        <h1>Lab Name: {labDetails?.name}</h1>

                        <h3>Lab Description</h3>
                        { labDetails?.description ?
                          <div id='desc'>
                            {/* {mdParser.render(labDetails?.description)} */}
                          </div>
                          :
                          <Typography variant="body2" color="text.secondary">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
                            a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
                            of Lorem Ipsum. <br></br>
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
                            literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
                            College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
                            and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum
                            comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                            written in 45 BC. This book is a treatise on the theory of ethics, very popular
                        </Typography>
                        
                      }
                    </div>

                    <div style={{textAlign:'center'}}>
                        <Button variant='contained' color='success'> Attempt Lab </Button>
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

export default LabPage;
