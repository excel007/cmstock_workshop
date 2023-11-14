"use client"
import { Box, Button, Card, CardContent, InputAdornment, TextField, Typography } from '@mui/material'
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';

import React, { useState } from 'react'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRouter } from 'next/navigation';

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
        onSubmit={handleSubmit((value: User) => {
          alert(JSON.stringify(value))
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

        <Button
          className='mt-8'
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
        >
          Create Account
        </Button>
        <Button
          className='mt-4'
          type='button'
          fullWidth
          variant='outlined'
          onClick={() => {
            router.push("/login")
          }}
        >
          Login
        </Button>

      </form >
    );
  };

  return (
    <Box className='flex justify-center items-center'>
      <Card elevation={7} className='max-w-[345px] mt-10'>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Register
          </Typography>
          {showForm()}
        </CardContent>
      </Card>
    </Box>
  )
}