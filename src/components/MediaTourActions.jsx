// MUI Imports
import { Box, IconButton, Stack, Tooltip } from "@mui/material"

// Icons
import { Delete, Edit, VisibilitySharp } from "@mui/icons-material"


const ProductActions = ({ params, handleOpenEditMediaTour, handleOpenViewMediaTour }) => {

  return (
    <Box sx={{paddingX: 3}}>
        <Stack direction="row">
            <Tooltip title="View Media Tour">
                <IconButton onClick={() =>handleOpenViewMediaTour(params?.row)}>
                    <VisibilitySharp/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit Media Tour">
                <IconButton onClick={() =>handleOpenEditMediaTour(params?.row)}>
                    <Edit color="info"/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete Media Tour">
                <IconButton>
                    <Delete color="warning"/>
                </IconButton>
            </Tooltip>
        </Stack>
    </Box>
  )
}

export default ProductActions