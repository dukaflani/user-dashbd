"use client"

// MUI Imports
import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Project Imports
import MobileNavbar from '@/components/MobileNavbar'


export default function Home() {
  const theme = useTheme()


  return (
    // <MobileNavbar>
      <Box component="main" sx={{backgroundColor: theme.myColors.myBackground, minHeight: '100vh', paddingTop: 5, paddingBottom: 10}}>
        <Typography variant="h6">mobile</Typography>
      </Box>
    // </MobileNavbar>
  )
}
