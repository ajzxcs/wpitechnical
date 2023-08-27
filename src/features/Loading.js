import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

function Loading() {
  return (
    <div>
        <Backdrop open={true}>
            <CircularProgress color='primary' />
        </Backdrop>
    </div>
  )
}

export default Loading