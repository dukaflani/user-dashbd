"use client"

// React Imports
import { useState, useEffect } from "react"

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
import { addStreamingLinks, addStreamingLinkItem } from "@/axios/axios"


const AddStreamingLinksCard = () => {
    const accessToken = useSelector((state) => state.auth.token)
    const [streamingService, setStreamingService] = useState(null)
    const [openStreamingLinkItemDialog, setOpenStreamingLinkItemDialog] = useState(false)
    const [showStreamingLinksForm, setShowStreamingLinksForm] = useState(true)
    const [streamingLinksTitle, setStreamingLinksTitle] = useState('')
    const [streamingLinksID, setStreamingLinksID] = useState(null)
    const [streamingServiceLink, setStreamingServiceLink] = useState('')


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


    const { mutate: addNewStreamingLinks } = useMutation(addStreamingLinks, {
        onSuccess: (data, _variables, _context) => {
            console.log("streaming links added success:", data)
            setShowStreamingLinksForm(false)
            setOpenStreamingLinkItemDialog(true)
            setStreamingLinksTitle(data.title)
            setStreamingLinksID(data.id)
        },
        onError: (error, _variables, _context) => {
            console.log("streaming links added error:", error?.response?.data?.detail)
        }
    })

    const { mutate: addNewStreamingLinkItem } = useMutation(addStreamingLinkItem, {
        onSuccess: (data, _variables, _context) => {
            console.log("streaming links item added success:", data)
            setOpenStreamingLinkItemDialog(false)
        },
        onError: (error, _variables, _context) => {
            console.log("streaming links item added error:", error?.response?.data?.detail)
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

   

    const newStreamingLinkItem = {  
        streaming_links: streamingLinksID, 

        streaming_service: streamingService?.value,
        streaming_service_id: streamingService?.id,
        streaming_service_title: streamingService?.label,

        link: streamingServiceLink,
        logo: `https://dukaflani-user-uploads.s3.amazonaws.com/default/${streamingService?.value}.png`, 
    }

    const handleAddStreamingLinkItem = () => {
        // do sumn here
        console.log("new verse:", newStreamingLinkItem)
    }


    const streamingServicesArray = [
        { id:1, title: 'Spotify', value: "Spotify" },
        { id:2, title: 'Amazon Music', value: "Amazon_Music" },
        { id:3, title: 'Google Play', value: "Google_Play" },
        { id:4, title: 'Tik Tok', value: "Tik_Tok" },
        { id:5, title: 'YouTube Music', value: "YouTube_Music" },
        { id:6, title: 'iTunes', value: "iTunes" },
        { id:7, title: 'Pandora', value: "Pandora" },
        { id:8, title: 'Qobuz', value: "Qobuz" },
        { id:9, title: 'Boomplay', value: "Boomplay" },
        { id:10, title: 'Apple Music', value: "Apple_Music" },
        { id:11, title: 'Audiomack', value: "Audiomack" },
        { id:12, title: 'Soundcloud', value: "Soundcloud" },
        { id:13, title: 'Deezer', value: "Deezer" },
        { id:14, title: 'Napster', value: "Napster" },
        { id:15, title: 'Tidal', value: "Tidal" },
    ]

    const streamingServicesOptions = streamingServicesArray?.map((option, index) => ({
        id: option.id,
        label: option.title,
        value: option.value
    }))



    
  return (
    <>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <Box>
                <Card variant="outlined">
                    <CardContent sx={ !showStreamingLinksForm ? { display: 'block' } : { display: 'none' }}>
                        <Stack spacing={2}>
                            <Typography sx={{color: colors.grey[300]}} gutterBottom variant="h6">{streamingLinksTitle}</Typography>
                            <Box>
                                <Button fullWidth onClick={() => setOpenStreamingLinkItemDialog(true)} size="small" variant="contained">Add Link</Button>
                            </Box>
                        </Stack>
                    </CardContent>
                    <CardContent sx={ showStreamingLinksForm ? { display: 'block' } : { display: 'none' }}>
                        <Stack>
                            <Typography sx={{color: colors.grey[300]}} gutterBottom variant="h6">New Streaming Links Form</Typography>
                            <Box>
                                    <Box>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Stack>
                                                    <Typography variant="subtitle2">Streaming Links Information:</Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} item>
                                                <MyTextField
                                                    required
                                                    name="title" 
                                                    label="Streaming Links Title"
                                                    helperText={formik.errors.title && formik.touched.title ? formik.errors.title : null} 
                                                    error={formik.errors.title && formik.touched.title ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("title")}
                                                />
                                            </Grid>
                                            <Grid xs={12} sx={{paddingTop: 3}} item >
                                                <Button  fullWidth variant="contained" size="small" type="submit">Create Streaming Links</Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </form>

            {/* Add Streaming Links Item Dialogue */}
        <Dialog
            open={openStreamingLinkItemDialog}
            onClose={() => setOpenStreamingLinkItemDialog(false)} 
            aria-labelledby="alert-dialog-title"    
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Add a streaming link"}
            </DialogTitle>
            <DialogContent>
                <Box sx={{display: 'flex', justifyContent: "center", alignItems: "center", padding: 2}}>
                    <Grid container spacing={2}>
                        <Grid xs={12} md={6} item>
                                <Stack spacing={2}>
                                    <Autocomplete
                                        options={streamingServicesOptions} 
                                        value={streamingService}
                                        size="small"
                                        onChange={(event, newValue) => setStreamingService(newValue)}
                                        getOptionLabel={ (option) => option.label}
                                        renderOption={(props, option) => {
                                            return (
                                                <li {...props} key={option.id}>
                                                {option.label}
                                                </li>
                                            );
                                            }}
                                            renderTags={(tagValue, getTagProps) => {
                                            return tagValue.map((option, index) => (
                                                <Chip {...getTagProps({ index })} key={index} label={option} />
                                            ))
                                            }}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        renderInput={(params) => <TextField {...params} label="Streaming Service" />}
                                    />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Streaming Link"
                                    {...textFieldConfig}  
                                    value={streamingServiceLink} 
                                    onChange={(e) => setStreamingServiceLink(e.target.value)}
                                />  
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleAddStreamingLinkItem}>Add Link</Button>
            <Button color="error" onClick={() => setOpenStreamingLinkItemDialog(false)}>Cancel</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}

export default AddStreamingLinksCard