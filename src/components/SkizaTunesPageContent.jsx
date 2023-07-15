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
import { deleteSkizaTunes, getUserSkizaTunes } from "@/axios/axios"
import AddSkizaTunesCard from "./AddSkizaTunesCard";
import SkizaTunesActions from "./SkizaTunesActions";
import EditSkizaTunesCard from "./EditSkizaTunesCard";


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Alert = forwardRef(function Alert(props, ref) {
return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const SKizaTunesPageContent = () => {
    const currentUser = useSelector((state) => state.auth.userInfo) 
    const accessToken = useSelector((state) => state.auth.token)
    const [pageSize, setPageSize] = useState(5)

    // Add Skiza Tunes 
    const [openAddSkizaTunesDialogue, setOpenAddSkizaTunesDialogue] = useState(false)

    const handleOpenAddSkizaTunes = () => { 
        setOpenAddSkizaTunesDialogue(true);
    };
    
    const handleCloseAddSkizaTunes = () => {
        setOpenAddSkizaTunesDialogue(false);
    };


    // Edit Skiza Tunes
    const [openEditSkizaTunesDialogue, setOpenEditSkizaTunesDialogue] = useState(false)
    const [editSkizaTunesObject, setEditSkizaTunesObject] = useState(null)


    const handleOpenEditSkizaTunes = (skizaTunes_object) => { 
        setOpenEditSkizaTunesDialogue(true);
        setEditSkizaTunesObject(skizaTunes_object)
    };
    
    const handleCloseEditSkizaTunes = () => {
        setOpenEditSkizaTunesDialogue(false);
    };

    // Delete Skiza Tune
    const [openMuiSnackbar, setOpenMuiSnackbar] = useState(false)
    const queryClient = useQueryClient()
    const { mutate: deleteMySkizaTunes, isLoading: deleteSkizaTunesLoading } = useMutation(deleteSkizaTunes, {
        onSuccess: (data, _variables, _context) => {
            queryClient.invalidateQueries('current-user-skizaTunes')
            setOpenMuiSnackbar(true)
        },
        onError: (error, _variables, _context) => {
            // console.log("SkizaTunes deleted error:", error?.response?.data?.detail)
        }
    })

    const handleCloseMuiSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpenMuiSnackbar(false);
        };

    const handleDelete = (id) => {
        deleteMySkizaTunes({ id, accessToken })
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
            renderCell: (params) => <SkizaTunesActions {...{params, handleOpenEditSkizaTunes, handleDelete }} />
        }
        ], [])

    // const currentUserID = 1
    const currentUserID = currentUser?.id
    const { data: skizaTunes, isLoading, isFetching } = useQuery(["current-user-skizaTunes", currentUserID], (currentUserID) => getUserSkizaTunes(currentUserID), {
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
                    <Typography variant="h6">My Skiza Tunes:</Typography>
                    <Button onClick={handleOpenAddSkizaTunes} startIcon={<VideoCall/>} size='small' variant="outlined">Add Skiza Tunes</Button>
                </Stack>
                <Box sx={{ height: 400, maxWidth: 1150 }}>
                    <DataGrid
                        columns={columns}
                        rows={skizaTunes ? skizaTunes : []}
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
                          noRowsLabel: isLoading ? 'Loading skiza tunes' : 'No skiza tunes found...'
                        }}
                        
                    />
                </Box>
            </Stack>
        </Box>

         {/* Add Skiza Tunes Dialog */}
        <Dialog
            fullScreen
            open={openAddSkizaTunesDialogue}
            onClose={handleCloseAddSkizaTunes}
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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Add Skiza Tunes</Typography>
                    <Button startIcon={<CloseSharp/>} autoFocus color="inherit" onClick={handleCloseAddSkizaTunes}>Close</Button>
                </Toolbar>
            </AppBar>
            <Box>
                <Container maxWidth="md">
                    <Box sx={{ width: '100%', paddingY: 10 }}>
                        <AddSkizaTunesCard/>
                    </Box>
                </Container>
            </Box>
      </Dialog>


        {/*  Edit Skiza Tunes Dialog  */}
        <Dialog
            fullScreen
            open={openEditSkizaTunesDialogue}
            onClose={handleCloseEditSkizaTunes}
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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Edit Skiza Tunes</Typography>
                    <Button startIcon={<CloseSharp/>} autoFocus color="inherit" onClick={handleCloseEditSkizaTunes}>Close</Button>
                </Toolbar>
            </AppBar>
            <Box>
                <Container maxWidth="md">
                    <Box sx={{ width: '100%', paddingY: 10 }}>
                        <EditSkizaTunesCard  editSkizaTunesObject={editSkizaTunesObject}  />
                    </Box>
                </Container>
            </Box>
      </Dialog>

      
      {/* Add Delete Loading Dialogue */}
      <Dialog
            open={deleteSkizaTunesLoading}
            aria-labelledby="alert-dialog-title"    
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle color="danger" id="alert-dialog-title">
            {"Deleting Skiza Tunes..."}
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
                  Skiza Tunes Deleted Successfully!
              </Alert>
      </Snackbar>
    </>
  )
}

export default SKizaTunesPageContent