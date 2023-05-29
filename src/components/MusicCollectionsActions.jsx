// MUI Imports
import { Box, IconButton, Stack, Tooltip } from "@mui/material"

// Icons
import { Delete, Edit, VisibilitySharp } from "@mui/icons-material"


const LyricsActions = ({ params, handleOpenEditMusicCollections, handleDelete }) => {

  return (
    <Box sx={{paddingX: 3}}>
        <Stack direction="row">
            <Tooltip title="Edit Music Collection">
                {/* <IconButton onClick={() =>handleOpenEditMusicCollections(params?.row)}> */}
                <IconButton disabled>
                    <Edit color="info"/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete Music Collection">
                <IconButton onClick={() =>handleDelete(params?.row?.id)}>
                    <Delete color="warning"/>
                </IconButton>
            </Tooltip>
        </Stack>
    </Box>
  )
}

export default LyricsActions