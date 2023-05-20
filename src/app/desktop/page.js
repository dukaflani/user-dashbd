"use client"

// MUI Imports
import { Box } from '@mui/material'

// Project Import
import HomePageContent from '@/components/HomePageContent'

export const metadata = {
  title: 'Dukaflani',
  description: 'Dukaflani Dashboard',
}

export default function Home() {


  return (
      <Box component="main" >
        <HomePageContent/>
      </Box>
  )
}
