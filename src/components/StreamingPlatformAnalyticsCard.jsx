// React Imports
import { useEffect, useState } from "react"

// NextJS Imports
import Image from "next/legacy/image";

// NPM imports
import numeral from 'numeral'

// MUI Imports
import { Box, Typography, Stack, CardContent, Card, CardActionArea, Link, colors } from "@mui/material"

const PlatformAnalyticsCard = ({ platform, position }) => {
    const logo = platform?.name
    const viewsCount = platform?.views
    const cardPosition = position + 1


  return (
    <Card variant="outlined" sx={{width: '100%', marginTop: 1, cursor: 'pointer'}} >
        <CardActionArea>
        <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
          <Box 
              sx={{ backgroundColor: colors.grey[200], width: 200,  position: "relative", cursor:'pointer', marginLeft: 1}}
              >
              <Image 
                  src={`https://dukaflani-user-uploads.s3.amazonaws.com/default/${logo?.replace(' ', '_')}.png`}
                  layout='responsive'
                  alt={logo}
                  width={200}
                  height={100}
                  />
          </Box>
          <CardContent sx={{width: '100%'}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
              <Box>
                <Stack>
                  <Typography  variant="h6">{logo}</Typography>
                  <Typography  variant="subtitle1">{viewsCount == 1 ? `${numeral(viewsCount)?.format('0,0')} click` : `${numeral(viewsCount)?.format('0,0')} clicks`}</Typography>
                </Stack>
              </Box>
              <Box>
                <Stack>
                    <Typography variant="subtitle2">Rank:</Typography>
                    <Typography variant="h6">{cardPosition}</Typography>
                </Stack>
              </Box>
            </Box>
          </CardContent>
        </Box>
        </CardActionArea>
      </Card>
  )
}


const StreamingPlatformAnalyticsCard = ({ data }) => {

  return (
    <Box sx={{height: 400, overflowY: 'auto'}}>
        {
            data?.map((item, i) => (
                <Box key={i}>
                    <PlatformAnalyticsCard platform={item} position={i} />
                </Box>
            ))
        }
        {/* <PlatformAnalyticsCard /> */}
    </Box>
  )
}

export default StreamingPlatformAnalyticsCard