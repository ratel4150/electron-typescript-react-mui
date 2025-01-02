// src\renderer\features\inventory\components\inventoryItemFormSkeleton.tsx
import { Box, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material'
import React from 'react'

const InventoryItemFormSkeleton = () => {
  return (
    <Card sx={{ margin: '20px auto', padding: '20px' }}>
    <CardContent>
      <Typography variant="h5" component="div" gutterBottom>
        <Skeleton width="50%" />
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={40} />
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant="rectangular" height={40} />
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant="rectangular" height={40} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={40} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={40} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={40} />
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'right' }}>
          <Skeleton variant="rectangular" width="30%" height={40} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
  )
}

export default InventoryItemFormSkeleton