"use client"

// React Imports
import { useState, forwardRef, useMemo, useCallback } from "react";

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

// TanStack/React-Query
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Icons
import {  CloseSharp, VideoCall } from "@mui/icons-material"

// Project Imports
import { deleteVideo, getUserVideos } from "@/axios/axios";
import AddVideoCard from "./AddVideoCard";
import VideoActions from "./VideoActions";
import ViewVideoCard from "./ViewVideoCard";
import EditVideoCard from "./EditVideoCard";



const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const VideoPageContent = () => {
    const currentUser = useSelector((state) => state.auth.userInfo) 
    const accessToken = useSelector((state) => state.auth.token)
    const [pageSize, setPageSize] = useState(5)
    
    // Add Video 
    const [openAddVideoDialogue, setOpenAddVideoDialogue] = useState(false)
    

    const handleOpenAddVideo = () => { 
        setOpenAddVideoDialogue(true);
    };
    
    const handleCloseAddVideo = () => {
        setOpenAddVideoDialogue(false);
    };
    
    
    // Edit Video
    const [openEditVideoDialogue, setOpenEditVideoDialogue] = useState(false)
    const [editVideoObject, setEditVideoObject] = useState(null)

    const handleOpenEditVideo = (video_object) => { 
        setOpenEditVideoDialogue(true);
        setEditVideoObject(video_object)
    };
    
    const handleCloseEditVideo = () => {
        setOpenEditVideoDialogue(false);
    };


    // View Video
    const [openViewVideoDialog, setOpenViewVideoDialog] = useState(false)
    const [viewVideoObject, setViewVideoObject] = useState(null)

    const handleOpenViewVideo = (video_object) => { 
      setOpenViewVideoDialog(true)
      setViewVideoObject(video_object)
    }

    const handleCloseViewVideo = () => {
      setOpenViewVideoDialog(false)
    }


    // Delete Video
    const [openMuiSnackbar, setOpenMuiSnackbar] = useState(false)
    const queryClient = useQueryClient()
    const { mutate: deleteMyVideo, isLoading: deleteVideoLoading } = useMutation(deleteVideo, {
      onSuccess: (data, _variables, _context) => {
          queryClient.invalidateQueries('current-user-videos')
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
      deleteMyVideo({ id, accessToken })
    }



      const columns = useMemo(
        () => [
            { field: 'id', headerName: 'ID', sortable: false, filterable: false },
            { field: 'video_username', headerName: 'Username', sortable: false, filterable: false },
            {
                field: 'thumbnail',
                headerName: 'Thumbnail',
                // width: 100,
                renderCell: (params) => <Avatar sx={{ height: 50, width: 80}} variant="rounded"  src={params.row.thumbnail} />,
                sortable: false,
                filterable: false
              },
            {
              field: 'title',
              headerName: 'Video Title',
              width: 250,
              sortable: true,
              editable: false
            },
            {
              field: 'genre_title',
              headerName: 'Genre',
            //   width: 100,
              sortable: true,
              editable: false
            },
            {
              field: 'views_count',
              headerName: 'Views',
              width:80,
              sortable: true,
              type: 'number',
              renderCell: (params) => params.row.views_count < 1000 || params.row.views_count % 10 === 0 ? numeral(params.row.views_count).format('0a') : numeral(params.row.views_count).format('0.0a'),
              editable: false
            },
            // 
            {
              field: 'description',
              headerName: 'Description',
            //   width: 175,
              editable: false
            },
            {
              field: 'product_title',
              headerName: 'Product',
            //   width: 175,
              editable: false
            },
            {
              field: 'album_title',
              headerName: 'Album',
            //   width: 175,
              sortable: true,
              editable: false
            },
            {
              field: 'skiza_title',
              headerName: 'Skiza Tune',
            //   width: 175,
              sortable: true,
              editable: false
            },
            {
              field: 'links_title',
              headerName: 'Streaming Links',
            //   width: 175,
              sortable: true,
              editable: false
            },
            {
              field: 'lyrics_title',
              headerName: 'Lyrics',
            //   width: 175,
              sortable: true,
              editable: false
            },
            {
              field: 'song_title',
              headerName: 'Song Title',
            //   width: 175,
              sortable: true,
              editable: false
            },
            {
              field: 'genre',
              headerName: 'Genre',
            //   width: 175,
              sortable: true,
              editable: false
            },
            {
              field: 'skiza',
              headerName: 'Skiza Tune',
            //   width: 175,
              sortable: true,
              editable: false
            },
            {
              field: 'lyrics',
              headerName: 'Lyrics',
            //   width: 175,
              sortable: true,
              editable: false
            },
            {
              field: 'album',
              headerName: 'Album',
            //   width: 175,
              sortable: true,
              editable: false
            },
            {
              field: 'like_count',
              headerName: 'Likes',
            //   width: 175,
              sortable: true,
              editable: false
            },
            {
              field: 'dislike_count',
              headerName: 'Dislikes',
            //   width: 175,
              sortable: true,
              editable: false
            },
            {
              field: 'product',
              headerName: 'Product',
            //   width: 175,
              sortable: true,
              editable: false
            },
            {
              field: 'links',
              headerName: 'Streaming Links',
            //   width: 175,
              sortable: true,
              editable: false
            },
            {
              field: 'youtube_id',
              headerName: 'YouTube ID',
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
              field: 'is_sponsored',
              headerName: 'Sponsored',
            //   width: 100,
              type: 'boolean',
              sortable: true,
              editable: false
            },
            {
                field: 'actions',
                headerName: 'Actions',
                type: 'actions', 
                width: 150,
                renderCell: (params) => <VideoActions {...{params, handleOpenEditVideo, handleOpenViewVideo, handleDelete}} />
            }
          ], [])

      // const currentUserID = 1
      const currentUserID = currentUser?.id
      const { data: videos, isLoading, isFetching } = useQuery(["current-user-videos", currentUserID], (currentUserID) => getUserVideos(currentUserID), {
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
                    <Typography variant="h6">My Videos:</Typography>
                    <Button onClick={handleOpenAddVideo} startIcon={<VideoCall/>} size='small' variant="outlined">Add Video</Button>
                </Stack>
                <Box sx={{ height: 400, maxWidth: 1150 }}>
                    <DataGrid
                        columns={columns}
                        rows={videos ? videos : []}
                        getRowId={(row) => row.id}
                        columnVisibilityModel={{
                            id: false,
                            song_title: false,
                            youtube_id: false,
                            url_id: false,
                            like_count: false,
                            dislike_count: false,
                            links: false,
                            product: false,
                            lyrics: false,
                            album: false,
                            skiza: false,
                            genre: false,
                            video_username: false,
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
                          noRowsLabel: isLoading ? 'Loading videos...' : 'No videos found...'
                        }}
                        
                    />
                </Box>
            </Stack>
        </Box>

         {/* Add Video Dialog */}
        <Dialog
            fullScreen
            open={openAddVideoDialogue}
            onClose={handleCloseAddVideo}
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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Add Video</Typography>
                    <Button startIcon={<CloseSharp/>} autoFocus color="inherit" onClick={handleCloseAddVideo}>Close</Button>
                </Toolbar>
            </AppBar>
            <Box>
                <Container maxWidth="md">
                    <Box sx={{ width: '100%', paddingY: 10 }}>
                        <AddVideoCard  setOpenAddVideoDialogue={setOpenAddVideoDialogue} />
                    </Box>
                </Container>
            </Box>
        </Dialog>


        {/*  Edit Video Dialog  */}
        <Dialog
            fullScreen
            open={openEditVideoDialogue}
            onClose={handleCloseEditVideo}
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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Edit Video</Typography>
                    <Button startIcon={<CloseSharp/>} autoFocus color="inherit" onClick={handleCloseEditVideo}>Close</Button>
                </Toolbar>
            </AppBar>
            <Box>
                <Container maxWidth="md">
                    <Box sx={{ width: '100%', paddingY: 10 }}>
                        <EditVideoCard  editVideoObject={editVideoObject} setOpenEditVideoDialogue={setOpenEditVideoDialogue}  />
                    </Box>
                </Container>
            </Box>
        </Dialog>


         {/* View Video Dialog  */}
        <Dialog
            fullScreen
            open={openViewVideoDialog}   
            onClose={handleCloseViewVideo}
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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">View Video</Typography>
                    <Button startIcon={<CloseSharp/>} autoFocus color="inherit" onClick={handleCloseViewVideo}>Close</Button>
                </Toolbar>
            </AppBar>
            <Box>
                <Container maxWidth="md">
                    <Box sx={{ width: '100%', paddingY: 10 }}>
                        <ViewVideoCard viewVideoObject={viewVideoObject} />
                    </Box>
                </Container>
            </Box>
        </Dialog>

       {/* Add Delete Loading Dialogue */} 
       <Dialog
            open={deleteVideoLoading}
            aria-labelledby="alert-dialog-title"    
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle color="danger" id="alert-dialog-title">
            {"Deleting Video..."}
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
                  Video Deleted Successfully!
              </Alert>
      </Snackbar>
    </>
  )
}

export default VideoPageContent