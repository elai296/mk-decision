import React from 'react';
import {Formik, Form, Field } from 'formik'
import * as Yup from 'yup';
import { Box, Button, Grid, TextField, Backdrop, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import * as _ from 'lodash';


const useStyles = makeStyles((theme) => ({
    root: {
      '&': {
        margin: 'auto'
      },
    },
    form: {
      '&' : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '1rem',
        flexDirection: 'column',
        padding: theme.spacing(1),
        backgroundColor: '#eff3fc',
      },
      '& .MuiTextField-root' : {
        width: '90%',
        marginTop: theme.spacing(1),
      },
      '& .MuiOutlinedInput-input, & .MuiOutlinedInput-multiline': {
        background: '#ffffff'
      },
      '& button': {
        marginTop: theme.spacing(1)
      }
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      borderRadius: "1rem",
      outline: 'none',
      padding: theme.spacing(2, 4, 3),
    },
  }));
    
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Must be at least 2 characters')
      .max(15, 'Must be 15 characters or less')
      .required('Required')
      .nullable(),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    subject: Yup.string()
      .min(2, 'Must be at least 2 characters')
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    text: Yup.string()
      .min(2, 'Must be at least 2 characters')
      .max(255, 'Must be 255 characters or less')
      .required('Required'),
  });
  const url = "https://ovfimmdlnj.execute-api.us-west-1.amazonaws.com/default/sendEmail";

  const postFetch = async(url, data) => {
    const setting = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors',
      body: JSON.stringify(data)
    }
    const response = await fetch(url,setting);
    return response;
  }

  const CustomTextInput = ({
    field, 
    form: { touched, errors }, 
      ...props
        }) => (
        <>
            <TextField
                error={_.get(touched, field.name) && _.get(errors, field.name) && true}
                helperText={_.get(touched, field.name) && _.get(errors, field.name)}
                {...field}
                {...props}
            />
        </>
    )
  export default function ContactUs() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    const onSubmit = async (values, { setSubmitting, resetForm }) => {
      handleOpen()
      setTimeout(() => {
        postFetch(url, JSON.stringify(values, null, 2));
        resetForm({});
        setSubmitting(false);
      }, 400);
    }
    return (
            <Grid container className={classes.root} xs={6} justify="center" alignItems="center" direction="column">
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  subject: '',
                  text: '',
                }}
                validationSchema={formSchema}
                onSubmit={onSubmit}
                >
                {({ errors, touched, isValid, dirty, values, handleSubmit,resetForm }) => (
                  <Grid container item xs={12} justify="center" alignItems="center" direction="column" m='auto' >
                    <Box width={"100%"} mt={6} boxShadow={5} >
                    <Form className={classes.form} onSubmit={handleSubmit} boxShadow={2} borderRadius={"1rem"}>
                      <Grid container item xs={12} justify="center" alignItems="center" direction="column">
                        <h1>Contact Us</h1>
                        <Field component={CustomTextInput} label='Name' placeholder="Name" variant="outlined" name="name" />
                        <Field component={CustomTextInput} label='Email' placeholder="Email" variant="outlined" name="email" type="email" />
                        <Field component={CustomTextInput} label='Subject' placeholder="Subject" variant="outlined" name="subject" />
                        <Field component={CustomTextInput} label='Message' placeholder="Message" variant="outlined" name="text" multiline rows={6}/>
                        <Button variant="contained" color="primary" type="submit" disabled={!dirty||!isValid}>Submit</Button>
                      </Grid>
                    </Form>
                    </Box>
                  </Grid>
                )}
              </Formik>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div className={classes.paper}>
                    <h2 id="transition-modal-title">Thank You</h2>
                    <p id="transition-modal-description">We'll be in touch with you shortly.</p>
                  </div>
                </Fade>
              </Modal>
            </Grid> 
    )
}
