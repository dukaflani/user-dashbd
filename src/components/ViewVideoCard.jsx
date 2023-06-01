// NextJS Imports
import Image from "next/image";

// MUI Imports
import { Avatar, Box, Card, CardContent, Grid, Paper, Stack, Typography } from "@mui/material"

// NPM Imports
import numeral from "numeral";


const ViewVideoCard = ({ viewVideoObject }) => {
  return (
    <Box>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Avatar sx={{height: 100, width: 170}} variant='rounded' src={viewVideoObject?.thumbnail} alt={viewVideoObject?.title} />
                {/* <Box sx={{ position: "relative", display: 'flex', alignItems: 'center'}}>
                    <Image
                        src={viewVideoObject?.thumbnail}
                        width={170}
                        height={100}
                        style={{objectFit: "contain"}}
                        alt={viewVideoObject?.title}
                    />
                </Box> */}
              </Grid>
              <Grid item xs={8}>
                <Stack spacing={2}>
                  <Typography variant='subtitle1' gutterBottom sx={{fontWeight: 'bold'}}>{viewVideoObject?.title}</Typography>
                  <Typography variant='body2' sx={{color: '#1976d2'}}>{viewVideoObject?.genre_title}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant='subtitle2'>Video Statistics:</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Views</Typography>
                        <Typography variant='body2'>{numeral(viewVideoObject?.views_count).format('0,0')}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Likes</Typography>
                        <Typography variant='body2'>{numeral(viewVideoObject?.like_count).format('0,0')}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Dislikes</Typography>
                        <Typography variant='body2'>{numeral(viewVideoObject?.dislike_count).format('0,0')}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='subtitle2'>Video Description:</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant='body2'>{viewVideoObject?.description}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='subtitle2'>Video Items:</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Streaming Links</Typography>
                        <Typography variant='body2'>{viewVideoObject?.links_title}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Product</Typography>
                        <Typography variant='body2'>{viewVideoObject?.product_title}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Lyrics</Typography>
                        <Typography variant='body2'>{viewVideoObject?.lyrics_title}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Skiza Tunes</Typography>
                        <Typography variant='body2'>{viewVideoObject?.skiza_title}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Album</Typography>
                        <Typography variant='body2'>{viewVideoObject?.album_title}</Typography>
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

export default ViewVideoCard