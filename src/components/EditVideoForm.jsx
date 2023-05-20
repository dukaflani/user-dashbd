// MUI Imports
import { Box, Typography } from "@mui/material"


const EditVideoForm = ({ editVideoObject }) => {
  return (
    <Box>
        <Typography variant="h6">{editVideoObject?.genre}</Typography>
        <Typography variant="h6">{editVideoObject?.id}</Typography>
    </Box>
  )
}

export default EditVideoForm