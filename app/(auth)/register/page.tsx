"use client"
import { Alert, Box, Button, Card, CardContent, InputAdornment, TextField, Typography } from '@mui/material'
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';

import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { userSelector, add, signUp } from '@/store/slices/userSlice';
import { useAppDispatch } from '@/store/store';

interface User {
  username: string;
  password: string;
}

type Props = {}

export default function Register({ }: Props) {
  const initialValue: User = { username: "", password: "" }
  const formValidateSchema = yup.object().shape({
    username: yup.string().required("Username is required!!!").trim(),
    password: yup.string().required("Password is required!!!").trim(),
  })
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: initialValue,
    resolver: yupResolver(formValidateSchema)
  })
  const router = useRouter()

  const showForm = () => {
    return (
      <form
        onSubmit={handleSubmit(async (value: User) => {
          // alert(JSON.stringify(value))
          // dispatch(signUp(value));
          const result = await dispatch(signUp(value));
          if (signUp.fulfilled.match(result)) {
            console.log(result)
            alert("Register successfully!!")
          } else if (signUp.rejected.match(result)) {
            alert("Register failed!!")
          }
        })}
      >
        {/* username */}
        < Controller
          name="username"
          control={control}
          render={({ field }) => (
            < TextField
              {...field}
              error={Boolean(errors.username?.message)}
              helperText={errors.username?.message?.toString()}
              id="username"
              label="username"
              autoComplete='email'
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }
              }
              variant="outlined"
              margin='normal'
              fullWidth
              autoFocus
            />
          )}

        />

        {/* password */}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              id="password"
              label="Password"
              autoComplete='password'
              type='password'
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              margin='normal'
              fullWidth
            />
          )}
        />
        {reducer.status == "failed" &&
          (<Alert severity="error">Register failed</Alert>)
        }
        <Button
          className='mt-8'
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          disabled={reducer.status == "fetching"}
        >
          Create Account
        </Button>
        <Button
          className='mt-4'
          type='button'
          fullWidth
          variant='outlined'
          onClick={() => {
            dispatch(add())
            router.push("/login")
          }}
        >
          Login
        </Button>

      </form >
    );
  };


  const reducer = useSelector(userSelector)
  const dispatch = useAppDispatch()

  return (
    <Box className='flex justify-center items-center'>
      <Card elevation={7} className='max-w-[345px] mt-10'>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Register [{reducer.count}]
          </Typography>
          {showForm()}
        </CardContent>
      </Card>
    </Box>
  )
}