// React Imports
import { useEffect } from "react"

// NextJS Imports
import Link from "next/link"
import Image from "next/image"

// MUI Imports
import { Box } from '@mui/material'


const MobileHeaderLogo = ({ darkMode }) => {
    


  return (
        <Link href="/" title="Creator's Hub">
        <Box sx={{ position: "relative", display: 'flex', alignItems: 'center'}}>
            <Image
                src={darkMode === "dark" ? "/branding/dukaflani-creator-hub-white.png" : "/branding/dukaflani-creator-hub-blue.png"}
                width={100}
                height={30}
                style={{objectFit: "contain"}}
                alt="Dukaflani Logo"
            />
        </Box>
        </Link>
  )
}

export default MobileHeaderLogo