"use client"

// React Import
import { useEffect, useMemo, useState } from 'react';

// NextJS Imports
import { usePathname, useRouter } from 'next/navigation';

// NPM Imports
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

// React Tanstack Query
import { useQuery } from '@tanstack/react-query';

// MUI Imports
import { CircularProgress, Container, Dialog, DialogContent, DialogTitle, Stack, Tooltip,
  ThemeProvider, createTheme, useMediaQuery, Link, Menu, MenuItem, ListItemAvatar, Avatar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

// Icons
import { Brightness4Sharp, Brightness5Sharp, Category, ConfirmationNumber, KeyboardVoice, LibraryMusic,
   LinkSharp, PhonelinkRing, RadioOutlined, SpaceDashboard, VideoLibrary } from '@mui/icons-material';
import WebOutlinedIcon from '@mui/icons-material/WebOutlined';
import MenuIcon from "@mui/icons-material/Menu"
import MoreVertIcon from '@mui/icons-material/MoreVert'

// Project Imports
import MobileUserAccountInfo from '@/components/MobileUserAccountInfo';
import Copyright from '@/components/Copyright';
import MobileHeaderLogo from '@/components/MobileHeaderLogo';
import AppBarLinearProgress from '@/components/AppBarLinearProgress';
import { isAdminOrArtist, isPromoter, isVendor } from '@/utils/checkRole';
import LoginForm from '@/components/LoginForm';
import { getCurrentUser, getRefreshToken, getUserProfile, renewAccessToken } from '@/axios/axios';
import { updateProfileInfo, updateToken, updateUserInfo } from '@/Redux/Features/auth/authSlice';
import { pageHasChanged } from '@/Redux/Features/navigation/navigationSlice';




const drawerWidth = 240;



function MobileNavbar(props) {
  const currentLoggedInUser = useSelector((state) => state.auth.userInfo) 
  const currentLoggedInUserProfile = useSelector((state) => state.auth.profileInfo) 
  const pageNavigated = useSelector((state) => state.navigation.pageChanged)
  // const theme = useTheme();
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()

   // Auth
   const [showAuthDialog, setShowAuthDialog] = useState(true)
   const [showLoginDialog, setShowLoginDialog] = useState(false)
   const newToken = useSelector((state) => state.auth.token) 
   const { data: currentUser, isSuccess: foundCurrentUser } = useQuery(['current-user', newToken], (newToken) => getCurrentUser(newToken), {
     onSuccess: (data, _variables, _context) => {
       dispatch(updateUserInfo(data))
       setShowLoginDialog(false)
     },
     onError: (error, _variables, _context) => {
       setShowAuthDialog(false)
       setShowLoginDialog(true)
     },
     enabled: !!newToken
   })
   
   
   const userID = currentLoggedInUser?.id 
   const { data: userProfile, } = useQuery(["user-profile", userID], (userID) => getUserProfile(userID), {
     onSuccess: (data, _variables, _context) => {
       dispatch(updateProfileInfo(data[0]))
       setShowAuthDialog(false)
     },
     enabled: !!userID,
   })
 
 
   
   // Get refresh token
   const [myRefreshToken, setMyRefreshToken] = useState(null)
   const { data: refreshToken } = useQuery(['refresh-token'], getRefreshToken, {
     onSuccess: (data, _variables, _context) => {
       setMyRefreshToken(data)
     }
   })
   
   // Renew access token
   const currentRefreshToken = {
     refresh: myRefreshToken,
   }
   const { data: newAccessToken } = useQuery(['new-access-token', currentRefreshToken],  (currentRefreshToken) => renewAccessToken(currentRefreshToken), {
     onSuccess: (data, _variables, _context) => {
       // dispatch to store
       dispatch(updateToken(data?.access))
     },
     refetchInterval: 270000,
     enabled: !!myRefreshToken,
   })



   // Dark Mode
   const [darkMode, setDarkMode] = useState("")
   const [cookie, setCookie] = useCookies(["Mode"])
   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
   
   
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
      //  mode: darkMode === "dark" || prefersDarkMode === true ? "dark" : darkMode === "light" && prefersDarkMode === true ? "light" : "light"
      mode: "dark"
     }
   }), [darkMode, prefersDarkMode])



  // Drawer
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems1 = useMemo(
    () => [
      {
        label: 'Dashboard',
        icon: <SpaceDashboard />,
        link: '/'
      },
      ...isAdminOrArtist(currentLoggedInUser) ? [
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
          link: '/media-tours'
        },
      ] : [],
      ...isVendor(currentLoggedInUser) ? [
        {
          label: 'Products',
          icon: <Category />,
          link: '/products'
        },
      ] : [],
      ...isPromoter(currentLoggedInUser) ? [
        {
          label: 'Events',
          icon: <ConfirmationNumber />,
          link: '/events'
        },
      ] : [],
  ] ,[currentLoggedInUser])

  const navItems2 = useMemo(
    () => [
      ...isAdminOrArtist(currentLoggedInUser) ? [
        {
          label: 'Streaming Links',
          icon: <LinkSharp />,
          link: '/streaming-links'
        },
        {
          label: 'Lyrics',
          icon: <KeyboardVoice />,
          link: '/lyrics'
        },
        {
          label: 'Skiza Tunes',
          icon: <PhonelinkRing />,
          link: '/skiza-tunes'
        },
        {
          label: 'Music Collections',
          icon: <LibraryMusic />,
          link: '/music-collections'
        }
      ] : [],
  ], [currentLoggedInUser])


  // More Icon Menu
  const [anchorEl, setAnchorEl] = useState(null);
    const openNavMenu = Boolean(anchorEl);
    const handleClickNavMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
      setAnchorEl(null);
    };


   // Navigation
   useEffect(() => {
    dispatch(pageHasChanged(false))
  }, [pathname])


  const drawer = (
    <div>
      <Toolbar variant="dense" >
        <Box sx={{ display: { xs: 'none' , md: 'block'} }}>
          <MobileHeaderLogo  darkMode={darkMode} setDarkMode={setDarkMode}  />
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {navItems1?.map((navItem, index) => (
          <ListItem onClick={() => setMobileOpen(false)} key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(pageHasChanged(true))
                router.push(`${navItem.link}`)
            }}
              selected={pathname === navItem.link}
            >
              <ListItemIcon>
                {navItem.icon}
              </ListItemIcon>
              <ListItemText primary={navItem.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {isAdminOrArtist(currentLoggedInUser) && <Divider />}
      <List>
        {navItems2?.map((navItem, index) => (
          <ListItem onClick={() => setMobileOpen(false)} key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                dispatch(pageHasChanged(true))
                router.push(`${navItem.link}`)
            }}
              selected={pathname === navItem.link}
            >
              <ListItemIcon>
                {navItem.icon}
              </ListItemIcon>
              <ListItemText primary={navItem.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          color='inherit'
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
          }}
        >
          {pageNavigated && <AppBarLinearProgress  darkMode={darkMode}  prefersDarkMode={prefersDarkMode}   />}
          <Toolbar variant="dense">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: { xs: 'block' , md: 'none'} }}>
              <MobileHeaderLogo  darkMode={darkMode} setDarkMode={setDarkMode}  />
            </Box>
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
              <Tooltip title="More Options">
                  <IconButton
                    id="basic-button"
                    aria-controls={openNavMenu ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openNavMenu ? 'true' : undefined}
                    onClick={handleClickNavMenu} 
                    >
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
                {/* Video Options Menu */}
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openNavMenu}
                  onClose={handleCloseNavMenu}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <List>
                        <Link href='https://dukaflani.com' underline='none' target="_blank" rel="noopener">
                          <ListItem disableGutters>
                            <ListItemAvatar>
                              <Avatar>
                                <WebOutlinedIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Go Back" secondary="Main Site" />
                          </ListItem>
                        </Link>
                      </List>
                    </MenuItem>
                  </Menu>

            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` }, paddingTop: 10 }}
        >
          <Container maxWidth="sm">
            {currentLoggedInUserProfile && <Stack spacing={2}>
              <MobileUserAccountInfo/>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                { children }
              </Box>
            </Stack>}
            <Copyright/>
          </Container>
        </Box>
      </Box>

        {/* Auth Loading Dialog */}
        <Dialog
            open={showAuthDialog}
            aria-labelledby="alert-dialog-title"    
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle color="danger" id="alert-dialog-title">
              {foundCurrentUser ? "Preparing your dashboard..." : "Checking authentication..."} 
            </DialogTitle>
            <DialogContent>
                <Box sx={{display: 'flex', justifyContent: "center", alignItems: "center", padding: 5}}>
                    <CircularProgress/>
                </Box>
            </DialogContent>
       </Dialog>

         {/* Login Request Dialog */}
       <Dialog
            open={showLoginDialog}
            aria-labelledby="alert-dialog-title"    
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <Box sx={{display: 'flex', justifyContent: "center", alignItems: "center", padding: 5}}>
                    <LoginForm/>
                </Box>
            </DialogContent>
       </Dialog>
    </ThemeProvider>
  );
}


export default MobileNavbar;