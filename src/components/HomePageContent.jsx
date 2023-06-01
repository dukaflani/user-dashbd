// NextJs Imports
import Image from 'next/image';

// MUI Imports
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material"

// NPM Imports
import { useSelector } from 'react-redux';
import numeral from "numeral";



const HomePageContent = () => {
    const userProfile = useSelector((state) => state.auth.profileInfo) 


  return (
    <Box>
        <Stack rowGap={1}>
            <Typography variant='h6'>My Uploads:</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={9}>
                    <Grid container rowGap={3}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <Card>
                                    <CardContent>
                                        <Stack>
                                            <Typography variant="h6">Videos</Typography>
                                            <Typography variant="body2">{userProfile?.video_count < 1000 || userProfile?.video_count % 10 === 0 ? numeral(userProfile?.video_count).format('0a') : numeral(userProfile?.video_count).format('0.0a')}</Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <Card>
                                    <CardContent>
                                        <Stack>
                                            <Typography variant="h6">Products</Typography>
                                            <Typography variant="body2">{ userProfile?.product_count < 1000 || userProfile?.product_count % 10 === 0 ? numeral(userProfile?.product_count).format('0a') : numeral(userProfile?.product_count).format('0.0a')}</Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <Card>
                                    <CardContent>
                                        <Stack>
                                            <Typography variant="h6">Events</Typography>
                                            <Typography variant="body2">{ userProfile?.events_count < 1000 || userProfile?.events_count % 10 === 0 ? numeral(userProfile?.events_count).format('0a') : numeral(userProfile?.events_count).format('0.0a')}</Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <Card>
                                    <CardContent>
                                        <Stack>
                                            <Typography variant="h6">Media Tours</Typography>
                                            <Typography variant="body2">{userProfile?.media_tours_count < 1000 || userProfile?.media_tours_count % 10 === 0 ? numeral(userProfile?.media_tours_count).format('0a') : numeral(userProfile?.media_tours_count).format('0.0a')}</Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <Stack>
                                    <Typography gutterBottom variant="h6">How to use Dukaflani:</Typography>
                                    <Box sx={{ width:"100%", paddingTop:"56.25%", position: "relative" }}>
                                        <Image
                                            src="/media/diamond.png"
                                            fill={true}
                                            style={{objectFit: "contain"}}
                                            alt="How to videos"
                                        />
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                        <Typography variant='subtitle2'>From Dukaflani:</Typography>
                            <Card>
                                <Box sx={{ width:"100%", height: 130, position: "relative" }}>
                                    <Image
                                        src="/media/diamond.png"
                                        fill={true}
                                        style={{objectFit: "contain"}}
                                        alt="NEW FEATURE RELEASE"
                                    />
                                </Box>
                                {/* <CardMedia
                                component="img"
                                height="130"
                                image="/media/diamond.png"
                                alt="NEW FEATURE RELEASE"
                                /> */}
                                <CardContent>
                                    <Stack>
                                        <Typography gutterBottom variant='subtitle2'>NEW FEATURE RELEASE</Typography>
                                        <Typography variant='body2'>dkdbkdu jkudkj jnjnc  sckjsub duckjnkb...</Typography>
                                    </Stack>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                            <Card>
                                <Box sx={{ width:"100%", height: 130, position: "relative" }}>
                                    <Image
                                        src="/media/diamond.png"
                                        fill={true}
                                        style={{objectFit: "contain"}}
                                        alt="NEW FEATURE RELEASE"
                                    />
                                </Box>
                                {/* <CardMedia
                                component="img"
                                height="130"
                                image="/media/diamond.png"
                                alt="NEW FEATURE RELEASE"
                                /> */}
                                <CardContent>
                                    <Stack>
                                        <Typography gutterBottom variant='subtitle2'>NEW FEATURE RELEASE</Typography>
                                        <Typography variant='body2'>dkdbkdu jkudkj jnjnc  sckjsub duckjnkb...</Typography>
                                    </Stack>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    </Box>
  )
}

export default HomePageContent