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
import { deleteEvent, getUserEvents } from "@/axios/axios"
import AddEventCard from "./AddEventCard";
import EventsActions from "./EventsActions";
import ViewEventCard from "./ViewEventCard";
import EditEventCard from "./EditEventCard";


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Alert = forwardRef(function Alert(props, ref) {
return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const MobileEventsPageContent = () => {
    const currentUser = useSelector((state) => state.auth.userInfo) 
    const accessToken = useSelector((state) => state.auth.token)
    const [pageSize, setPageSize] = useState(5)

    // Add Events 
    const [openAddEventDialogue, setOpenAddEventDialogue] = useState(false)

    const handleOpenAddEvent = () => { 
        setOpenAddEventDialogue(true);
    };
    
    const handleCloseAddEvent = () => {
        setOpenAddEventDialogue(false);
    };


    // Edit Events
    const [openEditEventDialogue, setOpenEditEventDialogue] = useState(false)
    const [editEventObject, setEditEventObject] = useState(null)


    const handleOpenEditEvent = (event_object) => { 
        setOpenEditEventDialogue(true);
        setEditEventObject(event_object)
    };
    
    const handleCloseEditEvent = () => {
        setOpenEditEventDialogue(false);
    };


    // View Events
    const [openViewEventDialog, setOpenViewEventDialog] = useState(false)
    const [viewEventObject, setViewEventObject] = useState(null)


    const handleOpenViewEvent = (event_object) => { 
        setOpenViewEventDialog(true)
        setViewEventObject(event_object)
      }
  
      const handleCloseViewEvent = () => {
        setOpenViewEventDialog(false)
      }


    // Delete Video
    const [openMuiSnackbar, setOpenMuiSnackbar] = useState(false)
    const queryClient = useQueryClient()
    const { mutate: deleteMyEvent, isLoading: deleteEventLoading } = useMutation(deleteEvent, {
        onSuccess: (data, _variables, _context) => {
            queryClient.invalidateQueries('current-user-events')
            setOpenMuiSnackbar(true)
      },
      onError: (error, _variables, _context) => {
          console.log("event deleted error:", error?.response?.data?.detail)
      }
  })

    const handleCloseMuiSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenMuiSnackbar(false);
      };

    const handleDelete = (id) => {
        deleteMyEvent({ id, accessToken })
    }

    
    const columns = useMemo(
    () => [
        { field: 'id', headerName: 'ID', sortable: false, filterable: false },
        { field: 'event_category_id', headerName: 'Event Category ID', sortable: false, filterable: false },
        { field: 'event_category_title', headerName: 'Event Category Title', sortable: false, filterable: false },
        { field: 'event_ticket_info_id', headerName: 'Event Ticket Info ID', sortable: false, filterable: false },
        { field: 'event_ticket_info_title', headerName: 'Event Ticket Info Title', sortable: false, filterable: false },
        { field: 'local_currency_id', headerName: 'Currency ID', sortable: false, filterable: false },
        { field: 'local_currency_title', headerName: 'Currency Title', sortable: false, filterable: false },
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
            headerName: 'Event Title',
            width: 250,
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
            field: 'city',
            headerName: 'City',
        //   width: 100,
            sortable: true,
            editable: false
        },
        {
            field: 'event_category',
            headerName: 'Category',
        //   width: 100,
            sortable: true,
            editable: false
        },
        {
            field: 'event_organizer',
            headerName: 'Organizer',
        //   width: 100,
            sortable: true,
            editable: false
        },
        {
            field: 'event_ticket_info',
            headerName: 'Ticket Info',
        //   width: 100,
            sortable: true,
            editable: false
        },
        // Add Price + Currency in this column
        // {
        //     field: 'fullName',
        //     headerName: 'Full name',
        //     description: 'This column has a value getter and is not sortable.',
        //     sortable: false,
        //     width: 160,
        //     valueGetter: (params) =>
        //       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        //   },
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
            field: 'ticket_platform',
            headerName: 'Ticketing Platform',
        //   width: 175,
            editable: false
        },
        {
            field: 'local_currency',
            headerName: 'Currency',
        //   width: 175,
            editable: false
        },
        {
            field: 'date',
            headerName: 'Date',
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
            field: 'venue',
            headerName: 'Venue',
        //   width: 175,
            editable: false
        },
        {
            field: 'location',
            headerName: 'Location',
        //   width: 175,
            sortable: true,
            editable: false
        },
        {
            field: 'time',
            headerName: 'Time',
        //   width: 175,
            sortable: true,
            editable: false
        },
        {
            field: 'ticket_link',
            headerName: 'Ticket Link',
            width: 175,
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
            field: 'posted',
            headerName: 'Posted',
        //   width: 100,
            renderCell: (params) => formatDistanceStrict(new Date(params.row.posted), new Date(), {addSuffix: true, }),
            editable: false
        },
        {
            field: 'is_featured',
            headerName: 'Featured',
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
            headerName: 'Global Event',
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
            renderCell: (params) => <EventsActions {...{params, handleOpenEditEvent, handleOpenViewEvent, handleDelete}} />
        }
        ], [])

    // const currentUserID = 1
    const currentUserID = currentUser?.id 
    const { data: events, isLoading, isFetching } = useQuery(["current-user-events", currentUserID], (currentUserID) => getUserEvents(currentUserID), {
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
                    <Typography variant="h6">My Events:</Typography>
                    <Button onClick={handleOpenAddEvent} startIcon={<VideoCall/>} size='small' variant="outlined">Add Event</Button>
                </Stack>
                <Box sx={{ height: 400, width: {xs:340, sm: 560} }}>
                    <DataGrid
                        columns={columns}
                        rows={events ? events : []}
                        getRowId={(row) => row.id}
                        columnVisibilityModel={{
                            id: false,
                            venue: false,
                            country: false,
                            location: false,
                            local_price: false,
                            local_currency: false,
                            event_ticket_info: false,
                            time: false,
                            ticket_link: false,
                            url_id: false,
                            event_category_id: false,
                            event_category_title: false,
                            event_ticket_info_id: false,
                            event_ticket_info_title: false,
                            local_currency_id: false,
                            local_currency_title: false,
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
                          noRowsLabel: isLoading ? 'Loading events...' : 'No events found...'
                        }}
                        
                    />
                </Box>
            </Stack>
        </Box>

         {/* Add Event Dialog */}
        <Dialog
            fullScreen
            open={openAddEventDialogue}
            onClose={handleCloseAddEvent}
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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Add Event</Typography>
                    <Button startIcon={<CloseSharp/>} autoFocus color="inherit" onClick={handleCloseAddEvent}>Close</Button>
                </Toolbar>
            </AppBar>
            <Box>
                <Container maxWidth="md">
                    <Box sx={{ width: '100%', paddingY: 10 }}>
                        <AddEventCard setOpenAddEventDialogue={setOpenAddEventDialogue} />
                    </Box>
                </Container>
            </Box>
      </Dialog>


        {/*  Edit Event Dialog  */}
        <Dialog
            fullScreen
            open={openEditEventDialogue}
            onClose={handleCloseEditEvent}
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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Edit Event</Typography>
                    <Button startIcon={<CloseSharp/>} autoFocus color="inherit" onClick={handleCloseEditEvent}>Close</Button>
                </Toolbar>
            </AppBar>
            <Box>
                <Container maxWidth="md">
                    <Box sx={{ width: '100%', paddingY: 10 }}>
                        <EditEventCard  editEventObject={editEventObject} setOpenEditEventDialogue={setOpenEditEventDialogue}  />
                    </Box>
                </Container>
            </Box>
      </Dialog>


         {/* View Event Dialog  */}
        <Dialog
            fullScreen
            open={openViewEventDialog}   
            onClose={handleCloseViewEvent}
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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">View Event</Typography>
                    <Button startIcon={<CloseSharp/>} autoFocus color="inherit" onClick={handleCloseViewEvent}>Close</Button>
                </Toolbar>
            </AppBar>
            <Box>
                <Container maxWidth="md">
                    <Box sx={{ width: '100%', paddingY: 10 }}>
                        <ViewEventCard viewEventObject={viewEventObject} />
                    </Box>
                </Container>
            </Box>
      </Dialog>

      {/* Add Delete Loading Dialogue */}
      <Dialog
            open={deleteEventLoading}
            aria-labelledby="alert-dialog-title"    
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle color="danger" id="alert-dialog-title">
            {"Deleting Event..."}
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
                  Event Deleted Successfully!
              </Alert>
      </Snackbar>
    </>
  )
}

export default MobileEventsPageContent