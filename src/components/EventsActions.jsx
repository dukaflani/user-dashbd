// MUI Imports
import { Box, IconButton, Stack, Tooltip } from "@mui/material"

// Icons
import { Delete, Edit, VisibilitySharp } from "@mui/icons-material"


const ProductActions = ({ params, handleOpenEditEvent, handleOpenViewEvent }) => {

  return (
    <Box sx={{paddingX: 3}}>
        <Stack direction="row">
            <Tooltip title="View Event">
                <IconButton onClick={() =>handleOpenViewEvent(params?.row)}>
                    <VisibilitySharp/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit Event">
                <IconButton onClick={() =>handleOpenEditEvent(params?.row)}>
                    <Edit color="info"/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete Event">
                <IconButton>
                    <Delete color="warning"/>
                </IconButton>
            </Tooltip>
        </Stack>
    </Box>
  )
}

export default ProductActions