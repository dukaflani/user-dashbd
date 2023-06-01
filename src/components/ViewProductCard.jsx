// NextJS Imports
import Image from "next/image";

// MUI Imports
import { Avatar, Box, Card, CardContent, Grid, Paper, Stack, Typography } from "@mui/material"

// NPM Imports
import numeral from "numeral";


const ViewProductCard = ({ viewProductObject }) => {
  return (
    <Box>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                {/* <Avatar sx={{height: 170, width: 150}} variant='rounded' src={viewProductObject?.image} alt={viewProductObject?.title} /> */}
                <Box sx={{ position: "relative", display: 'flex', alignItems: 'center'}}>
                    <Image
                        src={viewProductObject?.image}
                        width={150}
                        height={170}
                        style={{objectFit: "contain"}}
                        alt={viewProductObject?.title}
                    />
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Stack spacing={2}>
                  <Typography variant='subtitle1' gutterBottom sx={{fontWeight: 'bold'}}>{viewProductObject?.title}</Typography>
                  <Typography variant='body2' sx={{color: '#1976d2'}}>{viewProductObject?.product_category}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant='subtitle2'>Product Info:</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Local Price</Typography>
                        <Typography variant='body2'>{numeral(viewProductObject?.local_price).format('0,0')}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Currency</Typography>
                        <Typography variant='body2'>{viewProductObject?.local_currency}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Dollar Price</Typography>
                        <Typography variant='body2'>{`$${numeral(viewProductObject?.dollar_price).format('0,0')}`}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Vendor</Typography>
                        <Typography variant='body2'>{viewProductObject?.sold_by}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>WhatsApp</Typography>
                        <Typography variant='body2'>{viewProductObject?.whatsapp}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Availability</Typography>
                        <Typography variant='body2'>{viewProductObject?.product_status}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='subtitle2'>Product Description:</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant='body2'>{viewProductObject?.description}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='subtitle2'>Product Status:</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Active?</Typography>
                        <Typography variant='body2'>{viewProductObject?.is_active ? 'Yes' : 'No'}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Sponsored?</Typography>
                        <Typography variant='body2'>{viewProductObject?.is_sponsored ? 'Yes' : 'No'}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{padding: 2}}>
                      <Stack>
                        <Typography variant='subtitle2'>Global?</Typography>
                        <Typography variant='body2'>{viewProductObject?.is_global ? 'Yes' : 'No'}</Typography>
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

export default ViewProductCard