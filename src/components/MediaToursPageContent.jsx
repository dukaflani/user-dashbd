"use client"

// React Imports
import { useState, forwardRef, useMemo, useCallback } from "react"

// MUI Imports
import { AppBar, Avatar, Box, Button, Container, Dialog, 
    IconButton, Slide, Stack, Toolbar, Typography } from "@mui/material"

// Data Grid
import { DataGrid } from '@mui/x-data-grid';

// NPM Imports
import numeral from "numeral";
import { formatDistanceStrict } from "date-fns";
import { useSelector } from "react-redux";

// Tanstack Query
import { useQuery } from "@tanstack/react-query"

// Icons
import {  CloseSharp, VideoCall } from "@mui/icons-material"

// Project Imports
import { getUserMediaTours } from "@/axios/axios"
import AddMediaTourCard from "./AddMediaTourCard";
import MediaTourActions from "./MediaTourActions";
import ViewMediaTourCard from "./ViewMediaTourCard";
import EditMediaTourCard from "./EditMediaTourCard";


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



const MediaToursPageContent = () => {
    const currentUser = useSelector((state) => state.auth.userInfo) 
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
            renderCell: (params) => <MediaTourActions {...{params, handleOpenEditMediaTour, handleOpenViewMediaTour}} />
        }
        ], [])

    // const currentUserID = 1
    const currentUserID = currentUser?.id ? currentUser?.id : 0
    const { data: media_tours, isLoading, isFetching } = useQuery(["current-user-media-tours", currentUserID], (currentUserID) => getUserMediaTours(currentUserID))

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
                        <AddMediaTourCard/>
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
            <AppBar color='inherit' sx={{ position: 'relative' }}>
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
                        <EditMediaTourCard  editMediaTourObject={editMediaTourObject}  />
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
            <AppBar color='inherit' sx={{ position: 'relative' }}>
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
    </>
  )
}

export default MediaToursPageContent