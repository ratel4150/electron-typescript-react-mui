import { Box, Typography } from '@mui/material'
import React from 'react'

function PrincipalBanner() {
  return (
    <Box sx={{p:2 ,border:"1px solid #9EEAF9",background:"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"}}>
    <Typography variant='body1' gutterBottom sx={{color:"white"}}>
    VENTA - Ticket Pendiente
    </Typography>
   
   </Box>
  )
}

export default PrincipalBanner