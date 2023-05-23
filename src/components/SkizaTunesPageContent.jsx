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
import { getUserSkizaTunes } from "@/axios/axios"
import AddSkizaTunesCard from "./AddSkizaTunesCard";
import SkizaTunesActions from "./SkizaTunesActions";
import EditSkizaTunesCard from "./EditSkizaTunesCard";


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



const SKizaTunesPageContent = () => {
    const currentUser = useSelector((state) => state.auth.userInfo) 
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
            renderCell: (params) => <SkizaTunesActions {...{params, handleOpenEditSkizaTunes}} />
        }
        ], [])

    // const currentUserID = 1
    const currentUserID = currentUser?.id ? currentUser?.id : 0
    const { data: skizaTunes, isLoading, isFetching } = useQuery(["current-user-skizaTunes", currentUserID], (currentUserID) => getUserSkizaTunes(currentUserID))

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
            <AppBar color='inherit' sx={{ position: 'relative' }}>
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

    </>
  )
}

export default SKizaTunesPageContent