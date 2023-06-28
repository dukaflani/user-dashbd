"use client"

// React Imports
import { useState, useEffect, forwardRef } from "react"

// MUI Imports
import { Box, Button, Card, CardContent, Grid, CircularProgress,
    Stack, TextField, Typography, colors, Autocomplete, Dialog, DialogTitle, DialogContent, Chip, DialogActions, CardActionArea, Divider } from "@mui/material"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// NPM Imports
import { useSelector } from "react-redux"
import {  useFormik } from "formik"
import * as Yup from 'yup'
import slugify from 'slugify'
import { nanoid } from 'nanoid'

// Tanstack Query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// Project Imports
import MyTextField from "./formComponents/MyTextField"
import MyTextArea from "./formComponents/MyTextArea"
import { addMusicCollection, addMusicCollectionItem, getUserVideos } from "@/axios/axios"

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });



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
    const [openMuiSnackbar, setOpenMuiSnackbar] = useState(false)
    const [addedCollectionItems, setAddedCollectionItems] = useState([])


    const handleCloseMuiSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenMuiSnackbar(false);
      }; 

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


    const queryClient = useQueryClient()
    const { mutate: addNewMusicCollection, isLoading: createAlbumLoading } = useMutation(addMusicCollection, {
        onSuccess: (data, _variables, _context) => {
            queryClient.invalidateQueries('current-user-musicCollections')
            setOpenMuiSnackbar(true)
            setShowMusicCollectionForm(false)
            setOpenMusicCollectionDialog(true)
            setMusicCollectionTitle(data.title)
            setAlbumID(data.id)
        },
        onError: (error, _variables, _context) => {
            console.log("music collection added error:", error?.response?.data?.detail)
        }
    })

    const { mutate: addNewMusicCollectionItem, isLoading: addAlbumTrackLoading } = useMutation(addMusicCollectionItem, {
        onSuccess: (data, _variables, _context) => {
            setAddedCollectionItems(prevCollItems => [...prevCollItems, data])
            setOpenMusicCollectionDialog(true)
            setMusicCollectionItemVideoID(null)
            setFeaturedArtistList("")
            setMusicCollectionItemTitle("")
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
            link: Yup.string(),
            link_title: Yup.string(),
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
            addNewMusicCollection({
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
        accessToken, 
        title: musicCollectionItemTitle,
        album: albumID, 
        video: musicCollectionItemVideoID ? musicCollectionItemVideoID?.id : 1,
        featuring: featuredArtistList, 
    }

    const handleAddMusicCollection = () => {
        setOpenMusicCollectionDialog(false)
        addNewMusicCollectionItem(newMusicCollectionItem)
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
    const currentUserID = currentUser?.id
    const { data: videos, isLoading, isFetching } = useQuery(["current-user-videos", currentUserID], (currentUserID) => getUserVideos(currentUserID), {
        enabled: !!currentUserID,
    }) 
    
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
                        <Stack>
                            <Stack spacing={2}>
                                <Typography sx={{color: colors.grey[300]}} gutterBottom variant="h6">{musicCollectionTitle}</Typography>
                                <Box>
                                    <Button fullWidth onClick={() => setOpenMusicCollectionDialog(true)} size="small" variant="contained">Add a Track</Button>
                                </Box>
                            </Stack>
                            {addedCollectionItems?.map((albumTrack, i) => (
                              <Box key={i}>
                                  <Card variant='outlined' square sx={{marginTop: 1}}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                                <Stack sx={{width: '100%'}}>
                                                <Typography className="line-clamp-1 line-clamp" variant='subtitle2'>{albumTrack?.title}</Typography>
                                                <Divider/>
                                                <Typography className="line-clamp-1 line-clamp" variant='caption'>{albumTrack?.featuring ? `ft. ${albumTrack?.featuring}` : "Solo Project"}</Typography>
                                                </Stack>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                              </Box>
                          ))}
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
                                                            renderInput={(params) => <TextField {...params} label="Collection Type" />}
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
                                                <Button  fullWidth variant="contained" size="small" type="submit" startIcon={createAlbumLoading && <CircularProgress color="inherit" size={25} />} >{createAlbumLoading ? "Adding Collection..." : "Add Collection"}</Button>
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
                        <Grid xs={12} item>
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

        {/* Add Album Track Loading Dialogue */}
        <Dialog
            open={addAlbumTrackLoading}
            aria-labelledby="alert-dialog-title"    
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Adding Collection Track..."}
            </DialogTitle>
            <DialogContent>
                <Box sx={{display: 'flex', justifyContent: "center", alignItems: "center", padding: 5}}>
                    <CircularProgress/>
                </Box>
            </DialogContent>
        </Dialog>

         {/* Mui Music Collection Success Snackbar */} 
         <Snackbar 
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
            open={openMuiSnackbar} autoHideDuration={6000} 
            onClose={handleCloseMuiSnackbar}
            >
            <Alert onClose={handleCloseMuiSnackbar} severity="success" sx={{ width: '100%' }}>
                Music Collection Created Successfully!
            </Alert>
      </Snackbar>
    </>
  )
}

export default AddMusicCollectionsCard