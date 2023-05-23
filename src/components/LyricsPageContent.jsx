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
import { getUserLyrics } from "@/axios/axios"
import AddLyricsCard from "./AddLyricsCard";
import LyricsActions from "./LyricsActions";
import EditLyricsCard from "./EditLyricsCard";


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



const LyricsPageContent = () => {
    const currentUser = useSelector((state) => state.auth.userInfo) 
    const [pageSize, setPageSize] = useState(5)

    // Add Lyrics 
    const [openAddLyricsDialogue, setOpenAddLyricsDialogue] = useState(false)

    const handleOpenAddLyrics = () => { 
        setOpenAddLyricsDialogue(true);
    };
    
    const handleCloseAddLyrics = () => {
        setOpenAddLyricsDialogue(false);
    };


    // Edit Lyrics
    const [openEditLyricsDialogue, setOpenEditLyricsDialogue] = useState(false)
    const [editLyricsObject, setEditLyricsObject] = useState(null)


    const handleOpenEditLyrics = (lyrics_object) => { 
        setOpenEditLyricsDialogue(true);
        setEditLyricsObject(lyrics_object)
    };
    
    const handleCloseEditLyrics = () => {
        setOpenEditLyricsDialogue(false);
    };

    
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
            field: 'vocals',
            headerName: 'Vocals',
        //   width: 100,
            sortable: true,
            editable: false
        },
        {
            field: 'bgvs',
            headerName: 'BGVs',
        //   width: 100,
            sortable: true,
            editable: false
        },
        {
            field: 'audio',
            headerName: 'Audio',
        //   width: 100,
            sortable: true,
            editable: false
        },
        {
            field: 'director',
            headerName: 'Director',
        //   width: 100,
            sortable: true,
            editable: false
        },
        {
            field: 'writer',
            headerName: 'Writer',
        //   width: 100,
            sortable: true,
            editable: false
        },
        {
            field: 'instruments',
            headerName: 'Instruments',
        //   width: 175,
            editable: false
        },
        {
            field: 'producer',
            headerName: 'Executive Producer',
        //   width: 175,
            editable: false
        },
        {
            field: 'url_id',
            headerName: 'URL ID',
        //   width: 175,
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
            renderCell: (params) => <LyricsActions {...{params, handleOpenEditLyrics}} />
        }
        ], [])

    // const currentUserID = 1
    const currentUserID = currentUser?.id ? currentUser?.id : 0
    const { data: lyrics, isLoading, isFetching } = useQuery(["current-user-lyrics", currentUserID], (currentUserID) => getUserLyrics(currentUserID))

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
                    <Typography variant="h6">My Lyrics:</Typography>
                    <Button onClick={handleOpenAddLyrics} startIcon={<VideoCall/>} size='small' variant="outlined">Add Lyrics</Button>
                </Stack>
                <Box sx={{ height: 400, maxWidth: 1150 }}>
                    <DataGrid
                        columns={columns}
                        rows={lyrics ? lyrics : []}
                        getRowId={(row) => row.id}
                        columnVisibilityModel={{
                            id: false,
                            url_id: false,
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
                          noRowsLabel: isLoading ? 'Loading lyrics...' : 'No lyrics found...'
                        }}
                        
                    />
                </Box>
            </Stack>
        </Box>

         {/* Add Lyrics Dialog */}
        <Dialog
            fullScreen
            open={openAddLyricsDialogue}
            onClose={handleCloseAddLyrics}
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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Add Lyrics</Typography>
                    <Button startIcon={<CloseSharp/>} autoFocus color="inherit" onClick={handleCloseAddLyrics}>Close</Button>
                </Toolbar>
            </AppBar>
            <Box>
                <Container maxWidth="md">
                    <Box sx={{ width: '100%', paddingY: 10 }}>
                        <AddLyricsCard/>
                    </Box>
                </Container>
            </Box>
      </Dialog>


        {/*  Edit Lyrics Dialog  */}
        <Dialog
            fullScreen
            open={openEditLyricsDialogue}
            onClose={handleCloseEditLyrics}
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
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Edit Lyrics</Typography>
                    <Button startIcon={<CloseSharp/>} autoFocus color="inherit" onClick={handleCloseEditLyrics}>Close</Button>
                </Toolbar>
            </AppBar>
            <Box>
                <Container maxWidth="md">
                    <Box sx={{ width: '100%', paddingY: 10 }}>
                        <EditLyricsCard  editLyricsObject={editLyricsObject}  />
                    </Box>
                </Container>
            </Box>
      </Dialog>

    </>
  )
}

export default LyricsPageContent