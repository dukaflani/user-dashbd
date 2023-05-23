"use client"

// React Imports
import { useState } from "react"

// MUI Imports
import { Box, Button, Card, CardContent, Grid, 
    Stack, TextField, Typography, colors, Autocomplete } from "@mui/material"

// NPM Imports
import { useSelector } from "react-redux"
import {  useFormik } from "formik"
import * as Yup from 'yup'

// Tanstack Query
import { useMutation } from "@tanstack/react-query"

// Project Imports
import MyTextField from "./formComponents/MyTextField"
import { addSkizaTunes, addSkizaTuneItem } from "@/axios/axios"


const AddSkizaTunesCard = () => {
    const accessToken = useSelector((state) => state.auth.token)
    const [skizaTuneCountry, setSkizaTuneCountry] = useState(null)
    const [openSkizaTuneItemDialog, setOpenSkizaTuneItemDialog] = useState(false)
    const [showSkizaTunesForm, setShowSkizaTunesForm] = useState(true)
    const [skizaTunesTitle, setSkizaTunesTitle] = useState('')
    const [skizaTuneID, setSkizaTuneID] = useState(null)
    const [skizaTuneCarrier, setSkizaTuneCarrier] = useState('')
    const [skizaTuneCode, setSkizaTuneCode] = useState(null)
    const [skizaTuneSMS, setSkizaTuneSMS] = useState(null)
    const [skizaTuneUSSD, setSkizaTuneUSSD] = useState(null)


    const textFieldConfig = {
        fullWidth: true,
        variant: 'outlined',
        size: "small",
      }

    const textAreaConfig = {
        fullWidth: true,
        variant: 'outlined',
      }

    const FILE_SIZE = 1000 * 1024;
    const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/png"
    ];


    const { mutate: addNewSkizaTune } = useMutation(addSkizaTunes, {
        onSuccess: (data, _variables, _context) => {
            console.log("skiza tune added success:", data)
            setShowSkizaTunesForm(false)
            setOpenSkizaTuneItemDialog(true)
            setSkizaTunesTitle(data.title)
            setSkizaTuneID(data.id)
        },
        onError: (error, _variables, _context) => {
            console.log("skiza tune added error:", error?.response?.data?.detail)
        }
    })

    const { mutate: addNewSkizaTuneItem } = useMutation(addSkizaTuneItem, {
        onSuccess: (data, _variables, _context) => {
            console.log("skiza tune item added success:", data)
            setOpenSkizaTuneItemDialog(false)
        },
        onError: (error, _variables, _context) => {
            console.log("skiza tune item added error:", error?.response?.data?.detail)
        }
    })


    const formik = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Required"),
        }),
        onSubmit: () => {
            console.log("handle edit submit from formik:", {
                accessToken,
                title: formik.values?.title,
            })
        }
    })
    
    const newSkizaTuneItem = {  
        skiza_tune: skizaTuneID, 
        country: skizaTuneCountry,
        carrier: skizaTuneCarrier,
        code: skizaTuneCode, 
        sms: skizaTuneSMS,
        ussd: skizaTuneUSSD, 
    }

    const handleAddSkizaTuneItem = () => {
        // do sumn here
        console.log("new skiza tune:", newSkizaTuneItem)
    }

    
  return (
    <>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <Box>
                <Card variant="outlined">
                    <CardContent sx={ !showSkizaTunesForm ? { display: 'block' } : { display: 'none' }}>
                        <Stack spacing={2}>
                            <Typography sx={{color: colors.grey[300]}} gutterBottom variant="h6">{skizaTunesTitle}</Typography>
                            <Box>
                                <Button fullWidth onClick={() => setOpenSkizaTuneItemDialog(true)} size="small" variant="contained">Add Link</Button>
                            </Box>
                        </Stack>
                    </CardContent>
                    <CardContent sx={ showSkizaTunesForm ? { display: 'block' } : { display: 'none' }}>
                        <Stack>
                            <Typography sx={{color: colors.grey[300]}} gutterBottom variant="h6">New Skiza Tunes Form</Typography>
                            <Box>
                                    <Box>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Stack>
                                                    <Typography variant="subtitle2">Skiza Tunes Information:</Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} item>
                                                <MyTextField
                                                    required
                                                    name="title" 
                                                    label="Skiza Tunes Title"
                                                    helperText={formik.errors.title && formik.touched.title ? formik.errors.title : null} 
                                                    error={formik.errors.title && formik.touched.title ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("title")}
                                                />
                                            </Grid>
                                            <Grid xs={12} sx={{paddingTop: 3}} item >
                                                <Button  fullWidth variant="contained" size="small" type="submit">Create Skiza Tunes</Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </form>

            {/* Add Skiza Tunes Item Dialogue */}
        <Dialog
            open={openSkizaTuneItemDialog}
            onClose={() => setOpenSkizaTuneItemDialog(false)} 
            aria-labelledby="alert-dialog-title"    
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Add a skiza tune"}
            </DialogTitle>
            <DialogContent>
                <Box sx={{display: 'flex', justifyContent: "center", alignItems: "center", padding: 2}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Country"
                                    {...textFieldConfig}  
                                    value={skizaTuneCountry} 
                                    onChange={(e) => setSkizaTuneCountry(e.target.value)}
                                />  
                        </Grid>
                        <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Carrier Name"
                                    {...textFieldConfig}  
                                    value={skizaTuneCarrier} 
                                    onChange={(e) => setSkizaTuneCarrier(e.target.value)}
                                />  
                        </Grid>
                        <Grid item xs={12}>
                                <TextField  
                                    label="Skiza Tune Code"
                                    {...textFieldConfig}  
                                    value={skizaTuneCode} 
                                    onChange={(e) => setSkizaTuneCode(e.target.value)}
                                />  
                        </Grid>
                        <Grid item xs={12}>
                                <TextField  
                                    label="Skiza Tune SMS"
                                    {...textFieldConfig}  
                                    value={skizaTuneSMS} 
                                    onChange={(e) => setSkizaTuneSMS(e.target.value)}
                                />  
                        </Grid>
                        <Grid item xs={12}>
                                <TextField  
                                    label="Skiza Tune USSD"
                                    {...textFieldConfig}  
                                    value={skizaTuneUSSD} 
                                    onChange={(e) => setSkizaTuneUSSD(e.target.value)}
                                />  
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleAddSkizaTuneItem}>Add Skiza Tune</Button>
            <Button color="error" onClick={() => setOpenSkizaTuneItemDialog(false)}>Cancel</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}

export default AddSkizaTunesCard