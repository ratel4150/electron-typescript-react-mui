import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

function Header() {
  return (
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">POS System</Typography>
    </Toolbar>
  </AppBar>
  )
}

export default Header