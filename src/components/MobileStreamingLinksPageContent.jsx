"use client"

// React Imports
import { useState, forwardRef, useMemo, useCallback } from "react"

// MUI Imports
import { AppBar, Box, Button, Container, Dialog, CircularProgress,
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
import { deleteStreamingLinks, getUserStreamingLinks } from "@/axios/axios"
import AddStreamingLinksCard from "./AddStreamingLinksCard";
import StreamingLinksActions from "./StreamingLinksActions";
import EditStreamingLinksCard from "./EditStreamingLinksCard";


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Alert = forwardRef(function Alert(props, ref) {
return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const MobileStreamingLinksPageContent = () => {
    const currentUser = useSelector((state) => state.auth.userInfo) 
    const accessToken = useSelector((state) => state.auth.token)
    const [pageSize, setPageSize] = useState(5)

    // Add Streaming Links 
    const [openAddStreamingLinksDialogue, setOpenAddStreamingLinksDialogue] = useState(false)

    const handleOpenAddStreamingLinks = () => { 
        setOpenAddStreamingLinksDialogue(true);
    };
    
    const handleCloseAddStreamingLinks = () => {
        setOpenAddStreamingLinksDialogue(false);
    };


    // Edit Streaming Links
    const [openEditStreamingLinksDialogue, setOpenEditStreamingLinksDialogue] = useState(false)
    const [editStreamingLinksObject, setEditStreamingLinksObject] = useState(null)


    const handleOpenEditStreamingLinks = (streamingLinks_object) => { 
        setOpenEditStreamingLinksDialogue(true);
        setEditStreamingLinksObject(streamingLinks_object)
    };
    
    const handleCloseEditStreamingLinks = () => {
        setOpenEditStreamingLinksDialogue(false);
    };


    // Delete Streaming Links
    const [openMuiSnackbar, setOpenMuiSnackbar] = useState(false)
    const queryClient = useQueryClient()
    const { mutate: deleteMyStreamingLinks, isLoading: deleteStreamingLinksLoading } = useMutation(deleteStreamingLinks, {
      onSuccess: (data, _variables, _context) => {
        queryClient.invalidateQueries('current-user-streamingLinks')
        setOpenMuiSnackbar(true)
      },
      onError: (error, _variables, _context) => {
          console.log("StreamingLinks deleted error:", error?.response?.data?.detail)
      }
  })

    const handleCloseMuiSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenMuiSnackbar(false);
      };

    const handleDelete = (id) => {
      deleteMyStreamingLinks({ id, accessToken })
    }

    
    const columns = useMemo(
    () => [
        { field: 'id', headerName: 'ID', sortable: false, filterable: false },
        {
            field: 'title',
            headerName: 'Lyrics Title',
            width: 250,
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
            field: 'actions',
            headerName: 'Actions',
            type: 'actions', 
            width: 150,
            renderCell: (params) => <StreamingLinksActions {...{params, handleOpenEditStreamingLinks, handleDelete }} />
        }
        ], [])

    // const currentUserID = 1
    const currentUserID = currentUser?.id
    const { data: streamingLinks, isLoading, isFetching } = useQuery(["current-user-streamingLinks", currentUserID], (currentUserID) => getUserStreamingLinks(currentUserID), {
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
                    <Typography variant="h6">My Streaming Links:</Typography>
                    <Button onClick={handleOpenAddStreamingLinks} startIcon={<VideoCall/>} size='small' variant="outlined">Add Streaming Links</Button>
                </Stack>
                <Box sx={{ height: 400, width: {xs:340, sm: 560} }}>
                    <DataGrid
                        columns={columns}
                        rows={streamingLinks ? streamingLinks : []}
                        getRowId={(row) => row.id}
                        columnVisibilityModel={{
                            id: false,
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
                          noRowsLabel: isLoading ? 'Loading streaming links...' : 'No streaming links found...'
                        }}
                        
                    />
                </Box>
            </Stack>
        </Box>

         {/* Add Streaming Links Dialog */}
        <Dialog
            fullScreen
            open={openAddStreamingLinksDialogue}
            onClose={handleCloseAddStreamingLinks}
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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Add Streaming Links</Typography>
                    <Button startIcon={<CloseSharp/>} autoFocus color="inherit" onClick={handleCloseAddStreamingLinks}>Close</Button>
                </Toolbar>
            </AppBar>
            <Box>
                <Container maxWidth="md">
                    <Box sx={{ width: '100%', paddingY: 10 }}>
                        <AddStreamingLinksCard/>
                    </Box>
                </Container>
            </Box>
      </Dialog>


        {/*  Edit Streaming Links Dialog  */}
        <Dialog
            fullScreen
            open={openEditStreamingLinksDialogue}
            onClose={handleCloseEditStreamingLinks}
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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Edit Streaming Links</Typography>
                    <Button startIcon={<CloseSharp/>} autoFocus color="inherit" onClick={handleCloseEditStreamingLinks}>Close</Button>
                </Toolbar>
            </AppBar>
            <Box>
                <Container maxWidth="md">
                    <Box sx={{ width: '100%', paddingY: 10 }}>
                        <EditStreamingLinksCard  editStreamingLinksObject={editStreamingLinksObject}  />
                    </Box>
                </Container>
            </Box>
      </Dialog>

      
       {/* Add Delete Loading Dialogue */}
       <Dialog
            open={deleteStreamingLinksLoading}
            aria-labelledby="alert-dialog-title"    
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle color="danger" id="alert-dialog-title">
            {"Deleting Streaming Links..."}
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
                  Streaming Links Deleted Successfully!
              </Alert>
      </Snackbar>
    </>
  )
}

export default MobileStreamingLinksPageContent