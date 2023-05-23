// MUI Imports
import { Box, IconButton, Stack, Tooltip } from "@mui/material"

// Icons
import { Delete, Edit, VisibilitySharp } from "@mui/icons-material"


const SkizaTunesActions = ({ params, handleOpenEditSkizaTunes }) => {

  return (
    <Box sx={{paddingX: 3}}>
        <Stack direction="row">
            <Tooltip title="Edit Skiza Tunes">
                {/* <IconButton onClick={() =>handleOpenEditSkizaTunes(params?.row)}> */}
                <IconButton disabled>
                    <Edit color="info"/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete Skiza Tunes">
                <IconButton>
                    <Delete color="warning"/>
                </IconButton>
            </Tooltip>
        </Stack>
    </Box>
  )
}

export default SkizaTunesActions