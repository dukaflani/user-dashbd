"use client"

// React Imports
import { useState, forwardRef, useMemo, useCallback } from "react"

// MUI Imports
import { AppBar, Box, Button, Container, Dialog, 
    IconButton, Slide, Stack, Toolbar, Typography } from "@mui/material"

// Data Grid
import { DataGrid } from '@mui/x-data-grid';

// NPM Imports
import { formatDistanceStrict } from "date-fns";
import { useSelector } from "react-redux";

// Tanstack Query
import { useQuery } from "@tanstack/react-query"

// Icons
import {  CloseSharp, VideoCall } from "@mui/icons-material"

// Project Imports
import { getUserStreamingLinks } from "@/axios/axios"
import AddStreamingLinksCard from "./AddStreamingLinksCard";
import StreamingLinksActions from "./StreamingLinksActions";
import EditStreamingLinksCard from "./EditStreamingLinksCard";


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



const StreamingLinksPageContent = () => {
    const currentUser = useSelector((state) => state.auth.userInfo) 
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
            renderCell: (params) => <StreamingLinksActions {...{params, handleOpenEditStreamingLinks}} />
        }
        ], [])

    // const currentUserID = 1
    const currentUserID = currentUser?.id ? currentUser?.id : 0
    const { data: streamingLinks, isLoading, isFetching } = useQuery(["current-user-streamingLinks", currentUserID], (currentUserID) => getUserStreamingLinks(currentUserID))

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
                <Box sx={{ height: 400, maxWidth: 1150 }}>
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

    </>
  )
}

export default StreamingLinksPageContent