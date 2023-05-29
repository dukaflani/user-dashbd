// NextJs Imports
// import { useRouter } from "next/router" 

// MUI Imports
import { Box, Button, Grid, Stack, Typography, CircularProgress } from "@mui/material"

// NPM Imports
import { Formik, Form } from "formik"
import * as Yup from 'yup'
import { useDispatch } from "react-redux"
import { useMutation } from "@tanstack/react-query"

// Project Imports
import { updateToken } from "@/Redux/Features/auth/authSlice"
import { loginUser } from "@/axios/axios"
import MyInput from "./formComponents/MyInput"
import MyPasswordInput from "./formComponents/MyPasswordInput"
import MyCheckBox from "./formComponents/MyCheckBox"





const LoginForm = () => {
    // const router = useRouter()
    const dispatch = useDispatch()
    const INITIAL_FORM_STATE = {
        password: "",
        email: "",
        keepLoggedIn: false,
    
    }
    
    const FORM_VALIDATION = Yup.object().shape({
        password: Yup.string().required("Required"),
        email: Yup.string().email("Please enter a valid email").required("required"),
        keepLoggedIn: Yup.boolean()
    })

    const { mutate: performLogin, isLoading: loginLoading, isError: loginError, isSuccess: loginSuccess } = useMutation(loginUser, {
        onSuccess: (data, _variables, _context) => {
            // Update token in redux state
            dispatch(updateToken(data?.access));
            // Set cookie
            fetch(process.env.NEXT_PUBLIC_BAKE_URL, {
                method: 'POST',
                body: JSON.stringify({ refreshToken: data?.refresh }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            // Navigate to profile settings
            // router.push({ pathname: `/account/profile/settings` });
        },
    })


    const onSubmit = (values) => {
        performLogin(values)
    }




  return (
    <Formik 
        initialValues={{...INITIAL_FORM_STATE}} 
        validationSchema={FORM_VALIDATION} 
        onSubmit={onSubmit}
        >
        <Form>
            <Stack spacing={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Typography variant="h6">Login</Typography>
                    </Grid>
                    {/* <Grid item xs={12} >
                        <Stack direction="row" spacing={0.5}>
                            <Typography variant="subtitle2">Don&apos;t have an account?</Typography>
                            <Box onClick={() => router.push({ pathname: '/account/register' })} sx={{cursor: 'pointer'}}>
                                <Typography color='primary' variant="subtitle2">Register here</Typography>
                            </Box>
                        </Stack>
                    </Grid> */}
                    <Grid item xs={12}>
                        <MyInput required name="email" label="Email" />
                    </Grid>
                    <Grid item xs={12}>
                        <MyPasswordInput required name="password" label="Password" />
                    </Grid>
                    <Grid item xs={12}>
                        <MyCheckBox name="keepLoggedIn" legend="Keep you logged in?" label="Yes, remember me." />
                    </Grid>
                    <Grid item xs={12}>
                        <Button size="small" variant="contained" type="submit" fullWidth startIcon={loginLoading && <CircularProgress color="inherit" size={25} />} >{loginLoading ? "Logging In..." : "Login"}</Button>
                    </Grid>
                    {/* <Grid item xs={12} >
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
                            <Box onClick={() => router.push({ pathname: '/' })} sx={{cursor: 'pointer'}}>
                                <Typography color='primary' variant="subtitle2">Forgot Password?</Typography>
                            </Box>
                        </Box>
                    </Grid> */}
                </Grid>
            </Stack>
        </Form>
    </Formik>
  )
}

export default LoginForm