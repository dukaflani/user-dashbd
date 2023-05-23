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
import { useMutation } from "@tanstack/react-query"

// Project Imports
import MyTextField from "./formComponents/MyTextField"
import MyTextArea from "./formComponents/MyTextArea"
import { addLyrics, addLyricsVerse } from "@/axios/axios"


const AddLyricsCard = () => {
    const accessToken = useSelector((state) => state.auth.token)
    const [nanoID, setNanoID] = useState("")
    const [verseType, setVerseType] = useState(null)
    const [verseLyrics, setVerseLyrics] = useState("")
    const [openLyricsVerseDialog, setOpenLyricsVerseDialog] = useState(false)
    const [showLyricsForm, setShowLyricsForm] = useState(true)
    const [lyricsTitle, setLyricsTitle] = useState('')
    const [lyricsID, setLyricsID] = useState(null)
    const [verseVocalist, setVerseVocalist] = useState('')

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


    const { mutate: addNewLyrics } = useMutation(addLyrics, {
        onSuccess: (data, _variables, _context) => {
            console.log("lyrics added success:", data)
            setShowLyricsForm(false)
            setOpenLyricsVerseDialog(true)
            setLyricsTitle(data.title)
            setLyricsID(data.id)
        },
        onError: (error, _variables, _context) => {
            console.log("lyrics added error:", error?.response?.data?.detail)
        }
    })

    const { mutate: addNewLyricsVerse } = useMutation(addLyricsVerse, {
        onSuccess: (data, _variables, _context) => {
            console.log("lyrics verse added success:", data)
            setOpenLyricsVerseDialog(false)
        },
        onError: (error, _variables, _context) => {
            console.log("lyrics verse added error:", error?.response?.data?.detail)
        }
    })


    const formik = useFormik({
        initialValues: {
            title: '',
            vocals: '',
            bgvs: '',
            audio: '',
            director: '',
            writer: '',
            instruments: '',
            producer: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Required"),
            vocals: Yup.string().required("Required"),
            bgvs: Yup.string().required("Required"),
            audio: Yup.string().required("Required"),
            director: Yup.string().required("Required"),
            writer: Yup.string().required("Required"),
            producer: Yup.string().required("Required"),
            instruments: Yup.string(),
        }),
        onSubmit: () => {
            console.log("handle edit submit from formik:", {
                accessToken,
                title: formik.values?.title,
                vocals: formik.values?.vocals,
                bgvs: formik.values?.bgvs,
                audio: formik.values?.audio,
                director: formik.values?.director,
                writer: formik.values?.writer,
                instruments: formik.values?.instruments,
                producer: formik.values?.producer,
                url_id: nanoID,
                slug: slugify(formik.values?.title, {lower: true}),
            })
        }
    })

    const newVerse = {  
        lyrics: lyricsID, 

        type: verseType?.value,
        type_id: verseType?.id,
        type_title: verseType?.label,

        artist: verseVocalist,
        body: verseLyrics, 
    }

    const handleAddLyricsVerse = () => {
        // do sumn here
        console.log("new verse:", newVerse)
    }


    const versesTypeArray = [
        { id:1, title: 'Verse Intro', value: "Intro" },
        { id:2, title: 'Pre Chorus', value: "Pre_chorus" },
        { id:3, title: 'Chorus', value: "Chorus" },
        { id:4, title: 'Verse', value: "Verse" },
        { id:5, title: 'Bridge', value: "Bridge" },
        { id:6, title: 'Outro', value: "Outro" },
    ]

    const versesOptions = versesTypeArray?.map((option, index) => ({
        id: option.id,
        label: option.title,
        value: option.value
    }))



    
  return (
    <>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <Box>
                <Card variant="outlined">
                    <CardContent sx={ !showLyricsForm ? { display: 'block' } : { display: 'none' }}>
                        <Stack spacing={2}>
                            <Typography sx={{color: colors.grey[300]}} gutterBottom variant="h6">{lyricsTitle}</Typography>
                            <Box>
                                <Button fullWidth onClick={() => setOpenLyricsVerseDialog(true)} size="small" variant="contained">Add Verse</Button>
                            </Box>
                        </Stack>
                    </CardContent>
                    <CardContent sx={ showLyricsForm ? { display: 'block' } : { display: 'none' }}>
                        <Stack>
                            <Typography sx={{color: colors.grey[300]}} gutterBottom variant="h6">New Lyrics Form</Typography>
                            <Box>
                                    <Box>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Stack>
                                                    <Typography variant="subtitle2">Lyrics Information:</Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} item>
                                                <MyTextField
                                                    required
                                                    name="title" 
                                                    label="Lyrics Title"
                                                    helperText={formik.errors.title && formik.touched.title ? formik.errors.title : null} 
                                                    error={formik.errors.title && formik.touched.title ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("title")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <MyTextField
                                                    required
                                                    name="vocals" 
                                                    label="Vocals"
                                                    helperText={formik.errors.vocals && formik.touched.vocals ? formik.errors.vocals : null} 
                                                    error={formik.errors.vocals && formik.touched.vocals ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("vocals")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <MyTextField
                                                    required
                                                    name="bgvs" 
                                                    label="BGVs"
                                                    helperText={formik.errors.bgvs && formik.touched.bgvs ? formik.errors.bgvs : null} 
                                                    error={formik.errors.bgvs && formik.touched.bgvs ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("bgvs")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <MyTextField
                                                    required
                                                    name="audio" 
                                                    label="Audio"
                                                    helperText={formik.errors.audio && formik.touched.audio ? formik.errors.audio : null} 
                                                    error={formik.errors.audio && formik.touched.audio ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("audio")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <MyTextField
                                                    required
                                                    name="director" 
                                                    label="Director"
                                                    helperText={formik.errors.director && formik.touched.director ? formik.errors.director : null} 
                                                    error={formik.errors.director && formik.touched.director ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("director")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <MyTextField
                                                    required
                                                    name="writer" 
                                                    label="Writer"
                                                    helperText={formik.errors.writer && formik.touched.writer ? formik.errors.writer : null} 
                                                    error={formik.errors.writer && formik.touched.writer ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("writer")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <MyTextField
                                                    required
                                                    name="instruments" 
                                                    label="Instruments"
                                                    helperText={formik.errors.instruments && formik.touched.instruments ? formik.errors.instruments : null} 
                                                    error={formik.errors.instruments && formik.touched.instruments ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("instruments")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <MyTextField
                                                    required
                                                    name="producer" 
                                                    label="Executive Producer"
                                                    helperText={formik.errors.producer && formik.touched.producer ? formik.errors.producer : null} 
                                                    error={formik.errors.producer && formik.touched.producer ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("producer")}
                                                />
                                            </Grid>
                                            <Grid xs={12} sx={{paddingTop: 3}} item >
                                                <Button  fullWidth variant="contained" size="small" type="submit">Add Production Team</Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </form>

            {/* Add Lyrics Verse Dialogue */}
        <Dialog
            open={openLyricsVerseDialog}
            onClose={() => setOpenLyricsVerseDialog(false)} 
            aria-labelledby="alert-dialog-title"    
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Add a verse"}
            </DialogTitle>
            <DialogContent>
                <Box sx={{display: 'flex', justifyContent: "center", alignItems: "center", padding: 2}}>
                    <Grid container spacing={2}>
                        <Grid xs={12} md={6} item>
                                <Stack spacing={2}>
                                    <Autocomplete
                                        options={versesOptions} 
                                        value={verseType}
                                        size="small"
                                        onChange={(event, newValue) => setVerseType(newValue)}
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
                                        renderInput={(params) => <TextField {...params} label="Verse Type" />}
                                    />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Vocalist"
                                    {...textFieldConfig}  
                                    value={verseVocalist} 
                                    onChange={(e) => setVerseVocalist(e.target.value)}
                                />  
                        </Grid>
                        <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Lyrics"
                                    {...textFieldConfig}
                                    multiline
                                    maxRows={5}
                                    value={verseLyrics} 
                                    onChange={(e) => setVerseLyrics(e.target.value)}
                                />  
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleAddLyricsVerse}>Add Verse</Button>
            <Button color="error" onClick={() => setOpenLyricsVerseDialog(false)}>Cancel</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}

export default AddLyricsCard