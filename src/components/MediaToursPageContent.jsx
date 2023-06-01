"use client"

// React Imports
import { useState, forwardRef, useMemo, useCallback } from "react"

// NextJS Imports
import Image from "next/image";

// MUI Imports
import { AppBar, Avatar, Box, Button, Container, Dialog, CircularProgress,
    IconButton, Slide, Stack, Toolbar, Typography, DialogTitle, DialogContent } from "@mui/material"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Data Grid
import { DataGrid } from '@mui/x-data-grid';

// NPM Imports
import { formatDistanceStrict } from "date-fns";
import { useSelector } from "react-redux";

// Tanstack Query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// Icons
import {  CloseSharp, VideoCall } from "@mui/icons-material"

// Project Imports
import { deleteMediaTour, getUserMediaTours } from "@/axios/axios"
import AddMediaTourCard from "./AddMediaTourCard";
import MediaTourActions from "./MediaTourActions";
import ViewMediaTourCard from "./ViewMediaTourCard";
import EditMediaTourCard from "./EditMediaTourCard";


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Alert = forwardRef(function Alert(props, ref) {
return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const MediaToursPageContent = () => {
    const currentUser = useSelector((state) => state.auth.userInfo)
    const accessToken = useSelector((state) => state.auth.token) 
    const [pageSize, setPageSize] = useState(5)

    // Add Media Tour 
    const [openAddMediaTourDialogue, setOpenAddMediaTourDialogue] = useState(false)

    const handleOpenAddMediaTour = () => { 
        setOpenAddMediaTourDialogue(true);
    };
    
    const handleCloseAddMediaTour = () => {
        setOpenAddMediaTourDialogue(false);
    };


    // Edit Media Tour
    const [openEditMediaTourDialogue, setOpenEditMediaTourDialogue] = useState(false)
    const [editMediaTourObject, setEditMediaTourObject] = useState(null)


    const handleOpenEditMediaTour = (media_tour_object) => { 
        setOpenEditMediaTourDialogue(true);
        setEditMediaTourObject(media_tour_object)
    };
    
    const handleCloseEditMediaTour = () => {
        setOpenEditMediaTourDialogue(false);
    };


    // View Media Tour
    const [openViewMediaTourDialog, setOpenViewMediaTourDialog] = useState(false)
    const [viewMediaTourObject, setViewMediaTourObject] = useState(null)


    const handleOpenViewMediaTour = (media_tour_object) => { 
        setOpenViewMediaTourDialog(true)
        setViewMediaTourObject(media_tour_object)
      }
  
      const handleCloseViewMediaTour = () => {
        setOpenViewMediaTourDialog(false)
      }


    // Delete Media Tour
    const [openMuiSnackbar, setOpenMuiSnackbar] = useState(false)
    const queryClient = useQueryClient()
    const { mutate: deleteMyMediaTour, isLoading: deleteMediaTourLoading } = useMutation(deleteMediaTour, {
      onSuccess: (data, _variables, _context) => {
        queryClient.invalidateQueries('current-user-media-tours')
        setOpenMuiSnackbar(true)
      },
      onError: (error, _variables, _context) => {
          console.log("video deleted error:", error?.response?.data?.detail)
      }
  })

    const handleCloseMuiSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenMuiSnackbar(false);
      };

    const handleDelete = (id) => {
      deleteMyMediaTour({ id, accessToken })
    }

    
    const columns = useMemo(
    () => [
        { field: 'id', headerName: 'ID', sortable: false, filterable: false },
        { field: 'station_type_id', headerName: 'Station Type ID', sortable: false, filterable: false },
        { field: 'station_type_title', headerName: 'Station Type Title', sortable: false, filterable: false },
        {
            field: 'poster',
            headerName: 'Poster',
            // width: 100,
            renderCell: (params) => <Avatar sx={{ height: 50, width: 80}} variant="rounded"  src={params.row.poster} />,
            sortable: false,
            filterable: false
            },
        {
            field: 'title',
            headerName: 'MediaTour Title',
            width: 250,
            sortable: true,
            editable: false
        },
        {
            field: 'station_name',
            headerName: 'Station Name',
        //   width: 100,
            sortable: true,
            editable: false
        },
        {
            field: 'country',
            headerName: 'Country',
        //   width: 100,
            sortable: true,
            editable: false
        },
        {
            field: 'show_host',
            headerName: 'Show Host',
        //   width: 100,
            sortable: true,
            editable: false
        },
        {
            field: 'show_title',
            headerName: 'Show Title',
        //   width: 100,
            sortable: true,
            editable: false
        },
        {
            field: 'station_type',
            headerName: 'Medium',
        //   width: 100,
            sortable: true,
            editable: false
        },
        {
            field: 'date',
            headerName: 'Date',
        //   width: 175,
            editable: false
        },
        {
            field: 'from_time',
            headerName: 'Starts',
        //   width: 175,
            editable: false
        },
        {
            field: 'to_time',
            headerName: 'Ends',
        //   width: 175,
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
            field: 'posted',
            headerName: 'Posted',
        //   width: 100,
            renderCell: (params) => formatDistanceStrict(new Date(params.row.posted), new Date(), {addSuffix: true, }),
            editable: false
        },
        {
            field: 'is_pinned',
            headerName: 'Featured',
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
            renderCell: (params) => <MediaTourActions {...{params, handleOpenEditMediaTour, handleOpenViewMediaTour, handleDelete }} />
        }
        ], [])

    // const currentUserID = 1
    const currentUserID = currentUser?.id
    const { data: media_tours, isLoading, isFetching } = useQuery(["current-user-media-tours", currentUserID], (currentUserID) => getUserMediaTours(currentUserID), {
        enabled: !!currentUserID
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
                    <Typography variant="h6">My Media Tours:</Typography>
                    <Button onClick={handleOpenAddMediaTour} startIcon={<VideoCall/>} size='small' variant="outlined">Add Media Tour</Button>
                </Stack>
                <Box sx={{ height: 400, maxWidth: 1150 }}>
                    <DataGrid
                        columns={columns}
                        rows={media_tours ? media_tours : []}
                        getRowId={(row) => row.id}
                        columnVisibilityModel={{
                            id: false,
                            show_host: false,
                            to_time: false,
                            url_id: false,
                            station_type_id: false,
                            station_type_title: false,
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
                          noRowsLabel: isLoading ? 'Loading media tours' : 'No media tours found...'
                        }}
                        
                    />
                </Box>
            </Stack>
        </Box>

         {/* Add Media Tour Dialog */}
        <Dialog
            fullScreen
            open={openAddMediaTourDialogue}
            onClose={handleCloseAddMediaTour}
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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Add Media Tour</Typography>
                    <Button startIcon={<CloseSharp/>} autoFocus color="inherit" onClick={handleCloseAddMediaTour}>Close</Button>
                </Toolbar>
            </AppBar>
            <Box>
                <Container maxWidth="md">
                    <Box sx={{ width: '100%', paddingY: 10 }}>
                        <AddMediaTourCard  setOpenAddMediaTourDialogue={setOpenAddMediaTourDialogue}  />
                    </Box>
                </Container>
            </Box>
      </Dialog>


        {/*  Edit Media Tour Dialog  */}
        <Dialog
            fullScreen
            open={openEditMediaTourDialogue}
            onClose={handleCloseEditMediaTour}
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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Edit Media Tour</Typography>
                    <Button startIcon={<CloseSharp/>} autoFocus color="inherit" onClick={handleCloseEditMediaTour}>Close</Button>
                </Toolbar>
            </AppBar>
            <Box>
                <Container maxWidth="md">
                    <Box sx={{ width: '100%', paddingY: 10 }}>
                        <EditMediaTourCard  editMediaTourObject={editMediaTourObject}  setOpenEditMediaTourDialogue={setOpenEditMediaTourDialogue}  />
                    </Box>
                </Container>
            </Box>
      </Dialog>


         {/* View Media Tour Dialog  */}
        <Dialog
            fullScreen
            open={openViewMediaTourDialog}   
            onClose={handleCloseViewMediaTour}
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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">View Media Tour</Typography>
                    <Button startIcon={<CloseSharp/>} autoFocus color="inherit" onClick={handleCloseViewMediaTour}>Close</Button>
                </Toolbar>
            </AppBar>
            <Box>
                <Container maxWidth="md">
                    <Box sx={{ width: '100%', paddingY: 10 }}>
                        <ViewMediaTourCard viewMediaTourObject={viewMediaTourObject} />
                    </Box>
                </Container>
            </Box>
      </Dialog>


      {/* Add Delete Loading Dialogue */}
      <Dialog
            open={deleteMediaTourLoading}
            aria-labelledby="alert-dialog-title"    
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle color="danger" id="alert-dialog-title">
            {"Deleting Media Tour..."}
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
                  Media Tour Deleted Successfully!
              </Alert>
      </Snackbar>
    </>
  )
}

export default MediaToursPageContent