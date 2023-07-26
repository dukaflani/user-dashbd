// MUI Imports
import { Avatar, Box, Card, CardContent, CardHeader, Stack, Typography } from "@mui/material"
import { red } from "@mui/material/colors"

// Icons
import { ArrowDownward } from "@mui/icons-material"

// NPM Imports
import { useSelector } from "react-redux"


const UserAccountInfo = () => {
  const userProfile = useSelector((state) => state.auth.profileInfo) 

  return (
    <Box>
        <Card variant="outlined">
          <CardHeader
             avatar={
              <Avatar sx={{width: 60, height: 60}} src={userProfile?.profile_avatar} alt={`${userProfile?.first_name} ${userProfile?.last_name}`} />
            }
            action={
              <Stack>
                <Typography variant="body2">Account Balance</Typography>
                <Stack direction="row" spacing={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                  <Avatar variant="square" sx={{ height: 20, width: 15, bgcolor: red[500], padding: 1 }}>
                    <ArrowDownward/>
                  </Avatar>
                  <Typography variant="h6">$0.00</Typography>
                </Stack>
              </Stack>
            }
            title={
              <Typography variant="subtitle2">{userProfile?.stage_name}</Typography> 
            }
            subheader={
              <Typography sx={{textTransform: 'capitalize'}} variant="caption">{userProfile?.role}</Typography>
            }
           />
           <CardContent>
              <Stack>
                <Typography variant="subtitle2">Account Notification:</Typography>
                <Typography variant="body2">
                  {userProfile?.role == "USER" ? 
                  "A 'USER' account does not have enough privillages to add content on Dukaflani. Please upgrade to an 'ARTIST' account." 
                  : 
                  "Welcome to the Dukaflani Creator's Hub. To have your products added to the 'SHOP' page or events to the 'EVENTS' page, contact us on +254 723-353-630."}
                  </Typography>
              </Stack>
           </CardContent>
        </Card>
    </Box>
  )
}

export default UserAccountInfo