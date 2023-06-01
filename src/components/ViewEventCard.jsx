// NextJS Imports
import Image from "next/image";

// MUI Imports
import { Avatar, Box, Card, CardContent, Grid, Paper, Stack, Typography } from "@mui/material"

// NPM Imports
import numeral from "numeral";


const ViewEventCard = ({ viewEventObject }) => {
  return (
    <Box>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Avatar sx={{height: 170, width: 150}} variant='rounded' src={viewEventObject?.poster} alt={viewEventObject?.title} />
                {/* <Box sx={{ position: "relative", display: 'flex', alignItems: 'center'}}>
                    <Image
                        src={viewEventObject?.poster}
                        width={150}
                        height={170}
                        style={{objectFit: "contain"}}
                        alt={viewEventObject?.title}
                    />
                </Box> */}
              </Grid>
              <Grid item xs={8}>
                <Stack spacing={2}>
                  <Typography variant='subtitle1' gutterBottom sx={{fontWeight: 'bold'}}>{viewEventObject?.title}</Typography>
                  <Typography variant='body2' sx={{color: '#1976d2'}}>{viewEventObject?.event_category}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant='subtitle2'>Event Info:</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Price</Typography>
                        <Typography variant='body2'>{`${viewEventObject?.local_currency}${numeral(viewEventObject?.local_price).format('0,0')}`}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Country</Typography>
                        <Typography variant='body2'>{viewEventObject?.country}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>City</Typography>
                        <Typography variant='body2'>{viewEventObject?.city}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Location</Typography>
                        <Typography variant='body2'>{viewEventObject?.location}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Venue</Typography>
                        <Typography variant='body2'>{viewEventObject?.venue}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Ticketing Platform</Typography>
                        <Typography variant='body2'>{viewEventObject?.ticket_platform}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='subtitle2'>Event Description:</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant='body2'>{viewEventObject?.description}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='subtitle2'>Event Status:</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} >
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Ticket Info</Typography>
                        <Typography variant='body2'>{viewEventObject?.event_ticket_info}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Featured?</Typography>
                        <Typography variant='body2'>{viewEventObject?.is_featured ? 'Yes' : 'No'}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Sponsored?</Typography>
                        <Typography variant='body2'>{viewEventObject?.is_sponsored ? 'Yes' : 'No'}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Global?</Typography>
                        <Typography variant='body2'>{viewEventObject?.is_global ? 'Yes' : 'No'}</Typography>
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

export default ViewEventCard