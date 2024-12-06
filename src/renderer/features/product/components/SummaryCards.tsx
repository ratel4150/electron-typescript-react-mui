// src\renderer\features\product\components\SummaryCards.tsx
import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react'

const SummaryCards = () => {

    const data = [
        { title: 'Ventas Totales', value: '$25,000' },
        { title: 'Productos en Stock', value: '1,250' },
        { title: 'Productos Vendidos', value: '750' },
      ];
  return (
    <Grid container spacing={2}>
    {data.map((item, index) => (
      <Grid item xs={12} sm={4} key={index}>
        <Card>
          <CardContent>
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="h4" color="primary">
              {item.value}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
  )
}

export default SummaryCards