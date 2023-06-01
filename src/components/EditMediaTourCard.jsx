"use client"

// React Imports
import { useState, forwardRef } from "react"

// MUI Imports
import { Autocomplete, Box, Button, Card, CardContent, Grid, CircularProgress,
    Stack, TextField, Typography, colors, Chip } from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// NPM Imports
import { useSelector } from "react-redux"
import {  useFormik } from "formik"
import * as Yup from 'yup'
import slugify from 'slugify'

// Tanstack Query
import { useMutation, useQueryClient } from "@tanstack/react-query"

// Project Imports
import MyTextField from "./formComponents/MyTextField"
import { editMediaTour } from "@/axios/axios"

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const EditMediaTourCard = ({ editMediaTourObject, setOpenEditMediaTourDialogue }) => {
    const accessToken = useSelector((state) => state.auth.token)

    const [nanoID, setNanoID] = useState(editMediaTourObject?.url_id)
    const [mediumType, setMediumType] = useState({ 
        id: editMediaTourObject?.station_type_id, 
        label: editMediaTourObject?.station_type_title,  
        value: editMediaTourObject?.station_type, 
    })
    const [mediaTourDate, setMediaTourDate] = useState(editMediaTourObject?.date)
    const [mediaTourStartTime, setMediaTourStartTime] = useState(editMediaTourObject?.from_time)
    const [mediaTourEndTime, setMediaTourEndTime] = useState(editMediaTourObject?.to_time)
    const [openMuiSnackbar, setOpenMuiSnackbar] = useState(false)

    

    const handleCloseMuiSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenMuiSnackbar(false);
      };


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


    const queryClient = useQueryClient()
    const { mutate: editMyMediaTour, isLoading: editMediatourLoading } = useMutation(editMediaTour, {
        onSuccess: (data, _variables, _context) => {
            queryClient.invalidateQueries('current-user-media-tours')
            setOpenEditMediaTourDialogue(false)
            setOpenMuiSnackbar(true)
        },
        onError: (error, _variables, _context) => {
            console.log("media tour edited error:", error?.response?.data?.detail)
        }
    })


    const formik = useFormik({
        initialValues: {
            title: editMediaTourObject?.title,
            country: editMediaTourObject?.country,
            station_name: editMediaTourObject?.station_name,
            show_host: editMediaTourObject?.show_host,
            show_title: editMediaTourObject?.show_title,
            poster: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Required"),
            country: Yup.string().required("Required"),
            station_name: Yup.string().required("Required"),
            show_host: Yup.string().required("Required"),
            show_title: Yup.number().integer().typeError("Please enter a valid price"),
            date: Yup.string().required("Required"),
            from_time: Yup.string(),
            to_time: Yup.string(),
            poster: Yup
                .mixed(),
                // .test(
                //     "fileSize",
                //     "Should not be more than 1MB",
                //     value => value && value.size <= FILE_SIZE
                // )
                // .test(
                //     "fileFormat",
                //     "Unsupported Format! Use png, jpg or jpeg",
                //     value => value && SUPPORTED_FORMATS.includes(value.type)
                // ),
        }),
        onSubmit: () => {
            editMyMediaTour({
                accessToken,
                title: formik.values?.title,
                country: formik.values?.country,
                station_name: formik.values?.station_name,
                show_host: formik.values?.show_host,
                show_title: formik.values?.show_title,
                poster: formik.values?.poster,

                date: format(new Date(mediaTourDate), "yyyy-MM-dd"),
                from_time: formatISO9075(new Date(mediaTourStartTime), { representation: 'time' }),
                to_time: formatISO9075(new Date(mediaTourEndTime), { representation: 'time' }),

                station_type: mediumType?.value,
                station_type_id: mediumType?.id, 
                station_type_title: mediumType?.label,
                
                url_id: nanoID,
                slug: slugify(formik.values?.title, {lower: true}),
                customuserprofile: editMediaTourObject?.customuserprofile
            })
        }
    })  


    const mediumArray = [
        { id:1, title: 'Radio', value: "Radio Station" },
        { id:2, title: 'T.V', value: "TV Station" },
        { id:3, title: 'Podcast (YouTube)', value: "YouTube Live" },
    ]

    const mediumOptions = mediumArray?.map((option, index) => ({
        id: option.id,
        label: option.title,
        value: option.value
    }))


    
  return (
    <>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <Box>
                <Card variant="outlined">
                    <CardContent>
                        <Stack>
                            <Typography sx={{color: colors.grey[300]}} gutterBottom variant="h6">New Media Tour Form</Typography>
                            <Box>
                                    <Box>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Stack>
                                                    <Typography variant="subtitle2">Media Tour Information:</Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} item>
                                                <MyTextField
                                                    required
                                                    name="title" 
                                                    label="Media Tour Title"
                                                    helperText={formik.errors.title && formik.touched.title ? formik.errors.title : null} 
                                                    error={formik.errors.title && formik.touched.title ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("title")}
                                                />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <MyTextField
                                                    required
                                                    name="country" 
                                                    label="Country"
                                                    helperText={formik.errors.country && formik.touched.country ? formik.errors.country : null} 
                                                    error={formik.errors.country && formik.touched.country ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("country")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <MyTextField
                                                    required
                                                    name="station_name" 
                                                    label="Station Name"
                                                    helperText={formik.errors.station_name && formik.touched.station_name ? formik.errors.station_name : null} 
                                                    error={formik.errors.station_name && formik.touched.station_name ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("station_name")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <Stack spacing={2}>
                                                    <Autocomplete
                                                        options={mediumOptions} 
                                                        value={mediumType}
                                                        size="small"
                                                        onChange={(event, newValue) => setMediumType(newValue)}
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
                                                        renderInput={(params) => <TextField {...params} label="Medium" />}
                                                    />
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <MyTextField
                                                    required
                                                    name="show_title" 
                                                    label="Show Title"
                                                    helperText={formik.errors.show_title && formik.touched.show_title ? formik.errors.show_title : null} 
                                                    error={formik.errors.show_title && formik.touched.show_title ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("show_title")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <MyTextField
                                                    required
                                                    name="show_host" 
                                                    label="Show Host"
                                                    helperText={formik.errors.show_host && formik.touched.show_host ? formik.errors.show_host : null} 
                                                    error={formik.errors.show_host && formik.touched.show_host ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("show_host")}
                                                />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <DatePicker 
                                                    label="Media Tour Date" 
                                                    value={mediaTourDate} 
                                                    onChange={(newValue) => setMediaTourDate(newValue)} 
                                                    />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <TimePicker
                                                    label="Interview Start Time"
                                                    value={mediaTourStartTime}
                                                    onChange={(newValue) => setMediaTourStartTime(newValue)}
                                                    />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <TimePicker
                                                    label="Interview End Time"
                                                    value={mediaTourEndTime}
                                                    onChange={(newValue) => setMediaTourEndTime(newValue)}
                                                    />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <Stack spacing={1}>
                                                    <Typography variant="subtitle1">Media Tour Poster:</Typography>
                                                    <input
                                                        type="file"
                                                        name="poster"
                                                        onChange={(e) => formik.setFieldValue("poster", e.target.files[0])}
                                                    />
                                                    {formik.errors.poster && formik.touched.poster ? (
                                                    <Typography sx={{color: 'red'}} variant="caption">{formik.errors.poster}</Typography>
                                                ) : null}
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} sx={{paddingTop: 3}} item > 
                                                <Button  fullWidth variant="contained" size="small" type="submit" startIcon={editMediatourLoading && <CircularProgress color="inherit" size={25} />}>{editMediatourLoading ? "Adding Media Tour..." : "Add Media Tour"}</Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </form>

        {/* Mui Success Snackbar */} 
        <Snackbar 
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
            open={openMuiSnackbar} autoHideDuration={6000} 
            onClose={handleCloseMuiSnackbar}
            >
            <Alert onClose={handleCloseMuiSnackbar} severity="success" sx={{ width: '100%' }}>
                Media Tour Edited Successfully!
            </Alert>
        </Snackbar>
    </>
  )
}

export default EditMediaTourCard