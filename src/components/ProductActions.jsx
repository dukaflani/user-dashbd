// MUI Imports
import { Box, IconButton, Stack, Tooltip } from "@mui/material"

// Icons
import { Delete, Edit, VisibilitySharp } from "@mui/icons-material"


const ProductActions = ({ params, handleOpenEditProduct, handleOpenViewProduct }) => {

  return (
    <Box sx={{paddingX: 3}}>
        <Stack direction="row">
            <Tooltip title="View Product">
                <IconButton onClick={() =>handleOpenViewProduct(params?.row)}>
                    <VisibilitySharp/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit Product">
                <IconButton onClick={() =>handleOpenEditProduct(params?.row)}>
                    <Edit color="info"/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete Product">
                <IconButton>
                    <Delete color="warning"/>
                </IconButton>
            </Tooltip>
        </Stack>
    </Box>
  )
}

export default ProductActions