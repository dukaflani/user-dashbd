"use client"

// Mui Imports
import { Box, Stack, Typography, Link } from '@mui/material'

// Icons
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Copyright = () => {
    const year = new Date().getFullYear()


  return (
    <Box sx={{paddingTop: 2, paddingBottom: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
      <Stack spacing={0.5}>
        <Typography variant='caption'>&copy; {year} Dukaflani. All Rights Reserved</Typography>
        <Typography variant='caption'>#PluggingBusinessToMusic</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Stack spacing={1} direction='row'>
            <Link href="https://www.facebook.com/dukaflani" target="_blank" rel="noopener" title="Facebook">
                <FacebookOutlinedIcon fontSize='small'  sx={{cursor: 'pointer'}} />
            </Link>
            <Link href="https://twitter.com/dukaflani" target="_blank" rel="noopener" title="Twitter">
                <TwitterIcon fontSize='small'  sx={{cursor: 'pointer'}} />
            </Link>
            <Link href="https://www.instagram.com/dukaflani/" target="_blank" rel="noopener" title="Instagram">
                <InstagramIcon fontSize='small'  sx={{cursor: 'pointer'}} />
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default Copyright