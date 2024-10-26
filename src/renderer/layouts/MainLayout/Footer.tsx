import { Box, Typography } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    <Box
    component="footer"
    sx={{
      p: 2,
      backgroundColor: (theme) => theme.palette.grey[800],
      color: (theme) => theme.palette.common.white,
      textAlign: "center",
    }}
  >
    <Typography variant="body2">
      © {new Date().getFullYear()} POS System. Todos los derechos reservados.
    </Typography>
  </Box>
  )
}

export default Footer