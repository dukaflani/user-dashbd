// MUI Imports
import { Box, IconButton, Stack, Tooltip } from "@mui/material"

// Icons
import { Delete, Edit, VisibilitySharp } from "@mui/icons-material"


const VideoActions = ({ params, handleOpenEditVideo, handleOpenViewVideo, handleDelete }) => {

  return (
    <Box sx={{paddingX: 3}}>
        <Stack direction="row">
            <Tooltip title="View Video">
                <IconButton onClick={() =>handleOpenViewVideo(params?.row)}>
                    <VisibilitySharp/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit Video">
                <IconButton onClick={() =>handleOpenEditVideo(params?.row)}>
                    <Edit color="info"/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete Video">
                <IconButton onClick={() =>handleDelete(params?.row?.id)}>
                    <Delete color="warning"/>
                </IconButton>
            </Tooltip>
        </Stack>
    </Box>
  )
}

export default VideoActions