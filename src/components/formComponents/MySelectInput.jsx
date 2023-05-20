// MUI Imports
import { TextField, MenuItem } from "@mui/material"

// NPM Imports
import { useField, useFormikContext } from "formik"



const MySelectInput = ({ name, label, data, ...otherProps }) => {

  const { setFieldValue } = useFormikContext()

  const [field, meta] = useField(name)

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  }

  const selectConfig = {
    ...field,
    ...otherProps,
    select: true,
    variant: 'outlined',
    fullWidth: true,
    onChange: handleChange,
    size: 'small'
  }



  if (meta && meta.touched && meta.error) {
    selectConfig.error = true
    selectConfig.helperText = meta.error
  }


  return (
    <>
        <TextField {...selectConfig} label={label} >
          {data?.map((option, i) => (
            <MenuItem key={i} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </>
  )
}

export default MySelectInput