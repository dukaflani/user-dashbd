// "use client"

// MUI Imports
import { Box } from '@mui/material'

// Project Import
import HomePageContent from '@/components/HomePageContent'


export const metadata = {
  title: "Dashboard",
  description: "Welcome to your dashboard"
}


export default function Home() {


  return (
      <Box component="main" >
        <HomePageContent/>
      </Box>
  )
}
