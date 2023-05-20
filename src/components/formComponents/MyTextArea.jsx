// MUI Imports
import { TextField } from "@mui/material"

const MyTextArea = ({ name, ...otherProps }) => {
  return (
    <>
        <TextField 
            name={name} 
            {...otherProps}
            multiline
            maxRows={5}
            
             />
    </>
  )
}

export default MyTextArea