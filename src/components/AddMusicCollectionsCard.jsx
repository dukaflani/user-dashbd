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
import slugify from 'slugify'
import { nanoid } from 'nanoid'

// Tanstack Query
import { useMutation, useQuery } from "@tanstack/react-query"

// Project Imports
import MyTextField from "./formComponents/MyTextField"
import MyTextArea from "./formComponents/MyTextArea"
import { addMusicCollection, addMusicCollectionItem, getUserVideos } from "@/axios/axios"


const AddMusicCollectionsCard = () => {
    const accessToken = useSelector((state) => state.auth.token)
    const currentUser = useSelector((state) => state.auth.userInfo)
    const [nanoID, setNanoID] = useState("")
    const [musicCollectionItemVideoID, setMusicCollectionItemVideoID] = useState(null)
    const [featuredArtistList, setFeaturedArtistList] = useState("")
    const [openMusicCollectionDialog, setOpenMusicCollectionDialog] = useState(false)
    const [showMusicCollectionForm, setShowMusicCollectionForm] = useState(true)
    const [musicCollectionTitle, setMusicCollectionTitle] = useState('')
    const [albumID, setAlbumID] = useState(null)
    const [musicCollectionType, setMusicCollectionType] = useState(null)
    const [musicCollectionItemTitle, setMusicCollectionItemTitle] = useState('')
    const [albumStreamingOption, setAlbumStreamingOption] = useState(null)

    useEffect(() => {  
        setNanoID(nanoid(16))
    }, [])


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


    const { mutate: addNewMusicCollection } = useMutation(addMusicCollection, {
        onSuccess: (data, _variables, _context) => {
            console.log("music collection added success:", data)
            setShowMusicCollectionForm(false)
            setOpenMusicCollectionDialog(true)
            setMusicCollectionTitle(data.title)
            setAlbumID(data.id)
        },
        onError: (error, _variables, _context) => {
            console.log("music collection added error:", error?.response?.data?.detail)
        }
    })

    const { mutate: addNewMusicCollectionItem } = useMutation(addMusicCollectionItem, {
        onSuccess: (data, _variables, _context) => {
            console.log("music collection item added success:", data)
            setOpenMusicCollectionDialog(false)
        },
        onError: (error, _variables, _context) => {
            console.log("music collection item added error:", error?.response?.data?.detail)
        }
    })


    const formik = useFormik({
        initialValues: {
            title: '',
            cover: '',
            link: '',
            link_title: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Required"),
            link: Yup.string().required("Required"),
            link_title: Yup.string().required("Required"),
            cover:  Yup
            .mixed()
            .test(
                "fileSize",
                "Should not be more than 1MB",
                value => value && value.size <= FILE_SIZE
            )
            .test(
                "fileFormat",
                "Unsupported Format! Use png, jpg or jpeg",
                value => value && SUPPORTED_FORMATS.includes(value.type)
            ).required("Required"),
        }),
        onSubmit: () => {
            console.log("handle edit submit from formik:", {
                accessToken,
                title: formik.values?.title,
                cover: formik.values?.cover,
                link: formik.values?.link,
                link_title: formik.values?.link_title,

                album_type:musicCollectionType?.value,
                album_type_title:musicCollectionType?.label,
                album_type_id:musicCollectionType?.id,

                option_type: albumStreamingOption?.value,
                option_type_title: albumStreamingOption?.label,
                option_type_id: albumStreamingOption?.id,

                url_id: nanoID,
                slug: slugify(formik.values?.title, {lower: true}),
            })
        }
    })


    const newMusicCollectionItem = {  
        title: musicCollectionItemTitle,
        album: albumID, 
        video: musicCollectionItemVideoID?.id,
        featuring: featuredArtistList, 
    }

    const handleAddMusicCollection = () => {
        // do sumn here
        console.log("new verse:", newMusicCollectionItem)
    }

    const albumTypeArray = [
        { id:1, title: 'Album', value: "Album" },
        { id:2, title: 'Sophomore Album', value: "Sophomore Album" },
        { id:3, title: 'Debut Album', value: "Debut Album" },
        { id:4, title: 'Freshman Album', value: "Freshman Album" },
        { id:5, title: 'Studio Album', value: "Studio Album" },
        { id:6, title: 'Live Album', value: "Live Album" },
        { id:7, title: 'Christmas Album', value: "Christmas Album" },
        { id:8, title: 'Remix Album', value: "Remix Album" },
        { id:9, title: 'E.P', value: "E.P" },
        { id:10, title: 'Mixtape', value: "Mixtape" },
        { id:11, title: 'Cover Album', value: "Cover Album" },
        { id:12, title: 'Compilation Album', value: "Compilation Album" },
        { id:13, title: 'B Side Compilation', value: "B Side Compilation" },
        { id:14, title: 'Split Album', value: "Split Album" },
    ]
    const streamingOptionsTypeArray = [
        { id:1, title: 'Stream Online', value: "Stream On:" },
        { id:2, title: 'Buy & Download', value: "Buy From:" },
    ]

    // const currentUserID = 1
    const currentUserID = currentUser?.id ? currentUser?.id : 0
    const { data: videos, isLoading, isFetching } = useQuery(["current-user-videos", currentUserID], (currentUserID) => getUserVideos(currentUserID))

    
    
    const userVideoOptions = videos?.map((option, index) => ({
        id: option.id,
        label: option.title,
    }))

    const albumTypeOptions = albumTypeArray?.map((option, index) => ({
        id: option.id,
        label: option.title,
        value: option.value
    }))

    const streamingOptionsTypeOptions = streamingOptionsTypeArray?.map((option, index) => ({
        id: option.id,
        label: option.title,
        value: option.value
    }))


    
  return (
    <>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <Box>
                <Card variant="outlined">
                    <CardContent sx={ !showMusicCollectionForm ? { display: 'block' } : { display: 'none' }}>
                        <Stack spacing={2}>
                            <Typography sx={{color: colors.grey[300]}} gutterBottom variant="h6">{musicCollectionTitle}</Typography>
                            <Box>
                                <Button fullWidth onClick={() => setOpenMusicCollectionDialog(true)} size="small" variant="contained">Add a Track</Button>
                            </Box>
                        </Stack>
                    </CardContent>
                    <CardContent sx={ showMusicCollectionForm ? { display: 'block' } : { display: 'none' }}>
                        <Stack>
                            <Typography sx={{color: colors.grey[300]}} gutterBottom variant="h6">New Music Collection Form</Typography>
                            <Box>
                                    <Box>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Stack>
                                                    <Typography variant="subtitle2">Music Collection Information:</Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} item>
                                                <MyTextField
                                                    required
                                                    name="title" 
                                                    label="Music Collection Title"
                                                    helperText={formik.errors.title && formik.touched.title ? formik.errors.title : null} 
                                                    error={formik.errors.title && formik.touched.title ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("title")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                    <Stack spacing={2}>
                                                        <Autocomplete
                                                            options={streamingOptionsTypeOptions} 
                                                            value={albumStreamingOption}
                                                            size="small"
                                                            onChange={(event, newValue) => setAlbumStreamingOption(newValue)}
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
                                                            renderInput={(params) => <TextField {...params} label="Streaming Options" />}
                                                        />
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <MyTextField
                                                    required
                                                    name="link_title" 
                                                    label="Streaming Platform"
                                                    helperText={formik.errors.link_title && formik.touched.link_title ? formik.errors.link_title : null} 
                                                    error={formik.errors.link_title && formik.touched.link_title ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("link_title")}
                                                />
                                            </Grid>
                                            <Grid xs={12}  item>
                                                <MyTextField
                                                    required
                                                    name="link" 
                                                    label="Link"
                                                    helperText={formik.errors.link && formik.touched.link ? formik.errors.link : null} 
                                                    error={formik.errors.link && formik.touched.link ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("link")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                    <Stack spacing={2}>
                                                        <Autocomplete 
                                                            options={albumTypeOptions} 
                                                            value={musicCollectionType}
                                                            size="small"
                                                            onChange={(event, newValue) => setMusicCollectionType(newValue)}
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
                                                            renderInput={(params) => <TextField {...params} label="Album Types" />}
                                                        />
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <Stack spacing={1}>
                                                    <Typography variant="subtitle1">Collection Cover:</Typography>
                                                    <input
                                                        required 
                                                        type="file"
                                                        name="cover"
                                                        onChange={(e) => formik.setFieldValue("cover", e.target.files[0])}
                                                    />
                                                    {formik.errors.cover && formik.touched.cover ? (
                                                    <Typography sx={{color: 'red'}} variant="caption">{formik.errors.cover}</Typography>
                                                ) : null}
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} sx={{paddingTop: 3}} item >
                                                <Button  fullWidth variant="contained" size="small" type="submit">Add Collection</Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </form>

            {/* Add Music Collection Dialogue */}
        <Dialog
            open={openMusicCollectionDialog}
            onClose={() => setOpenMusicCollectionDialog(false)} 
            aria-labelledby="alert-dialog-title"    
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Add a track"}
            </DialogTitle>
            <DialogContent>
                <Box sx={{display: 'flex', justifyContent: "center", alignItems: "center", padding: 2}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Track Title"
                                    {...textFieldConfig}  
                                    value={musicCollectionItemTitle} 
                                    onChange={(e) => setMusicCollectionItemTitle(e.target.value)}
                                />  
                        </Grid>
                        <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Featured Artists"
                                    {...textFieldConfig}
                                    value={featuredArtistList} 
                                    onChange={(e) => setFeaturedArtistList(e.target.value)}
                                />  
                        </Grid>
                        <Grid xs={12} md={6} item>
                                <Stack spacing={2}>
                                    <Autocomplete
                                        options={userVideoOptions} 
                                        value={musicCollectionItemVideoID}
                                        size="small"
                                        onChange={(event, newValue) => setMusicCollectionItemVideoID(newValue)}
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
                                        renderInput={(params) => <TextField {...params} label="Track Video" />}
                                    />
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleAddMusicCollection}>Add Track</Button>
            <Button color="error" onClick={() => setOpenMusicCollectionDialog(false)}>Cancel</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}

export default AddMusicCollectionsCard