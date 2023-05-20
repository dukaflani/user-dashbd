"use client"

// React Imports
import React, { useState, forwardRef, useMemo, useCallback } from "react";

// MUI Imports
import { AppBar, Avatar, Box, Button, Container, Dialog, 
  IconButton, Slide, Stack, Toolbar, Typography } from "@mui/material"

// Data Grid
import { DataGrid } from '@mui/x-data-grid';

// NPM Imports
import numeral from "numeral";
import { formatDistanceStrict } from "date-fns";
import { useSelector } from "react-redux";

// TanStack/React-Query
import { useQuery } from '@tanstack/react-query';

// Icons
import {  CloseSharp, VideoCall } from "@mui/icons-material"

// Project Imports
import AddVideoCard from "./AddVideoCard";
import VideoActions from "./VideoActions";
import EditVideoForm from "./EditVideoForm";
import ViewVideoCard from "./ViewVideoCard";
import { getUserVideos } from "@/axios/axios";


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


const VideoPageContent = () => {
  const userProfile = useSelector((state) => state.auth.profileInfo) 
  const currentUser = useSelector((state) => state.auth.userInfo) 
  console.log("user profile video component:", userProfile)
  console.log("user info video component:", currentUser)
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



      const columns = useMemo(
        () => [
            { field: 'id', headerName: 'ID', sortable: false, filterable: false },
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
              width:50,
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
                renderCell: (params) => <VideoActions {...{params, handleOpenEditVideo, handleOpenViewVideo}} />
            }
          ], [])

      const currentUserID = 1
      // const currentUserID = currentUser?.id ? currentUser?.id : 0
      const { data: videos, isLoading, isFetching } = useQuery(["current-user-videos", currentUserID], (currentUserID) => getUserVideos(currentUserID))
      console.log("rows value:", videos)

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
                            links: false,
                            product: false,
                            lyrics: false,
                            album: false,
                            skiza: false,
                            genre: false,
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
                          noRowsLabel: 'No videos found...'
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
                        <AddVideoCard/>
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
            <AppBar color='inherit' sx={{ position: 'relative' }}>
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
                    <Box sx={{ width: '100%', paddingTop: 5 }}>
                      <Stack spacing={1}>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="subtitle2" component="div">Edit Video form starts here</Typography>
                        <EditVideoForm editVideoObject={editVideoObject} />
                      </Stack>
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
            <AppBar color='inherit' sx={{ position: 'relative' }}>
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
                    <Box sx={{ width: '100%', paddingTop: 5 }}>
                      <Stack spacing={1}>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="subtitle2" component="div">View Video card starts here</Typography>
                        <ViewVideoCard viewVideoObject={viewVideoObject} />
                      </Stack>
                    </Box>
                </Container>
            </Box>
      </Dialog>
    </>
  )
}

export default VideoPageContent