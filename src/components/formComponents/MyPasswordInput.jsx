// React Imports
import { useState } from "react"

// NPM Imports
import { useField } from "formik"

// Icons
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// MUI Imports
import { Box, Grid, IconButton, TextField } from "@mui/material"


const MyPasswordInput = ({ name, ...otherProps }) => {

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  const [ field, meta ] = useField(name)

  const textFieldConfig = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
    size: "small"

  }

  if (meta && meta.touched && meta.error) {
    textFieldConfig.error = true;
    textFieldConfig.helperText = meta.error;
  }


  return (
    <>
    <Grid spacing={1} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} container>
      <Grid item xs={11}>
      <TextField 
          type={showPassword ? 'text' : 'password'} 
          {...textFieldConfig}
          />
      </Grid>
      <Grid item xs={1}>
        <Box>
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </Box>
      </Grid>
    </Grid>
    </>
  )
}

export default MyPasswordInput