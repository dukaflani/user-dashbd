// MUI Imports
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material"

// NPM Imports
import { useField, useFormikContext } from "formik"


const MyCheckBox = ({ name, label, legend, ...otherProps }) => {

  const [ field, meta ] = useField(name)
  
  const { setFieldValue } = useFormikContext()

  const handleChange = (evt) => {
    const { checked } = evt.target;
    setFieldValue(name, checked);
  }

  const checkboxConfig= {
    ...field,
    onChange: handleChange,
    size: 'small'
  }

  const formControlConfig = {}

  if (meta && meta.touched && meta.error) {
    formControlConfig.error = true
  }


  return (
    <FormControl {...formControlConfig}>
      <FormLabel component='legend'>{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel control={<Checkbox {...checkboxConfig} />} label={label} />
      </FormGroup>
    </FormControl>
  )
}

export default MyCheckBox