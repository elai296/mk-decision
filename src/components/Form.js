import React from 'react';
import {Container, Grid, FormControl, TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yu\]
'[/
  
  
  ;;;;;
  '


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%'
    },
  },
  form: {
    '&' : {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      padding: theme.spacing(1),
    },
    '& > *' : {
      width: '100%'
    },
    '& .MuiTextField-root' : {
      width: '45%',
      marginTop: theme.spacing(1),
    },
    '& button': {
      marginTop: theme.spacing(1),
    }
  },
}));

export default function Form() {
  const classes = useStyles();
    return (
      <Container maxWidth="lg" className={classes.root}>
          <form className={classes.form}>
            <Grid container xs={10} direction="column" justify="center" alignItems="center">
                  <TextField variant="outlined" label="Name"/>
                  <TextField variant="outlined" label="Email"/>
                  <TextField variant="outlined" label="Subject"/>
                  <TextField variant="outlined" label="Message" multiline rows={6}/>
                  <Button variant="contained" color="primary">Send</Button>
            </Grid>
          </form>
      </Container>
    )
}
