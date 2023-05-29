// MUI Imports
import { Box, IconButton, Stack, Tooltip } from "@mui/material"

// Icons
import { Delete, Edit, VisibilitySharp } from "@mui/icons-material"


const StreamingLinksActions = ({ params, handleOpenEditStreamingLinks, handleDelete }) => {

  return (
    <Box sx={{paddingX: 3}}>
        <Stack direction="row">
            <Tooltip title="Edit Streaming Links">
                {/* <IconButton onClick={() =>handleOpenEditStreamingLinks(params?.row)}> */}
                <IconButton disabled>
                    <Edit color="info"/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete Streaming Links">
                <IconButton onClick={() =>handleDelete(params?.row?.id)}>
                    <Delete color="warning"/>
                </IconButton>
            </Tooltip>
        </Stack>
    </Box>
  )
}

export default StreamingLinksActions