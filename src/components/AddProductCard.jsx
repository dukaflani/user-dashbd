"use client"

// React Imports
import { useState, useEffect, forwardRef } from "react"

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
import { nanoid } from 'nanoid'

// Tanstack Query
import { useMutation, useQueryClient } from "@tanstack/react-query"

// Project Imports
import MyTextField from "./formComponents/MyTextField"
import MyTextArea from "./formComponents/MyTextArea"
import { addProduct } from "@/axios/axios"


const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


const AddProductCard = ({ setOpenAddProductDialogue }) => {
    const accessToken = useSelector((state) => state.auth.token)
    const user_profile = useSelector((state) => state.auth.profileInfo)
    const [nanoID, setNanoID] = useState("")
    const [localCurrency, setLocalCurrency] = useState(null)
    const [productCategory, setProductCategory] = useState(null)
    const [productStatus, setProductStatus] = useState(null)
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
    const { mutate: addNewProduct, isLoading: addProductLoading } = useMutation(addProduct, {
        onSuccess: (data, _variables, _context) => {
            queryClient.invalidateQueries('current-user-products')
            setOpenAddProductDialogue(false)
            setOpenMuiSnackbar(true)
        },
        onError: (error, _variables, _context) => {
            console.log("video added error:", error?.response?.data?.detail)
        }
    })


    const formik = useFormik({
        initialValues: {
            title: '',
            status_description: '',
            local_price: '',
            description: '',
            image: '',
            whatsapp: '',
            sold_by: '',
            country: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Required"),
            status_description: Yup.string().required("Required"),
            local_price: Yup.number().integer().typeError("Please enter a valid price").required("Required"),
            description: Yup.string(),
            image: Yup
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
            whatsapp: Yup.number().integer().typeError("Please enter a valid phone number"),
            sold_by: Yup.string(),
            country: Yup.string().required("Required"),
        }),
        onSubmit: () => {
            addNewProduct({
                accessToken,
                title: formik.values?.title,
                status_description: formik.values?.status_description,
                local_price: formik.values?.local_price,
                dollar_price: 0,
                description: formik.values?.description,
                image: formik.values?.image,
                country: formik.values?.image,

                local_currency: localCurrency ? localCurrency?.symbol : '',
                local_currency_id: localCurrency ? localCurrency?.id : '',
                local_currency_title: localCurrency ? localCurrency?.label : '',

                product_status: productStatus ? productStatus?.value : '',
                product_status_id: productStatus ? productStatus?.id : '',
                product_status_title: productStatus ? productStatus?.label : '',

                product_category: productCategory ? productCategory?.value : '',
                product_category_id: productCategory ? productCategory?.id : '',
                product_category_title: productCategory ? productCategory?.label : '',

                whatsapp: formik.values?.whatsapp,
                sold_by: formik.values?.sold_by,
                url_id: nanoID,
                slug: slugify(formik.values?.title, {lower: true}),
                customuserprofile: user_profile?.id,
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
        { id:7, title: 'South Sudan Pound', symbol: "SDG." },
    ]

    const currencyOptions = currencyArray?.map((option, index) => ({
        id: option.id,
        label: option.title,
        symbol: option.symbol
    }))

    const productCategoryArray = [
        { id:1, title: 'No Category', value: "Unknown" },
        { id:2, title: 'Apparel & Clothing', value: "Apparel" },
        { id:3, title: 'Beauty Products', value: "Beauty" },
        { id:4, title: 'Wellness & Fitness', value: "Wellness" },
        { id:5, title: 'Electronics & Appliances', value: "Electronics" },
    ]

    const productCategoryOptions = productCategoryArray?.map((option, index) => ({
        id: option.id,
        label: option.title,
        value: option.value
    }))


    const productStatusArray = [
        { id:1, title: 'Available', value: "Available" },
        { id:2, title: 'Stock running out!', value: "Stock running out!" },
        { id:3, title: 'Sold Out', value: "Sold Out" },   
    ]

    const productStatusOptions = productStatusArray?.map((option, index) => ({
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
                            <Typography sx={{color: colors.grey[300]}} gutterBottom variant="h6">New Product Form</Typography>
                            <Box>
                                    <Box>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Stack>
                                                    <Typography variant="subtitle2">Product Information:</Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} item>
                                                <MyTextField
                                                    required
                                                    name="title" 
                                                    label="Product Title"
                                                    helperText={formik.errors.title && formik.touched.title ? formik.errors.title : null} 
                                                    error={formik.errors.title && formik.touched.title ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("title")}
                                                />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <MyTextField
                                                    required
                                                    name="status_description" 
                                                    label="Product Status"
                                                    helperText={formik.errors.status_description && formik.touched.status_description ? formik.errors.status_description : null} 
                                                    error={formik.errors.status_description && formik.touched.status_description ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("status_description")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <Stack spacing={2}>
                                                    <Autocomplete
                                                        options={currencyOptions} 
                                                        value={localCurrency}
                                                        size="small"
                                                        onChange={(event, newValue) => setLocalCurrency(newValue)}
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
                                                        renderInput={(params) => <TextField {...params} label="Local Currency" />}
                                                    />
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <MyTextField
                                                    required
                                                    name="local_price" 
                                                    label="Price"
                                                    helperText={formik.errors.local_price && formik.touched.local_price ? formik.errors.local_price : null} 
                                                    error={formik.errors.local_price && formik.touched.local_price ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("local_price")}
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
                                            <Grid xs={12} md={6} item>
                                                <MyTextField
                                                    required
                                                    name="sold_by" 
                                                    label="Vendor"
                                                    helperText={formik.errors.sold_by && formik.touched.sold_by ? formik.errors.sold_by : null} 
                                                    error={formik.errors.sold_by && formik.touched.sold_by ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("sold_by")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <MyTextField
                                                    required
                                                    name="whatsapp" 
                                                    label="WhatsApp"
                                                    helperText={formik.errors.whatsapp && formik.touched.whatsapp ? formik.errors.whatsapp : null} 
                                                    error={formik.errors.whatsapp && formik.touched.whatsapp ? true : false} 
                                                    {...textFieldConfig} 
                                                    {...formik.getFieldProps("whatsapp")}
                                                />
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <Stack spacing={2}>
                                                    <Autocomplete
                                                        options={productCategoryOptions} 
                                                        value={productCategory}
                                                        size="small"
                                                        onChange={(event, newValue) => setProductCategory(newValue)}
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
                                                        renderInput={(params) => <TextField {...params} label="Product Category" />}
                                                    />
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <Stack spacing={2}>
                                                    <Autocomplete
                                                        options={productStatusOptions} 
                                                        value={productStatus}
                                                        size="small"
                                                        onChange={(event, newValue) => setProductStatus(newValue)}
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
                                                        renderInput={(params) => <TextField {...params} label="Availability" />}
                                                    />
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} md={6} item>
                                                <Stack spacing={1}>
                                                    <Typography variant="subtitle1">Product Image:</Typography>
                                                    <input
                                                        required 
                                                        type="file"
                                                        name="image"
                                                        onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
                                                    />
                                                    {formik.errors.image && formik.touched.image ? (
                                                    <Typography sx={{color: 'red'}} variant="caption">{formik.errors.image}</Typography>
                                                ) : null}
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} sx={{paddingTop: 3}} item >
                                                <Button  fullWidth variant="contained" size="small" type="submit" startIcon={addProductLoading && <CircularProgress color="inherit" size={25} />}>{addProductLoading ? "Adding Product..." : "Add Product"}</Button>
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
                Product Added Successfully!
            </Alert>
      </Snackbar>
    </>
  )
}

export default AddProductCard