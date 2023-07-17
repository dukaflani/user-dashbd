// React Imports
import { useEffect, useState } from "react"

// NextJS Imports
import Image from "next/legacy/image";

// NPM imports
import numeral from 'numeral'

// MUI Imports
import { Box, Typography, Stack, CardContent, Card, CardActionArea, Link, colors } from "@mui/material"

// Project Imports
import { countriesChoices } from "@/data/countries"

const ReferrerCard = ({ item, position }) => {
    const referrerURL = item?.name
    const viewsCount = item?.views
    const cardPosition = position + 1
    const defaultImg = "/media/dukaflani-thumbnail-default.png"


  return (
    <Card variant="outlined" sx={{width: '100%', marginTop: 1, cursor: 'pointer'}} >
        <CardActionArea>
        <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
          <Box 
              sx={{ width: 200,  position: "relative", cursor:'pointer', marginLeft: 1}}
              >
              <Image 
                  src={defaultImg}
                  layout='responsive'
                  alt={referrerURL}
                  width={200}
                  height={100}
                  />
          </Box>
          <CardContent sx={{width: '100%'}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
              <Box>
                <Stack>
                  <Typography  variant="subtitle1">{ referrerURL?.length > 39 ? `${referrerURL?.slice(0, 38)}...` : referrerURL }</Typography>
                  <Typography  variant="subtitle2">{viewsCount == 1 ? `${numeral(viewsCount).format('0,0')} view` : `${numeral(viewsCount).format('0,0')} views`}</Typography>
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


const ReferrerAnalyticsCard = ({ data }) => {
  return (
    <Box sx={{height: 400, overflowY: 'auto'}}>
        {data?.map((item, i) => (
            <Box key={i}>
                <ReferrerCard item={item} position={i} />
            </Box>
        ))}
    </Box>
  )
}

export default ReferrerAnalyticsCard