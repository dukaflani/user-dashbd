// MUI Imports
import { TextField } from "@mui/material"


const MyTextField = ({ name, ...otherProps }) => {

  return (
    <>
        <TextField 
            name={name} 
            {...otherProps}
            
             />
    </>
  )
}

export default MyTextField