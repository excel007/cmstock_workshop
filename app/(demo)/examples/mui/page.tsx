import { Button, Stack } from '@mui/material'
import React from 'react'

type Props = {}

export default function Mui({}: Props) {
  return (
    <div>MUI
<Stack spacing={2} direction={'row'}>
    <Button variant='text'>Text</Button>
    <Button variant='contained'>Text</Button>
    <Button variant='outlined'>Text</Button>
</Stack>


    </div>
  )
}