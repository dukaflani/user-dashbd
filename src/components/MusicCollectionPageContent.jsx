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
import numeral from "numeral";
import { formatDistanceStrict } from "date-fns";
import { useSelector } from "react-redux";

// Tanstack Query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// Icons
import {  CloseSharp, VideoCall } from "@mui/icons-material"

// Project Imports
import { deleteMusicCollection, getUserMusicCollections } from "@/axios/axios"
import AddMusicCollectionsCard from "./AddMusicCollectionsCard";
import MusicCollectionsActions from "./MusicCollectionsActions";
import EditMusicCollectionsCard from "./EditMusicCollectionsCard";


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Alert = forwardRef(function Alert(props, ref) {
return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const MusicCollectionPageContent = () => {
    const currentUser = useSelector((state) => state.auth.userInfo) 
    const accessToken = useSelector((state) => state.auth.token)
    const [pageSize, setPageSize] = useState(5)

    // Add Music Collection 
    const [openAddMusicCollectionsDialogue, setOpenAddMusicCollectionsDialogue] = useState(false)

    const handleOpenAddMusicCollections = () => { 
        setOpenAddMusicCollectionsDialogue(true);
    };
    
    const handleCloseAddMusicCollections = () => {
        setOpenAddMusicCollectionsDialogue(false);
    };


    // Edit Music Collection
    const [openEditMusicCollectionsDialogue, setOpenEditMusicCollectionsDialogue] = useState(false)
    const [editMusicCollectionsObject, setEditMusicCollectionsObject] = useState(null)


    const handleOpenEditMusicCollections = (musicCollections_object) => { 
        setOpenEditMusicCollectionsDialogue(true);
        setEditMusicCollectionsObject(musicCollections_object)
    };
    
    const handleCloseEditMusicCollections = () => {
        setOpenEditMusicCollectionsDialogue(false);
    };


    // Delete Music Collection
    const [openMuiSnackbar, setOpenMuiSnackbar] = useState(false)
    const queryClient = useQueryClient()
    const { mutate: deleteMyMusicCollection, isLoading: deleteMusicCollectionLoading } = useMutation(deleteMusicCollection, {
      onSuccess: (data, _variables, _context) => {
        queryClient.invalidateQueries('current-user-musicCollections')
        setOpenMuiSnackbar(true)
      },
      onError: (error, _variables, _context) => {
          console.log("MusicCollection deleted error:", error?.response?.data?.detail)
      }
  })

    const handleCloseMuiSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenMuiSnackbar(false);
      };

    const handleDelete = (id) => {
      deleteMyMusicCollection({ id, accessToken })
    }

    
    const columns = useMemo(
    () => [
        { field: 'id', headerName: 'ID', sortable: false, filterable: false },
        { field: 'album_type_title', headerName: 'Album Type Title', sortable: false, filterable: false },
        { field: 'album_type_id', headerName: 'Album Type ID', sortable: false, filterable: false },
        { field: 'option_type_title', headerName: 'Option Type Title', sortable: false, filterable: false },
        { field: 'option_type_id', headerName: 'Option Type ID', sortable: false, filterable: false },
        {
            field: 'cover',
            headerName: 'Album Cover',
            // width: 100,
            renderCell: (params) => <Avatar sx={{ height: 50, width: 80}} variant="rounded"  src={params.row.cover} />,
            sortable: false,
            filterable: false
        },
        {
            field: 'title',
            headerName: 'Music Collection Title',
            width: 250,
            sortable: true,
            editable: false
        },
        {
            field: 'album_type',
            headerName: 'Collection Type',
        //   width: 100,
            sortable: true,
            editable: false
        },
        {
            field: 'option_type',
            headerName: 'Host Service',
        //   width: 100,
            sortable: true,
            editable: false
        },
        {
            field: 'link_title',
            headerName: 'Hosted On',
        //   width: 100,
            sortable: true,
            editable: false
        },
        {
            field: 'link',
            headerName: 'Link',
        //   width: 100,
            sortable: true,
            editable: false
        },
        {
            field: 'url_id',
            headerName: 'URL ID',
        //   width: 100,
            sortable: true,
            editable: false
        },
        {
            field: 'track_count',
            headerName: 'Track Count',
        //   width: 175,
            sortable: true,
            renderCell: (params) => params.row.track_count < 1000 || params.row.track_count % 10 === 0 ? numeral(params.row.track_count).format('0a') : numeral(params.row.track_count).format('0.0a'),
            editable: false
        },
        {
            field: 'is_sponsored',
            headerName: 'Sponsored',
        //   width: 175,
            type: 'boolean',
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
            renderCell: (params) => <MusicCollectionsActions {...{params, handleOpenEditMusicCollections, handleDelete }} />
        }
        ], [])

    // const currentUserID = 1
    const currentUserID = currentUser?.id
    const { data: musicCollections, isLoading, isFetching } = useQuery(["current-user-musicCollections", currentUserID], (currentUserID) => getUserMusicCollections(currentUserID), {
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
                    <Typography variant="h6">My Music Collections:</Typography>
                    <Button onClick={handleOpenAddMusicCollections} startIcon={<VideoCall/>} size='small' variant="outlined">Add Music Collection</Button>
                </Stack>
                <Box sx={{ height: 400, maxWidth: 1150 }}>
                    <DataGrid
                        columns={columns}
                        rows={musicCollections ? musicCollections : []}
                        getRowId={(row) => row.id}
                        columnVisibilityModel={{
                            id: false,
                            url_id: false,
                            link: false,
                            album_type_title: false,
                            album_type_id: false,
                            option_type_title: false,
                            option_type_id: false,
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
                          noRowsLabel: isLoading ? 'Loading music collections' : 'No music collections found...'
                        }}
                        
                    />
                </Box>
            </Stack>
        </Box>

         {/* Add Music Collections Dialog */}
        <Dialog
            fullScreen
            open={openAddMusicCollectionsDialogue}
            onClose={handleCloseAddMusicCollections}
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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Add Music Collection</Typography>
                    <Button startIcon={<CloseSharp/>} autoFocus color="inherit" onClick={handleCloseAddMusicCollections}>Close</Button>
                </Toolbar>
            </AppBar>
            <Box>
                <Container maxWidth="md">
                    <Box sx={{ width: '100%', paddingY: 10 }}>
                        <AddMusicCollectionsCard/>
                    </Box>
                </Container>
            </Box>
      </Dialog>


        {/*  Edit Music Collection Dialog  */}
        <Dialog
            fullScreen
            open={openEditMusicCollectionsDialogue}
            onClose={handleCloseEditMusicCollections}
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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Edit Music Collection</Typography>
                    <Button startIcon={<CloseSharp/>} autoFocus color="inherit" onClick={handleCloseEditMusicCollections}>Close</Button>
                </Toolbar>
            </AppBar>
            <Box>
                <Container maxWidth="md">
                    <Box sx={{ width: '100%', paddingY: 10 }}>
                        <EditMusicCollectionsCard  editMusicCollectionsObject={editMusicCollectionsObject}  />
                    </Box>
                </Container>
            </Box>
      </Dialog>

      
      {/* Add Delete Loading Dialogue */}
      <Dialog
            open={deleteMusicCollectionLoading}
            aria-labelledby="alert-dialog-title"    
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle color="danger" id="alert-dialog-title">
            {"Deleting Music Collection..."}
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
                  Music Collection Deleted Successfully!
              </Alert>
      </Snackbar>
    </>
  )
}

export default MusicCollectionPageContent