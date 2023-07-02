"use client"

// React Imports
import { useState, forwardRef } from "react"

// MUI Imports
import { Autocomplete, Box, Button, Card, CardContent, Grid, CircularProgress,
    Stack, TextField, Typography, colors, Chip } from "@mui/material"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// NPM Imports
import { useSelector } from "react-redux"
import {  useFormik } from "formik"
import * as Yup from 'yup'
import slugify from 'slugify'

// Tanstack Query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// Project Imports
import MyTextField from "./formComponents/MyTextField"
import MyTextArea from "./formComponents/MyTextArea"
import { editVideo, getGenres, getUserLyrics, getUserMusicCollections, 
    getUserProducts, getUserSkizaTunes, getUserStreamingLinks } from "@/axios/axios"

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const EditVideoCard = ({ editVideoObject, setOpenEditVideoDialogue }) => {
    const accessToken = useSelector((state) => state.auth.token)
    const currentUser = useSelector((state) => state.auth.userInfo) 

    const [nanoID, setNanoID] = useState(editVideoObject?.url_id)
    const [streamingLink, setStreamingLink] = useState({ id: editVideoObject?.links, label: editVideoObject?.links_title })
    const [videoProduct, setVideoProduct] = useState({ id: editVideoObject?.product,  label:editVideoObject?.product_title })
    const [videoLyrics, setVideoLyrics] = useState({ id: editVideoObject?.lyrics,  label:editVideoObject?.lyrics_title })
    const [videoSkizaTunes, setVideoSkizaTunes] = useState({ id: editVideoObject?.skiza,  label:editVideoObject?.skiza_title })
    const [videoAlbum, setVideoAlbum] = useState({ id: editVideoObject?.album,  label:editVideoObject?.album_title })
    const [videoGenre, setVideoGenre] = useState({ id: editVideoObject?.genre,  label:editVideoObject?.genre_title })
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
    const { mutate: editMyVideo, isLoading: editVideoLoading } = useMutation(editVideo, {
        onSuccess: (data, _variables, _context) => {
          queryClient.invalidateQueries('current-user-videos')
          setOpenMuiSnackbar(true)
          // setOpenEditVideoDialogue(false)
        },
        onError: (error, _variables, _context) => {
            // console.log("video edited error2:", error)
        }
    })


    const formik = useFormik({
        initialValues: {
            title: editVideoObject?.title,
            song_title: editVideoObject?.song_title,
            youtube_id: editVideoObject?.youtube_id,
            description: editVideoObject?.description,
            thumbnail: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Required"),
            song_title: Yup.string().required("Required"),
            youtube_id: Yup.string().required("Required"),
            description: Yup.string(),
            thumbnail: Yup
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
          editMyVideo({
                accessToken,
                id: editVideoObject?.id,
                title: formik.values.title,
                song_title: formik.values.song_title,
                url_id: nanoID,
                youtube_id: formik.values.youtube_id,
                youtube_embed_link: `https://youtube.com/embed/${formik.values.youtube_id}`,
                description: formik.values.description,
                slug: slugify(formik.values.song_title, {lower: true}),
                thumbnail: formik.values.thumbnail,
                links: streamingLink?.id,
                product: videoProduct?.id,
                album: videoAlbum?.id,
                lyrics: videoLyrics?.id,
                skiza: videoSkizaTunes?.id,
                genre: videoGenre?.id,
                customuserprofile: editVideoObject?.customuserprofile,
                video_username: currentUser?.username
            })
        }
    })

    // Current User ID
    // const currentUserID = 3
    const currentUserID = currentUser?.id

    // User Streaming Links
    const { data: streamingLinks } = useQuery(["current-user-streamingLinks", currentUserID], (currentUserID) => getUserStreamingLinks(currentUserID), {
      enabled: !!currentUserID,
    })
    const streamingServicesOptions = streamingLinks?.map((option, index) => ({
        id: option.id,
        label: option.title,
    }))

    // User Products
    const { data: products } = useQuery(["current-user-products", currentUserID], (currentUserID) => getUserProducts(currentUserID), {
      enabled: !!currentUserID,
    })
    const productDataOptions = products?.map((option, index) => ({
        id: option.id,
        label: option.title
    }))

    // User Lyrics
    const { data: lyrics } = useQuery(["current-user-lyrics", currentUserID], (currentUserID) => getUserLyrics(currentUserID), {
      enabled: !!currentUserID,
    })
    const lyricsDataOptions = lyrics?.map((option, index) => ({
        id: option.id,
        label: option.title
    }))

  //  User Skiza Tunes
    const { data: skizaTunes } = useQuery(["current-user-skizaTunes", currentUserID], (currentUserID) => getUserSkizaTunes(currentUserID), {
      enabled: !!currentUserID,
    })
    const skizaDataOptions = skizaTunes?.map((option, index) => ({
        id: option.id,
        label: option.title
    }))
    
  //  User Music Collection
    const { data: musicCollections, isLoading, isFetching } = useQuery(["current-user-musicCollections", currentUserID], (currentUserID) => getUserMusicCollections(currentUserID), {
      enabled: !!currentUserID,
    })
    const albumDataOptions = musicCollections?.map((option, index) => ({
        id: option.id,
        label: option.title
    }))
    
  // Fetch Genres 
  const { data: genres } = useQuery(["genres"], getGenres)
  const genresOptions = genres?.map((option, index) => ({
    id: option.id,
    label: option.title
  }))

  return (
    <>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <Box>
                <Card variant="outlined">
                    <CardContent>
                        <Stack>
                            <Typography sx={{color: colors.grey[300]}} gutterBottom variant="h6">Edit Video Form</Typography>
                            <Box>
                                    <Box>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Stack>
                                                    <Typography variant="subtitle2">Video Information:</Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} item>
                                                <MyTextField
                                                    required
                                                    name="title" 
                                                    label="Video Title"
                                                    helperText={formik.errors.title && formik.touched.title ? formik.errors.title : null} 
                                                    error={formik.errors.title && formik.touched.title ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("title")}
                                                />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <MyTextField
                                                    required
                                                    name="song_title" 
                                                    label="Song Title"
                                                    helperText={formik.errors.song_title && formik.touched.song_title ? formik.errors.song_title : null} 
                                                    error={formik.errors.song_title && formik.touched.song_title ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("song_title")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item> 
                                            <Stack spacing={2}>
                                                    <Autocomplete
                                                        options={genresOptions ? genresOptions : []}
                                                        value={videoGenre}
                                                        size="small"
                                                        onChange={(event, newValue) => setVideoGenre(newValue)}
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
                                                        renderInput={(params) => <TextField {...params} label="Genre" />}
                                                    />
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <MyTextField
                                                    required
                                                    name="youtube_id" 
                                                    label="YouTube ID"
                                                    helperText={formik.errors.youtube_id && formik.touched.youtube_id ? formik.errors.youtube_id : null} 
                                                    error={formik.errors.youtube_id && formik.touched.youtube_id ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("youtube_id")}
                                                />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <MyTextArea  
                                                    name="description" 
                                                    label="Video Description" 
                                                    helperText={formik.errors.description && formik.touched.description ? formik.errors.description : null} 
                                                    error={formik.errors.description && formik.touched.description ? true : false} 
                                                    {...textAreaConfig} 
                                                    {...formik.getFieldProps("description")}

                                                    />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Stack>
                                                    <Typography variant="subtitle2">Video Items:</Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <Stack spacing={2}>
                                                    <Autocomplete
                                                        options={streamingServicesOptions ? streamingServicesOptions : []}
                                                        value={streamingLink}
                                                        size="small"
                                                        onChange={(event, newValue) => setStreamingLink(newValue)}
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
                                                        renderInput={(params) => <TextField {...params} label="Streaming Links" />}
                                                    />
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <Stack spacing={2}>
                                                    <Autocomplete
                                                        options={productDataOptions ? productDataOptions : []}
                                                        value={videoProduct}
                                                        size="small"
                                                        onChange={(event, newValue) => setVideoProduct(newValue)}
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
                                                        renderInput={(params) => <TextField {...params} label="Product" />}
                                                    />
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <Stack spacing={2}>
                                                    <Autocomplete
                                                        options={lyricsDataOptions ? lyricsDataOptions : []}
                                                        value={videoLyrics}
                                                        size="small"
                                                        onChange={(event, newValue) => setVideoLyrics(newValue)}
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
                                                        renderInput={(params) => <TextField {...params} label="Lyrics" />}
                                                    />
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <Stack spacing={2}>
                                                <Autocomplete
                                                        options={skizaDataOptions ? skizaDataOptions : []}
                                                        value={videoSkizaTunes}
                                                        size="small"
                                                        onChange={(event, newValue) => setVideoSkizaTunes(newValue)}
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
                                                        renderInput={(params) => <TextField {...params} label="Skiza Tunes" />}
                                                    />
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <Stack spacing={2}>
                                                <Autocomplete
                                                        options={albumDataOptions ? albumDataOptions : []}
                                                        value={videoAlbum}
                                                        size="small"
                                                        onChange={(event, newValue) => setVideoAlbum(newValue)}
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
                                                        renderInput={(params) => <TextField {...params} label="Album" />}
                                                    />
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <Stack spacing={1}>
                                                    <Typography variant="subtitle1">Video Thumbnail:</Typography>
                                                    <input
                                                        type="file"
                                                        name="thumbnail"
                                                        onChange={(e) => formik.setFieldValue("thumbnail", e.target.files[0])}
                                                    />
                                                    {formik.errors.thumbnail && formik.touched.thumbnail ? (
                                                    <Typography sx={{color: 'red'}} variant="caption">{formik.errors.thumbnail}</Typography>
                                                ) : null}
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} sx={{paddingTop: 3}} item >
                                                <Button  fullWidth variant="contained" size="small" type="submit" startIcon={editVideoLoading && <CircularProgress color="inherit" size={25} />}>{editVideoLoading ? "Editing Video..." : "Edit Video"}</Button>
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
                Video Edited Successfully!
            </Alert>
        </Snackbar>
    </>
  )
}

export default EditVideoCard