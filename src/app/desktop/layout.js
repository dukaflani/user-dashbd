"use client"

// React Imports
import { useMemo, useState, useEffect } from 'react';

// NextJs Imports
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// MUI Imports
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles';
import {Box, Toolbar, List, CssBaseline, Divider, IconButton,
    ListItem, ListItemButton, ListItemIcon, ListItemText, Container, Stack, Tooltip} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';

// NPM Import
import { useCookies } from "react-cookie"
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

// Icons
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import { Brightness4Sharp, Brightness5Sharp, Category, ConfirmationNumber, KeyboardVoice, LibraryMusic, 
  LinkSharp, PhonelinkRing, RadioOutlined, SpaceDashboard, VideoLibrary } from '@mui/icons-material';

// Project Imports
import UserAccountInfo from '@/components/UserAccountInfo';
import Copyright from '@/components/Copyright';
import { getCurrentUser, getRefreshToken, getUserProfile, renewAccessToken } from '@/axios/axios';
import { updateProfileInfo, updateToken, updateUserInfo } from '@/Redux/Features/auth/authSlice';

const drawerWidth = 240;
const drawerWidth2 = 0;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth2,
    width: `calc(100% - ${drawerWidth2}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MainNavbar({ children }) {
  const theme = useTheme();
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()
  
  // Auth
  const newToken = useSelector((state) => state.auth.token) 
  const { data: currentUser } = useQuery(['current-user', newToken], (newToken) => getCurrentUser(newToken), {
    onSuccess: (data, _variables, _context) => {
      dispatch(updateUserInfo(data))
    },
  })
  
  
  const userID = currentUser?.id ? currentUser?.id : 0
  const { data: userProfile, isLoading: loadingProfile } = useQuery(["user-profile", userID], (userID) => getUserProfile(userID), {
    onSuccess: (data, _variables, _context) => {
      dispatch(updateProfileInfo(data[0]))
    }
  })
  
  // Get refresh token
  const { data: refreshToken } = useQuery(['refresh-token'], getRefreshToken)
  
  // Renew access token
  const currentRefreshToken = {
    refresh: refreshToken ? refreshToken : '',
  }
  const { data: newAccessToken } = useQuery(['new-access-token', currentRefreshToken],  (currentRefreshToken) => renewAccessToken(currentRefreshToken), {
    onSuccess: (data, _variables, _context) => {
      // dispatch to store
      dispatch(updateToken(data?.access))
    },
    refetchInterval: 270000,
  })
  
  
  
  // Dark Mode
  const [darkMode, setDarkMode] = useState("")
  const [cookie, setCookie] = useCookies(["Mode"])
  
  const handleSetDarkMode = () => {
    setDarkMode("dark")
    setCookie("LightMode", "dark", {
      path: "/",
      maxAge: 3600 * 24 * 365, // Expires after 1yr
      sameSite: true,
      domain: process.env.COOKIE_DOMAIN
    })
  }
  const handleSetLightMode = () => { 
    setDarkMode("light")
    setCookie("LightMode", "light", {
      path: "/",
      maxAge: 3600 * 24 * 365, // Expires after 1yr
      sameSite: true,
      domain: process.env.COOKIE_DOMAIN
    })
  }
  
  
  useEffect(() => {
    if (cookie.LightMode == "dark") {
      setDarkMode("dark")
    } else {
      setDarkMode("light")
    }
  }, [cookie.LightMode])
  
  const darkTheme = useMemo(() => createTheme({
    palette: {
      mode: darkMode === "dark" ? 'dark' : 'light'
    }
  }), [darkMode])
  
  
  // Drawer
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navItems1 = [
    {
      label: 'Dashboard',
      icon: <SpaceDashboard />,
      link: '/'
    },
    {
      label: 'Videos',
      icon: <VideoLibrary />,
      link: '/videos'
    },
    {
      label: 'Products',
      icon: <Category />,
      link: '/products'
    },
    {
      label: 'Events',
      icon: <ConfirmationNumber />,
      link: '/events'
    },
    {
      label: 'Media Tours',
      icon: <RadioOutlined />,
      link: '/media'
    },
  ]

  const navItems2 = [
    {
      label: 'Streaming Links',
      icon: <LinkSharp />,
      link: '/links'
    },
    {
      label: 'Lyrics',
      icon: <KeyboardVoice />,
      link: '/lyrics'
    },
    {
      label: 'Skiza Tunes',
      icon: <PhonelinkRing />,
      link: '/skiza'
    },
    {
      label: 'Music Collections',
      icon: <LibraryMusic />,
      link: '/albums'
    }
  ]

  return (
    <ThemeProvider theme={darkTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar color='inherit' position="fixed" open={open}>
            <Toolbar variant="dense">
              {!open ? (<IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 2,
                  // ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>)
              :
              (<IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerClose}
                edge="start"
                sx={{
                  marginRight: 2,
                  // ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>) 
              }
              <Link href="/" title="Creator's Hub">
                <Box sx={{ position: "relative", display: 'flex', alignItems: 'center'}}>
                    <Image
                      src={darkMode === "dark" ? "/branding/dukaflani-creator-hub-white.png" : "/branding/dukaflani-creator-hub-blue.png"}
                      width={130}
                      height={35}
                      style={{objectFit: "contain"}}
                      alt="Dukaflani Logo"
                    />
                </Box>
              </Link>
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                {darkMode === "dark" ? (<IconButton
                  // color="inherit"
                  aria-label="toggle dark mode"
                  edge="start"
                  onClick={handleSetLightMode}  
                >
                   <Brightness5Sharp/>
                </IconButton>) : (<IconButton
                  // color="inherit"
                  aria-label="toggle dark mode"
                  edge="start"
                  onClick={handleSetDarkMode}
                >
                  <Brightness4Sharp/>
                </IconButton>)}
              </Box>
            </Toolbar>
          </AppBar>
          <Drawer 
              variant="permanent" 
              open={open}
              >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            {/* <Divider /> */}
            <List>
              {navItems1?.map((navItem, index) => (
                <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                  <Tooltip title={navItem.label} placement="right">
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                        }}
                        onClick={() => router.push(`${navItem.link}`)}
                        selected={pathname === navItem.link}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                          }}
                        >
                          {navItem.icon}
                        </ListItemIcon>
                        <ListItemText primary={navItem.label} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                      </Tooltip>
                  </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {navItems2?.map((navItem, index) => (
                  <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                  <Tooltip title={navItem.label} placement="right">
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                      onClick={() => router.push(`${navItem.link}`)}
                      selected={pathname === navItem.link}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        {navItem.icon}
                      </ListItemIcon>
                      <ListItemText primary={navItem.label} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                    </Tooltip>
                  </ListItem>
              ))}
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, minHeight: '100vh', paddingTop: 10, paddingBottom: 10 }}>
            <Container maxWidth="lg">
              <Stack sx={{width: "100%"}} spacing={2}>
                <UserAccountInfo/>
                <Box sx={{width: '100%', overflowX: 'auto'}}>
                   { children }
                </Box>
                <Copyright/>
              </Stack>
            </Container>
          </Box>
        </Box>
    </ThemeProvider>
  );
}