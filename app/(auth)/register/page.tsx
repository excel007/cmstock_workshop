"use client"
import { Box, Button, Card, CardContent, InputAdornment, TextField, Typography } from '@mui/material'
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';

import React, { useState } from 'react'

interface User {
  username: string;
  password: string;
}

type Props = {}

export default function Register({ }: Props) {
  const [ user, setUser ] = React.useState<User>({ username: "", password: "" })

  const showForm = () => {
    return (
      <form
        onSubmit={() => { alert(JSON.stringify(user)); }
        }
      >
        {/* username */}
        < TextField
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
          onChange={e => setUser({ username: e.target.value, password: e.target.value })}
        />
        {/* password */}
        <TextField
          id="password"
          label="Password"
          autoComplete='password'
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
          onChange={(e) => setUser({ username: user.username, password: e.target.value })}
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
          onClick={() => { }}
        >
          Cancel
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