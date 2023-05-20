// MUI Imports
import { Box, Typography } from "@mui/material"


const ViewVideoCard = ({ viewVideoObject }) => {
  return (
    <Box>
        <Typography variant="h6">{viewVideoObject?.id}</Typography>
        <Typography variant="h6">{viewVideoObject?.title}</Typography>
    </Box>
  )
}

export default ViewVideoCard