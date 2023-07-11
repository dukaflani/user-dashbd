// React Imports
import { useState } from "react"

// MUI Imports
import { Box, Grid, Paper, Stack, Tab, Tabs, Typography } from "@mui/material"

// Project Imports
import SimpleAreaChart from "./dataCharts/SimpleAreaChart";
import SimpleBarChart from "./dataCharts/SimpleBarChart";
import SimplePieChart from "./dataCharts/SimplePieChart";

const AccountAnalytics = () => {
    const [tabPosition, setTabPosition] = useState(0)

    const handleChange = (event, newValue) => {
        setTabPosition(newValue);
      };


    return (
        <Box sx={{width: '100%', height: '100%'}}>
            <Stack>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={3}>
                            <Paper variant="outlined" sx={{padding: 1}}>
                                <Stack>
                                    <Typography gutterBottom variant="button">Lifetime Page Views:</Typography>
                                    <Typography variant="subtitle2">2,456,543,453</Typography>
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Paper variant="outlined" sx={{padding: 1}}>
                                <Stack>
                                    <Typography gutterBottom variant="button">Streaming Links</Typography>
                                    <Typography variant="subtitle2">C.T.R: 24%</Typography>
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Paper variant="outlined" sx={{padding: 1}}>
                                <Stack>
                                    <Typography gutterBottom variant="button">Products</Typography>
                                    <Typography variant="subtitle2">C.T.R: 32%</Typography>
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Paper variant="outlined" sx={{padding: 1}}>
                                <Stack>
                                    <Typography gutterBottom variant="button">Events</Typography>
                                    <Typography variant="subtitle2">C.T.R: 0%</Typography>
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Tabs
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        value={tabPosition}
                        onChange={handleChange}
                        sx={{}}
                        >
                        <Tab  iconPosition='start' label="All Views" />
                        <Tab  iconPosition='start' label="Streaming" />
                        <Tab  iconPosition='start' label="Countries" />
                        <Tab  iconPosition='start' label="Referrers" />
                    </Tabs>
                </Box>
                <Box sx={{paddingTop: 2}}>
                    {
                        {
                            0: <SimpleAreaChart/>,
                            1: <SimpleBarChart/>,
                            2: <SimpleBarChart/>,
                            3: <SimplePieChart/>,
                        }[tabPosition]
                    }
                </Box>
            </Stack>
        </Box>
    )
}

export default AccountAnalytics