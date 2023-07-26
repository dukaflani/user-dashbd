"use client"

// React Imports
import { useState, useEffect, forwardRef } from "react"

// MUI Imports
import { Autocomplete, Box, Button, Card, CardContent, Grid, 
    Stack, TextField, Typography, colors, Chip, CircularProgress } from "@mui/material"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// NPM Imports
import { useSelector } from "react-redux"
import {  useFormik } from "formik"
import * as Yup from 'yup'
import slugify from 'slugify'
import { nanoid } from 'nanoid'
import { format, formatISO9075 } from "date-fns";

// Tanstack Query
import { useMutation, useQueryClient } from "@tanstack/react-query"

// Project Imports
import MyTextField from "./formComponents/MyTextField"
import MyTextArea from "./formComponents/MyTextArea"
import { addEvent } from "@/axios/axios"
import { countriesChoices } from "@/data/countries"


const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


const AddEventCard = ({ setOpenAddEventDialogue }) => {
    const accessToken = useSelector((state) => state.auth.token)
    const currentLoggedInUserProfile = useSelector((state) => state.auth.profileInfo) 
    const [nanoID, setNanoID] = useState("")
    const [ticketInfo, setTicketInfo] = useState(null)
    const [ticketCurrency, setTicketCurrency] = useState(null)
    const [ticketCategory, setTicketCategory] = useState(null)
    const [eventDate, setEventDate] = useState(null)  
    const [eventTime, setEventTime] = useState(null)
    const [openMuiSnackbar, setOpenMuiSnackbar] = useState(false)



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
    const { mutate: addNewEvent, isLoading: loadAddingEvent } = useMutation(addEvent, {
        onSuccess: (data, _variables, _context) => {
            queryClient.invalidateQueries('current-user-events')
            // setOpenAddEventDialogue(false)
            setOpenMuiSnackbar(true)
        },
        onError: (error, _variables, _context) => {
            // console.log("event added error:", error?.response?.data?.detail)
        }
    })


    const formik = useFormik({
        initialValues: {
            title: '',
            country: '',
            event_organizer: '',
            ticket_platform: '',
            local_price: '',
            city: '',
            poster: '',
            description: '',
            venue: '',
            location: '',
            ticket_link: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Required"),
            country: Yup.string().required("Required"),
            event_organizer: Yup.string().required("Required"),
            ticket_platform: Yup.string(),
            local_price: Yup.number().integer().typeError("Please enter a valid price"),
            city: Yup.string().required("Required"),
            description: Yup.string(),
            poster: Yup
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
                ),
            venue: Yup.string().required("Required"),
            location: Yup.string().required("Required"),
            ticket_link: Yup.string(),
        }),
        onSubmit: () => {
            addNewEvent({
                accessToken,
                title: formik.values?.title,
                country: formik.values?.country,
                event_organizer: formik.values?.event_organizer,
                ticket_platform: formik.values?.ticket_platform,
                local_price: formik.values?.local_price,
                city: formik.values?.city,
                poster: formik.values?.poster,
                description: formik.values?.description,
                venue: formik.values?.venue,
                location: formik.values?.location,
                date: format(new Date(eventDate), "yyyy-MM-dd"), 
                raw_date: eventDate,
                time: formatISO9075(new Date(eventTime), { representation: 'time' }),
                raw_time: eventTime,
                ticket_link: formik.values?.ticket_link,

                event_category: ticketCategory ? ticketCategory?.value : '',  
                event_category_id: ticketCategory ? ticketCategory?.id : '',  
                event_category_title: ticketCategory ? ticketCategory?.label : '',  

                event_ticket_info: ticketInfo ? ticketInfo?.value : '',
                event_ticket_info_id: ticketInfo ? ticketInfo?.id : '',
                event_ticket_info_title: ticketInfo ? ticketInfo?.label : '',

                local_currency: ticketCurrency ? ticketCurrency?.symbol : '',
                local_currency_id: ticketCurrency ? ticketCurrency?.id : '',
                local_currency_title: ticketCurrency ? ticketCurrency?.label : '',
                
                customuserprofile: currentLoggedInUserProfile?.id,
                url_id: nanoID,
                slug: slugify(formik.values.title, {lower: true}),
            })
        }
    })



    const currencyArray = [
        { id:1, title: 'Kenya Shillings', symbol: "Ksh." },
        { id:2, title: 'Tanzania Shillings', symbol: "Tzs." },
        { id:3, title: 'Uganda Shillings', symbol: "Ush." },
        { id:4, title: 'Rwanda Franc', symbol: "RWF." },
        { id:5, title: 'South Africa Rand', symbol: "R." },
        { id:6, title: 'Nigeria Naira', symbol: "₦." },
        { id:7, title: 'Ghana Cedes', symbol: "GH₵." },
        { id:8, title: 'South Sudan Pound', symbol: "SDG." },
    ]

    const currencyOptions = currencyArray?.map((option, index) => ({
        id: option.id,
        label: option.title,
        symbol: option.symbol
    }))

    const eventCategoryArray = [
        { id:1, title: 'Concert Event', value: "Concert Events" },
        { id:2, title: 'Club Event', value: "Club Events" },
        { id:3, title: 'Corporate Event', value: "Corporate Events" },
        { id:4, title: 'Campus Event', value: "Campus Events" },
        { id:5, title: 'Other Events', value: "Other Events" },
    ]

    const eventCategoryOptions = eventCategoryArray?.map((option, index) => ({
        id: option.id,
        label: option.title,
        value: option.value
    }))


    const ticketInfoArray = [  
        { id:1, title: 'Free', value: "Free entry" },
        { id:2, title: 'Online Tickets', value: "Ticket prices from" },
        { id:3, title: 'Gate Tickets', value: "Check description for entry info" },   
    ]

    const ticketInfoOptions = ticketInfoArray?.map((option, index) => ({
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
                            <Typography sx={{color: colors.grey[300]}} gutterBottom variant="h6">New Event Form</Typography>
                            <Box>
                                    <Box>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Stack>
                                                    <Typography variant="subtitle2">Event Information:</Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} item>
                                                <MyTextField
                                                    required
                                                    name="title" 
                                                    label="Event Title"
                                                    helperText={formik.errors.title && formik.touched.title ? formik.errors.title : null} 
                                                    error={formik.errors.title && formik.touched.title ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("title")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                {/* <MyTextField
                                                    required
                                                    name="country" 
                                                    label="Country"
                                                    helperText={formik.errors.country && formik.touched.country ? formik.errors.country : null} 
                                                    error={formik.errors.country && formik.touched.country ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("country")}
                                                /> */}
                                                <Stack spacing={2}>
                                                    <Autocomplete
                                                        name="country"
                                                        options={countriesChoices}
                                                        size="small"
                                                        value={formik.values.country}
                                                        onChange={(event, newValue) => formik.setFieldValue("country", newValue)}
                                                        getOptionLabel={(option) => option.label}
                                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                                        renderOption={(props, option) => (
                                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                            <img
                                                            loading="lazy"
                                                            width="20"
                                                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                            alt=""
                                                            />
                                                            {option.label} ({option.code}) +{option.phone}
                                                        </Box>
                                                        )}
                                                        renderInput={(params) => (
                                                            <TextField 
                                                                helperText={formik.errors.country && formik.touched.country ? formik.errors.country : null} 
                                                                error={formik.errors.country && formik.touched.country ? true : false}
                                                                {...params} 
                                                                label="Country" 
                                                            />
                                                        )}
                                                    >
                                                    </Autocomplete>
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <MyTextField
                                                    required
                                                    name="city" 
                                                    label="City"
                                                    helperText={formik.errors.city && formik.touched.city ? formik.errors.city : null} 
                                                    error={formik.errors.city && formik.touched.city ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("city")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <MyTextField
                                                    required
                                                    name="location" 
                                                    label="Location"
                                                    helperText={formik.errors.location && formik.touched.location ? formik.errors.location : null} 
                                                    error={formik.errors.location && formik.touched.location ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("location")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <MyTextField
                                                    required
                                                    name="venue" 
                                                    label="Venue"
                                                    helperText={formik.errors.venue && formik.touched.venue ? formik.errors.venue : null} 
                                                    error={formik.errors.venue && formik.touched.venue ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("venue")}
                                                />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <MyTextArea  
                                                    name="description" 
                                                    label="Event Description" 
                                                    helperText={formik.errors.description && formik.touched.description ? formik.errors.description : null} 
                                                    error={formik.errors.description && formik.touched.description ? true : false} 
                                                    {...textAreaConfig} 
                                                    {...formik.getFieldProps("description")}

                                                    />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Stack>
                                                    <Typography variant="subtitle2">Event Details:</Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <Stack spacing={2}>
                                                    <Autocomplete
                                                        options={currencyOptions} 
                                                        value={ticketCurrency}
                                                        size="small"
                                                        onChange={(event, newValue) => setTicketCurrency(newValue)}
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
                                                        renderInput={(params) => <TextField {...params} label="Currency" />}
                                                    />
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <MyTextField
                                                    name="local_price" 
                                                    label="Price"
                                                    helperText={formik.errors.local_price && formik.touched.local_price ? formik.errors.local_price : null} 
                                                    error={formik.errors.local_price && formik.touched.local_price ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("local_price")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <MyTextField
                                                    required
                                                    name="event_organizer" 
                                                    label="Event Organizer"
                                                    helperText={formik.errors.event_organizer && formik.touched.event_organizer ? formik.errors.event_organizer : null} 
                                                    error={formik.errors.event_organizer && formik.touched.event_organizer ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("event_organizer")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item> 
                                                <MyTextField
                                                    name="ticket_platform" 
                                                    label="Ticketing Platform"
                                                    helperText={formik.errors.ticket_platform && formik.touched.ticket_platform ? formik.errors.ticket_platform : null} 
                                                    error={formik.errors.ticket_platform && formik.touched.ticket_platform ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("ticket_platform")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <Stack spacing={2}>
                                                    <Autocomplete
                                                        options={eventCategoryOptions}  
                                                        value={ticketCategory}
                                                        size="small"
                                                        onChange={(event, newValue) => setTicketCategory(newValue)}
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
                                                        renderInput={(params) => <TextField {...params} label="Event Category" />}
                                                    />
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <Stack spacing={2}>
                                                    <Autocomplete
                                                        options={ticketInfoOptions}
                                                        value={ticketInfo}
                                                        size="small"
                                                        onChange={(event, newValue) => setTicketInfo(newValue)}
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
                                                        renderInput={(params) => <TextField {...params} label="Ticket Info" />}
                                                    />
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} item> 
                                                <MyTextField
                                                    name="ticket_link" 
                                                    label="Ticket Link"
                                                    helperText={formik.errors.ticket_link && formik.touched.ticket_link ? formik.errors.ticket_link : null} 
                                                    error={formik.errors.ticket_link && formik.touched.ticket_link ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("ticket_link")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <DatePicker 
                                                    label="Event Date" 
                                                    value={eventDate} 
                                                    onChange={(newValue) => setEventDate(newValue)} 
                                                    />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                            <TimePicker
                                                label="Event Time"
                                                value={eventTime}
                                                onChange={(newValue) => setEventTime(newValue)}
                                                />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <Stack spacing={1}>
                                                    <Typography variant="subtitle1">Event Poster:</Typography>
                                                    <input
                                                        required 
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
                                                <Button  fullWidth variant="contained" size="small" type="submit" startIcon={loadAddingEvent && <CircularProgress color="inherit" size={25} />}>{loadAddingEvent ? "Adding Event..." : "Add Event"}</Button>
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
                Event Added Successfully!
            </Alert>
      </Snackbar>
    </>
  )
}

export default AddEventCard