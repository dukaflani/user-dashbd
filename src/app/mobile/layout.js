"use client"

// React Import
import { useState } from 'react';

// NextJS Imports
import { usePathname, useRouter } from 'next/navigation';

// MUI Imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// Icons
import { Category, ConfirmationNumber, KeyboardVoice, LibraryMusic, LinkSharp, PhonelinkRing, RadioOutlined, SpaceDashboard, VideoLibrary } from '@mui/icons-material';

const drawerWidth = 240;

function MobileNavbar(props) {
  const router = useRouter()
  const pathname = usePathname()
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
      link: '/media-tours'
    },
  ]

  const navItems2 = [
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
  ]



  const drawer = (
    <div>
      <Toolbar sx={{backgroundColor: 'red'}} variant="dense" >
        <Typography sx={{ display: { xs: 'none' , md: 'block'} }} variant="h6" noWrap component="div">
            Logo
          </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navItems1?.map((navItem, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => router.push(`${navItem.link}`)}
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
      <Divider />
      <List>
        {navItems2?.map((navItem, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => router.push(`${navItem.link}`)}
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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
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
          <Typography sx={{ display: { xs: 'block' , md: 'none'} }} variant="h6" noWrap component="div">
            Logo
          </Typography>
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
        sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        { children }
      </Box>
    </Box>
  );
}


export default MobileNavbar;