// MUI Imports
import { Autocomplete, Box, Button, Card, CardContent, Grid, Stack, TextField, Typography, colors } from "@mui/material"

// NPM Imports
import { Formik, Form, useFormik } from "formik"
import * as Yup from 'yup'

// Project Imports
import MyTextField from "./formComponents/MyTextField"
import MyTextArea from "./formComponents/MyTextArea"
import MySelectInput from "./formComponents/MySelectInput"


const AddVideoCard = () => {

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

    const formik = useFormik({
        initialValues: {
            title: '',
            song_title: '',
            url_id: '',
            youtube_id: '',
            youtube_embed_link: '',
            description: '',
            slug: '',
            thumbnail: '',
            links: '',
            product: '',
            album: '',
            lyrics: '',
            skiza: '',
            genre: '',
            customuserprofile: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Required"),
            song_title: Yup.string().required("Required"),
            url_id: Yup.string().required("Required"),
            youtube_id: Yup.string().required("Required"),
            youtube_embed_link: Yup.string().required("Required"),
            description: Yup.string(),
            slug: Yup.string().required("Required"),
            thumbnail: Yup
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
                )
                .required("Required"),
                links: Yup.number().integer().typeError("Only ID's are allowed"),
                product: Yup.number().integer().typeError("Only ID's are allowed"),
                album: Yup.number().integer().typeError("Only ID's are allowed"),
                lyrics: Yup.number().integer().typeError("Only ID's are allowed"),
                skiza: Yup.number().integer().typeError("Only ID's are allowed"),
                genre: Yup.number().integer().typeError("Only ID's are allowed"),
                customuserprofile: Yup.number().integer().typeError("Only ID's are allowed"),
        }),
        onSubmit: (values) => {
            console.log("Add video values:", values)
        }
    })


    

    


    
  return (
    <Box>
        <Card variant="outlined">
            <CardContent>
                <Stack>
                    <Typography sx={{color: colors.grey[300]}} gutterBottom variant="h6">Video Title</Typography>
                    <Box>
                        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
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
                                            abel="Video Title"
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
                                        <MyTextField
                                            required
                                            name="genre" 
                                            label="Genre"
                                            helperText={formik.errors.genre && formik.touched.genre ? formik.errors.genre : null} 
                                            error={formik.errors.genre && formik.touched.genre ? true : false} 
                                            {...textFieldConfig} 
                                            {...formik.getFieldProps("genre")}
                                             />
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
                                                name="links"
                                                options={[]}
                                                size="small"
                                                value={formik.values.links}
                                                onChange={(event, newValue) => formik.setFieldValue("links", newValue)}
                                                getOptionLabel={(option) => option.title}
                                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                                renderOption={(props, option) => (
                                                <Box component="li" {...props}>
                                                    {option.title}
                                                </Box>
                                                )}
                                                renderInput={(params) => (
                                                    <TextField 
                                                        helperText={formik.errors.links && formik.touched.links ? formik.errors.links : null} 
                                                        error={formik.errors.links && formik.touched.links ? true : false}
                                                        {...params} 
                                                        label="Streaming Links" 
                                                    />
                                                )}
                                            >
                                            </Autocomplete>
                                        </Stack>
                                    </Grid>
                                    <Grid xs={12} md={6} item>
                                        <Stack spacing={2}>
                                            <Autocomplete
                                                name="product"
                                                options={[]}
                                                size="small"
                                                value={formik.values.product}
                                                onChange={(event, newValue) => formik.setFieldValue("product", newValue)}
                                                getOptionLabel={(option) => option.title}
                                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                                renderOption={(props, option) => (
                                                <Box component="li" {...props}>
                                                    {option.title}
                                                </Box>
                                                )}
                                                renderInput={(params) => (
                                                    <TextField 
                                                        helperText={formik.errors.product && formik.touched.product ? formik.errors.product : null} 
                                                        error={formik.errors.product && formik.touched.product ? true : false}
                                                        {...params} 
                                                        label="Product" 
                                                    />
                                                )}
                                            >
                                            </Autocomplete>
                                        </Stack>
                                    </Grid>
                                    <Grid xs={12} md={6} item>
                                        <Stack spacing={2}>
                                            <Autocomplete
                                                name="album"
                                                options={[]}
                                                size="small"
                                                value={formik.values.album}
                                                onChange={(event, newValue) => formik.setFieldValue("album", newValue)}
                                                getOptionLabel={(option) => option.title}
                                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                                renderOption={(props, option) => (
                                                <Box component="li" {...props}>
                                                    {option.title}
                                                </Box>
                                                )}
                                                renderInput={(params) => (
                                                    <TextField 
                                                        helperText={formik.errors.album && formik.touched.album ? formik.errors.album : null} 
                                                        error={formik.errors.album && formik.touched.album ? true : false}
                                                        {...params} 
                                                        label="Album" 
                                                    />
                                                )}
                                            >
                                            </Autocomplete>
                                        </Stack>
                                    </Grid>
                                    <Grid xs={12} md={6} item>
                                        <Stack spacing={2}>
                                            <Autocomplete
                                                name="lyrics"
                                                options={[]}
                                                size="small"
                                                value={formik.values.lyrics}
                                                onChange={(event, newValue) => formik.setFieldValue("lyrics", newValue)}
                                                getOptionLabel={(option) => option.title}
                                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                                renderOption={(props, option) => (
                                                <Box component="li" {...props}>
                                                    {option.title}
                                                </Box>
                                                )}
                                                renderInput={(params) => (
                                                    <TextField 
                                                        helperText={formik.errors.lyrics && formik.touched.lyrics ? formik.errors.lyrics : null} 
                                                        error={formik.errors.lyrics && formik.touched.lyrics ? true : false}
                                                        {...params} 
                                                        label="Lyrics" 
                                                    />
                                                )}
                                            >
                                            </Autocomplete>
                                        </Stack>
                                    </Grid>
                                    <Grid xs={12} md={6} item>
                                        <Stack spacing={2}>
                                            <Autocomplete
                                                name="skiza"
                                                options={[]}
                                                size="small"
                                                value={formik.values.skiza}
                                                onChange={(event, newValue) => formik.setFieldValue("skiza", newValue)}
                                                getOptionLabel={(option) => option.title}
                                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                                renderOption={(props, option) => (
                                                <Box component="li" {...props}>
                                                    {option.title}
                                                </Box>
                                                )}
                                                renderInput={(params) => (
                                                    <TextField 
                                                        helperText={formik.errors.skiza && formik.touched.skiza ? formik.errors.skiza : null} 
                                                        error={formik.errors.skiza && formik.touched.skiza ? true : false}
                                                        {...params} 
                                                        label="Skiza Tunes" 
                                                    />
                                                )}
                                            >
                                            </Autocomplete>
                                        </Stack>
                                    </Grid>
                                    <Grid xs={12} md={6} item>
                                        <Stack spacing={1}>
                                            <Typography variant="subtitle1">Product Image:</Typography>
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
                                        <Button fullWidth variant="contained" size="small" type="submit">Add Video</Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </form>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    </Box>
  )
}

export default AddVideoCard