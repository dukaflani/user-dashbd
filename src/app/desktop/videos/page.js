"use client"

// MUI Imports
import { Box } from '@mui/material'

// Project Import
import VideoPageContent from '@/components/VideoPageContent'


export const metadata = {
  title: 'Videos Dashboard',
  description: 'Dukaflani Dashboard',
}

export default function VideosPage() {


  return (
      <Box component="main" >
        <VideoPageContent/>
      </Box>
  )
}