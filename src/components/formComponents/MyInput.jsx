// NPM Imports
import { useField } from "formik"

// MUI Imports
import { TextField } from "@mui/material"


const MyInput = ({ name, ...otherProps }) => {

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
     <TextField {...textFieldConfig} />
    </>
  )
}

export default MyInput