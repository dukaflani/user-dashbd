"use client"

// React Imports
import { useState, forwardRef, useMemo, useCallback } from "react"

// MUI Imports
import { AppBar, Avatar, Box, Button, Container, Dialog, CircularProgress,
    IconButton, Slide, Stack, Toolbar, Typography, DialogTitle, DialogContent } from "@mui/material"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Data Grid
import { DataGrid } from '@mui/x-data-grid';

// NPM Imports
import numeral from "numeral";
import { formatDistanceStrict } from "date-fns";
import { useSelector } from "react-redux";

// Tanstack Query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// Icons
import {  CloseSharp, VideoCall } from "@mui/icons-material"

// Project Imports
import { deleteProduct, getUserProducts } from "@/axios/axios"
import AddProductCard from "./AddProductCard";
import ProductActions from "./ProductActions";
import ViewProductCard from "./ViewProductCard";
import EditProductCard from "./EditProductCard";


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Alert = forwardRef(function Alert(props, ref) {
return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ProductsPageContent = () => {
    const currentUser = useSelector((state) => state.auth.userInfo) 
    const accessToken = useSelector((state) => state.auth.token)
    const [pageSize, setPageSize] = useState(5)

    // Add Product 
    const [openAddProductDialogue, setOpenAddProductDialogue] = useState(false)

    const handleOpenAddProduct = () => { 
        setOpenAddProductDialogue(true);
    };
    
    const handleCloseAddProduct = () => {
        setOpenAddProductDialogue(false);
    };


    // Edit Product
    const [openEditProductDialogue, setOpenEditProductDialogue] = useState(false)
    const [editProductObject, setEditProductObject] = useState(null)


    const handleOpenEditProduct = (product_object) => { 
        setOpenEditProductDialogue(true);
        setEditProductObject(product_object)
    };
    
    const handleCloseEditProduct = () => {
        setOpenEditProductDialogue(false);
    };


    // View Product
    const [openViewProductDialog, setOpenViewProductDialog] = useState(false)
    const [viewProductObject, setViewProductObject] = useState(null)


    const handleOpenViewProduct = (product_object) => { 
        setOpenViewProductDialog(true)
        setViewProductObject(product_object)
      }
  
      const handleCloseViewProduct = () => {
        setOpenViewProductDialog(false)
      }


    // Delete Product
    const [openMuiSnackbar, setOpenMuiSnackbar] = useState(false)
    const queryClient = useQueryClient()
    const { mutate: deleteMyProduct, isLoading: deleteProductLoading } = useMutation(deleteProduct, {
      onSuccess: (data, _variables, _context) => {
        queryClient.invalidateQueries('current-user-products')
        setOpenMuiSnackbar(true)
      },
      onError: (error, _variables, _context) => {
          console.log("product deleted error:", error?.response?.data?.detail)
      }
  })

    const handleCloseMuiSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenMuiSnackbar(false);
      };

    const handleDelete = (id) => {
        deleteMyProduct({ id, accessToken })
    }



    
    const columns = useMemo(
    () => [
        { field: 'id', headerName: 'ID', sortable: false, filterable: false },
        { field: 'local_currency_id', headerName: 'Local Currency ID', sortable: false, filterable: false },
        { field: 'local_currency_title', headerName: 'Local Currency Title', sortable: false, filterable: false },
        { field: 'product_status_id', headerName: 'Product Status ID', sortable: false, filterable: false },
        { field: 'product_status_title', headerName: 'Product Status Title', sortable: false, filterable: false },
        { field: 'product_category_id', headerName: 'Product Category ID', sortable: false, filterable: false },
        { field: 'product_category_title', headerName: 'Product Category Title', sortable: false, filterable: false },
        {
            field: 'image',
            headerName: 'Image',
            // width: 100,
            renderCell: (params) => <Avatar sx={{ height: 50, width: 80}} variant="rounded"  src={params.row.image} />,
            sortable: false,
            filterable: false
            },
        {
            field: 'title',
            headerName: 'Product Title',
            width: 250,
            sortable: true,
            editable: false
        },
        {
            field: 'status_description',
            headerName: 'Status',
        //   width: 100,
            sortable: true,
            editable: false
        },
        // Add Price + Currency in this column
        {
            field: 'local_price',
            headerName: 'Price',
            width:50,
            sortable: true,
            type: 'number',
            renderCell: (params) => params.row.views_count < 1000 || params.row.views_count % 10 === 0 ? numeral(params.row.views_count).format('0a') : numeral(params.row.views_count).format('0.0a'),
            editable: false
        },
        {
            field: 'product_status',
            headerName: 'Availability',
        //   width: 175,
            editable: false
        },
        {
            field: 'description',
            headerName: 'Description',
        //   width: 175,
            editable: false
        },
        {
            field: 'product_category',
            headerName: 'Category',
        //   width: 175,
            editable: false
        },
        {
            field: 'dollar_price',
            headerName: 'Dollar Price',
        //   width: 175,
            sortable: true,
            editable: false
        },
        {
            field: 'local_currency',
            headerName: 'Currency',
        //   width: 175,
            sortable: true,
            editable: false
        },
        {
            field: 'whatsapp',
            headerName: 'Order on Whatsapp',
            width: 175,
            sortable: true,
            editable: false
        },
        {
            field: 'country',
            headerName: 'Country',
        //   width: 175,
            sortable: true,
            editable: false
        },
        {
            field: 'slug',
            headerName: 'Slug',
        //   width: 175,
            sortable: true,
            editable: false
        },
        {
            field: 'sold_by',
            headerName: 'Vendor',
        //   width: 175,
            sortable: true,
            editable: false
        },
        {
            field: 'promoted_by',
            headerName: 'Promoted by',
        //   width: 175,
            sortable: true,
            editable: false
        },
        {
            field: 'url_id',
            headerName: 'URL ID',
        //   width: 175,
            sortable: true,
            editable: false
        },
        {
            field: 'date',
            headerName: 'Added',
        //   width: 100,
            renderCell: (params) => formatDistanceStrict(new Date(params.row.date), new Date(), {addSuffix: true, }),
            editable: false
        },
        {
            field: 'is_active',
            headerName: 'Active',
        //   width: 175,
            type: 'boolean',
            sortable: true,
            editable: false
        },
        {
            field: 'is_sponsored',
            headerName: 'Sponsored',
        //   width: 100,
            type: 'boolean',
            sortable: true,
            editable: false
        },
        {
            field: 'is_global',
            headerName: 'Global Product',
        //   width: 175,
            type: 'boolean',
            sortable: true,
            editable: false
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions', 
            width: 150,
            renderCell: (params) => <ProductActions {...{params, handleOpenEditProduct, handleOpenViewProduct, handleDelete}} />
        }
        ], [])

    // const currentUserID = 1
    const currentUserID = currentUser?.id
    const { data: products, isLoading, isFetching } = useQuery(["current-user-products", currentUserID], (currentUserID) => getUserProducts(currentUserID), {
        enabled: !!currentUserID,
    })

    const getRowSpacing = useCallback((params) => {
        return {
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        };
      }, []);


  return (
    <>
        <Box sx={{width: '100%'}}>
            <Stack rowGap={2} sx={{width: '100%'}}>
                <Stack direction='row' sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography variant="h6">My Products:</Typography>
                    <Button onClick={handleOpenAddProduct} startIcon={<VideoCall/>} size='small' variant="outlined">Add Product</Button>
                </Stack>
                <Box sx={{ height: 400, maxWidth: 1150 }}>
                    <DataGrid
                        columns={columns}
                        rows={products ? products : []}
                        getRowId={(row) => row.id}
                        columnVisibilityModel={{
                            id: false,
                            dollar_price: false,
                            country: false,
                            url_id: false,
                            slug: false,
                            local_price: false,
                            local_currency: false,
                            local_currency_id: false,
                            local_currency_title: false,
                            promoted_by: false,
                            product_status_id: false,
                            product_status_title: false,
                            product_category_id: false,
                            product_category_title: false,
                        }}

                        initialState={{
                        pagination: {
                            paginationModel: {
                            pageSize: pageSize,
                            },
                        },
                        }}
                        pageSizeOptions={[5, 10, 20]}
                        onPaginationModelChange={(newPageSize) => setPageSize(newPageSize)}
                        // checkboxSelection
                        disableRowSelectionOnClick
                        // showColumnVerticalBorder
                        getRowSpacing={getRowSpacing}
                        localeText={{
                          noRowsLabel: isLoading ? 'Loading products...' : 'No products found...'
                        }}
                        
                    />
                </Box>
            </Stack>
        </Box>

         {/* Add Product Dialog */}
        <Dialog
            fullScreen
            open={openAddProductDialogue}
            onClose={handleCloseAddProduct}
            TransitionComponent={Transition}
        >
            <AppBar color='inherit' sx={{ position: 'fixed' }}>
                <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="close"
                      >
                        <VideoCall/>
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Add Product</Typography>
                    <Button startIcon={<CloseSharp/>} autoFocus color="inherit" onClick={handleCloseAddProduct}>Close</Button>
                </Toolbar>
            </AppBar>
            <Box>
                <Container maxWidth="md">
                    <Box sx={{ width: '100%', paddingY: 10 }}>
                        <AddProductCard  setOpenAddProductDialogue={setOpenAddProductDialogue}  />
                    </Box>
                </Container>
            </Box>
      </Dialog>

        {/*  Edit Product Dialog  */}
        <Dialog
            fullScreen
            open={openEditProductDialogue}
            onClose={handleCloseEditProduct}
            TransitionComponent={Transition}
        >
            <AppBar color='inherit' sx={{ position: 'relative' }}>
                <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="close"
                      >
                        <VideoCall/>
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Edit Product</Typography>
                    <Button startIcon={<CloseSharp/>} autoFocus color="inherit" onClick={handleCloseEditProduct}>Close</Button>
                </Toolbar>
            </AppBar>
            <Box>
                <Container maxWidth="md">
                    <Box sx={{ width: '100%', paddingY: 10 }}>
                        <EditProductCard  editProductObject={editProductObject} setOpenEditProductDialogue={setOpenEditProductDialogue}  />
                    </Box>
                </Container>
            </Box>
      </Dialog>

         {/* View Product Dialog  */}
        <Dialog
            fullScreen
            open={openViewProductDialog}   
            onClose={handleCloseViewProduct}
            TransitionComponent={Transition}
        >
            <AppBar color='inherit' sx={{ position: 'relative' }}>
                <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="close"
                      >
                        <VideoCall/>
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">View Product</Typography>
                    <Button startIcon={<CloseSharp/>} autoFocus color="inherit" onClick={handleCloseViewProduct}>Close</Button>
                </Toolbar>
            </AppBar>
            <Box>
                <Container maxWidth="md">
                    <Box sx={{ width: '100%', paddingY: 10 }}>
                        <ViewProductCard viewProductObject={viewProductObject} />
                    </Box>
                </Container>
            </Box>
      </Dialog>

      {/* Add Delete Loading Dialogue */}
      <Dialog
            open={deleteProductLoading}
            aria-labelledby="alert-dialog-title"    
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle color="danger" id="alert-dialog-title">
            {"Deleting Product..."}
            </DialogTitle>
            <DialogContent>
                <Box sx={{display: 'flex', justifyContent: "center", alignItems: "center", padding: 5}}>
                    <CircularProgress/>
                </Box>
            </DialogContent>
       </Dialog>

      {/* Mui Success Snackbar */} 
      <Snackbar 
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
              open={openMuiSnackbar} autoHideDuration={6000} 
              onClose={handleCloseMuiSnackbar}
              >
              <Alert onClose={handleCloseMuiSnackbar} severity="success" sx={{ width: '100%' }}>
                  Product Deleted Successfully!
              </Alert>
      </Snackbar>
    </>
  )
}

export default ProductsPageContent