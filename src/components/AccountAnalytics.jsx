// React Imports
import { useState, useEffect } from "react"

// MUI Imports
import { Box, Grid, Paper, Stack, Tab, Tabs, Typography } from "@mui/material"

// NPM Imports
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import numeral from 'numeral'

// Project Imports
import { countriesChoices } from "@/data/countries"
import SimpleAreaChart from "./dataCharts/SimpleAreaChart";
import SimpleBarChart from "./dataCharts/SimpleBarChart";
import SimplePieChart from "./dataCharts/SimplePieChart";
import SimpleBarChartCountryOptions from "./dataCharts/SimpleBarChartCountryOptions"
import { getProfileAnalytics, getViewsByCountry, getViewsByReferrer, getStreamingViewsByPlatform } from "@/axios/axios";

const AccountAnalytics = () => {
    const userProfile = useSelector((state) => state.auth.profileInfo) 
    const [tabPosition, setTabPosition] = useState(0)

    const handleChange = (event, newValue) => {
        setTabPosition(newValue);
      };



    const profileID = userProfile?.id 
    const { data: profileAnalytics, isLoading: loadingProfileAnalytics } = useQuery(["user-profile-analytics", profileID], (profileID) => getProfileAnalytics(profileID), {
    onSuccess: (data, _variables, _context) => {
        // console.log("User profile analytics:", data)
    },
    enabled: !!profileID,
    })

    const { data: viewsByCountry } = useQuery(["views-by-country", profileID], (profileID) => getViewsByCountry(profileID), {
    onSuccess: (data, _variables, _context) => {
        // console.log("Views by country:", data)
    },
    enabled: !!profileID,
    })

    const { data: viewsByReferrer } = useQuery(["views-by-referrer", profileID], (profileID) => getViewsByReferrer(profileID), {
    onSuccess: (data, _variables, _context) => {
        // console.log("Views by referrer:", data)
    },
    enabled: !!profileID,
    })

    const { data: streamingViewsByPlatform } = useQuery(["streaming-views-by-platform", profileID], (profileID) => getStreamingViewsByPlatform(profileID), {
      onSuccess: (data, _variables, _context) => {
          // console.log("streaming Views by platform:", data)
      },
      enabled: !!profileID,
      })


    const pageProductsEventsViews = [
        {
          name: 'Jan',
          Page: profileAnalytics?.jan_page_views_count,
          Products: profileAnalytics?.jan_product_views_count,
          Events: profileAnalytics?.jan_event_views_count,
        },
        {
          name: 'Feb',
          Page: profileAnalytics?.feb_page_views_count,
          Products: profileAnalytics?.feb_product_views_count,
          Events: profileAnalytics?.feb_event_views_count,
        },
        {
          name: 'Mar',
          Page: profileAnalytics?.mar_page_views_count,
          Products: profileAnalytics?.mar_product_views_count,
          Events: profileAnalytics?.mar_event_views_count,
        },
        {
          name: 'Apr',
          Page: profileAnalytics?.apr_page_views_count,
          Products: profileAnalytics?.apr_product_views_count,
          Events: profileAnalytics?.apr_event_views_count,
        },
        {
          name: 'May',
          Page: profileAnalytics?.may_page_views_count,
          Products: profileAnalytics?.may_product_views_count,
          Events: profileAnalytics?.may_event_views_count,
        },
        {
          name: 'Jun',
          Page: profileAnalytics?.jun_page_views_count,
          Products: profileAnalytics?.jun_product_views_count,
          Events: profileAnalytics?.jun_event_views_count,
        },
        {
          name: 'Jul',
          Page: profileAnalytics?.jul_page_views_count,
          Products: profileAnalytics?.jul_product_views_count,
          Events: profileAnalytics?.jul_event_views_count,
        },
        {
          name: 'Aug',
          Page: profileAnalytics?.aug_page_views_count,
          Products: profileAnalytics?.aug_product_views_count,
          Events: profileAnalytics?.aug_event_views_count,
        },
        {
          name: 'Sep',
          Page: profileAnalytics?.sep_page_views_count,
          Products: profileAnalytics?.sep_product_views_count,
          Events: profileAnalytics?.sep_event_views_count,
        },
        {
          name: 'Oct',
          Page: profileAnalytics?.oct_page_views_count,
          Products: profileAnalytics?.oct_product_views_count,
          Events: profileAnalytics?.oct_event_views_count,
        },
        {
          name: 'Nov',
          Page: profileAnalytics?.nov_page_views_count,
          Products: profileAnalytics?.nov_product_views_count,
          Events: profileAnalytics?.nov_event_views_count,
        },
        {
          name: 'Dec',
          Page: profileAnalytics?.dec_page_views_count,
          Products: profileAnalytics?.dec_product_views_count,
          Events: profileAnalytics?.dec_event_views_count,
        },
      ];

    const streamingLinksViews = [
        {
          name: 'YouTube',
          views: profileAnalytics?.youtube_views_count,
        },
        {
          name: 'Spotify',
          views: profileAnalytics?.spotify_views_count,
        },
        {
          name: 'Boomplay',
          views: profileAnalytics?.boomplay_views_count,
        },
        {
          name: 'Audiomack',
          views: profileAnalytics?.audiomack_views_count,
        },
        {
          name: 'Amazon Music',
          views: profileAnalytics?.amazon_views_count,
        },
        {
          name: 'iTunes',
          views: profileAnalytics?.itunes_views_count,
        },
        {
          name: 'Apple Music',
          views: profileAnalytics?.apple_music_views_count,
        },
        {
          name: 'Deezer',
          views: profileAnalytics?.deezer_views_count,
        },
        {
          name: 'Google Play',
          views: profileAnalytics?.google_play_views_count,
        },
        {
          name: 'Tik Tok',
          views: profileAnalytics?.tiktok_views_count,
        },
        {
          name: 'YouTube Music',
          views: profileAnalytics?.youtube_music_views_count,
        },
        {
          name: 'Pandora',
          views: profileAnalytics?.pandora_views_count,
        },
        {
          name: 'Qobuz',
          views: profileAnalytics?.qobuz_views_count,
        },
        {
          name: 'Napster',
          views: profileAnalytics?.napster_views_count,
        },
        {
          name: 'Tidal',
          views: profileAnalytics?.tidal_views_count,
        },
      ];

    const viewsByCountryArray = viewsByCountry?.map((option, index) => ({
      name: `${countriesChoices?.filter((country) => country.code === option?.country)[0]?.label}`,
      views: Number(option?.views_per_country)
    }))

    let totalViewsFromTopCountries = viewsByCountryArray?.reduce((acc,cur) => acc + cur.views, 0);
    const otherCountriesViewCount = profileAnalytics?.page_views_count - totalViewsFromTopCountries

    const viewsByCountryArray2 = viewsByCountryArray?.filter(
      (obj, index) =>
      viewsByCountryArray?.findIndex((item) => item.name === obj.name) === index
    );


    const viewsByReferrerArray = viewsByReferrer?.map((option, index) => ({
    name: option?.referral_url?.slice(8, 30),
    value: Number(option?.views_per_referrer) 
    }))


    const streamingViewsByPlatformArray = streamingViewsByPlatform?.map((option, index) => ({
      name: option?.object_title,
      views: Number(option?.views_per_platform)
    }))

    let totalViewsFromTopPlatforms = streamingViewsByPlatformArray?.reduce((acc,cur) => acc + cur.views, 0);
    const otherPlatformsViewCount = profileAnalytics?.streaming_platforms_clicks_count - totalViewsFromTopPlatforms

    const streamingViewsByPlatformArray2 = streamingViewsByPlatformArray?.filter(
      (obj, index) =>
      streamingViewsByPlatformArray?.findIndex((item) => item.name === obj.name) === index
    );


    const totalPageViews = profileAnalytics?.page_views_count + profileAnalytics?.product_views_count + profileAnalytics?.event_views_count;
    const totalStreamingViews = profileAnalytics?.streaming_platforms_clicks_count + profileAnalytics?.default_streaming_platforms_clicks_count;
    const productsCtr = (profileAnalytics?.product_views_count/totalPageViews) * 100
    const eventsCtr = (profileAnalytics?.event_views_count/totalPageViews) * 100
    const streamingCtr = (totalStreamingViews/totalPageViews) * 100


    return (
        <Box sx={{width: '100%', height: '100%'}}>
            <Stack>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={3}>
                            <Paper variant="outlined" sx={{padding: 1}}>
                                <Stack>
                                    <Typography gutterBottom variant="button">Lifetime Page Views:</Typography>
                                    <Typography variant="subtitle2">{numeral(totalPageViews).format('0,0')}</Typography>
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Paper variant="outlined" sx={{padding: 1}}>
                                <Stack>
                                    <Typography gutterBottom variant="button">Streaming Links</Typography>
                                    <Typography variant="subtitle2">{`C.T.R: ${streamingCtr > 0 ? streamingCtr?.toFixed(2) : 0 }%`}</Typography>
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Paper variant="outlined" sx={{padding: 1}}>
                                <Stack>
                                    <Typography gutterBottom variant="button">Products</Typography>
                                    <Typography variant="subtitle2">{`C.T.R: ${productsCtr > 0  ? productsCtr?.toFixed(2) : 0 }%`}</Typography>
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Paper variant="outlined" sx={{padding: 1}}>
                                <Stack>
                                    <Typography gutterBottom variant="button">Events</Typography>
                                    <Typography variant="subtitle2">{`C.T.R: ${eventsCtr > 0  ? eventsCtr?.toFixed(2) : 0 }%`}</Typography>
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
                {loadingProfileAnalytics ? (<Typography variant="subtitle2">Loading analytics. Please wait...</Typography>)
                 : 
                 (<Box sx={{paddingY: 2}}>
                  {
                    {
                      0: profileAnalytics?.page_views_count == 0 && profileAnalytics?.product_views_count == 0 && profileAnalytics?.event_views_count == 0 ? <Typography variant="subtitle2">You don&apos;t have any views yet</Typography> : <Typography variant="subtitle2">Hover over the graph to get the number of views per month</Typography>,
                      1: profileAnalytics?.streaming_platforms_clicks_count == 0 && profileAnalytics?.default_streaming_platforms_clicks_count == 0 ? <Typography variant="subtitle2">You don&apos;t have any streaming views yet</Typography> : <Typography variant="subtitle2">Hover over the bars to get the number of views per platform</Typography>,
                      2: profileAnalytics?.page_views_count == 0 ? <Typography variant="subtitle2">You don&apos;t have any views yet</Typography> : <Typography variant="subtitle2">Hover over the bars to get the number of views per country</Typography>,
                      3: viewsByReferrer?.length == 0 ? <Typography variant="subtitle2">You don&apos;t have any views yet</Typography> : <Typography variant="subtitle2">Hover over the chart to see where your traffic is coming from</Typography>,
                    }[tabPosition]
                  }
                </Box>)}
                <Box sx={{paddingTop: 2}}>
                    {
                        {
                            0: <SimpleAreaChart data={pageProductsEventsViews} />,
                            1: <SimpleBarChart data={streamingViewsByPlatformArray2} others={otherPlatformsViewCount} />,
                            2: <SimpleBarChart data={viewsByCountryArray2} others={otherCountriesViewCount} />,
                            3: <SimplePieChart data={viewsByReferrerArray} />,
                        }[tabPosition]
                    }
                </Box>
            </Stack>
        </Box>
    )
}

export default AccountAnalytics