// NextJS Imports
import Image from "next/image";

// MUI Imports
import { Avatar, Box, Card, CardContent, Grid, Paper, Stack, Typography } from "@mui/material"



const ViewMediaTourCard = ({ viewMediaTourObject }) => {
  return (
    <Box>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                {/* <Avatar sx={{height: 170, width: 150}} variant='rounded' src={viewMediaTourObject?.poster} alt={viewMediaTourObject?.title} /> */}
                <Box sx={{ position: "relative", display: 'flex', alignItems: 'center'}}>
                    <Image
                        src={viewMediaTourObject?.poster}
                        width={150}
                        height={170}
                        style={{objectFit: "contain"}}
                        alt={viewMediaTourObject?.title}
                    />
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Stack spacing={2}>
                  <Typography variant='subtitle1' gutterBottom sx={{fontWeight: 'bold'}}>{viewMediaTourObject?.title}</Typography>
                  <Typography variant='body2' sx={{color: '#1976d2'}}>{viewMediaTourObject?.station_type}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant='subtitle2'>Media Tour Info:</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Station</Typography>
                        <Typography variant='body2'>{viewMediaTourObject?.station_name}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Country</Typography>
                        <Typography variant='body2'>{viewMediaTourObject?.country}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Show</Typography>
                        <Typography variant='body2'>{viewMediaTourObject?.show_title}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Host</Typography>
                        <Typography variant='body2'>{viewMediaTourObject?.show_host}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Date</Typography>
                        <Typography variant='body2'>{viewMediaTourObject?.date}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Start Time</Typography>
                        <Typography variant='body2'>{viewMediaTourObject?.from_time}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>End Time</Typography>
                        <Typography variant='body2'>{viewMediaTourObject?.to_time}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Pinned?</Typography>
                        <Typography variant='body2'>{viewMediaTourObject?.is_pinned ? 'Yes' : 'No'}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
    </Box>
  )
}

export default ViewMediaTourCard