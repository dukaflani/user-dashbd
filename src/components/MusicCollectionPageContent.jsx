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
import { getUserMusicCollections } from "@/axios/axios"
import AddMusicCollectionsCard from "./AddMusicCollectionsCard";
import MusicCollectionsActions from "./MusicCollectionsActions";
import EditMusicCollectionsCard from "./EditMusicCollectionsCard";


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



const MusicCollectionPageContent = () => {
    const currentUser = useSelector((state) => state.auth.userInfo) 
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
            renderCell: (params) => <MusicCollectionsActions {...{params, handleOpenEditMusicCollections}} />
        }
        ], [])

    // const currentUserID = 1
    const currentUserID = currentUser?.id ? currentUser?.id : 0
    const { data: musicCollections, isLoading, isFetching } = useQuery(["current-user-musicCollections", currentUserID], (currentUserID) => getUserMusicCollections(currentUserID))

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
            <AppBar color='inherit' sx={{ position: 'relative' }}>
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

    </>
  )
}

export default MusicCollectionPageContent