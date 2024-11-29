import React from 'react'

import PrincipalBanner from './components/PrincipalBanner'
import SearchBarProducts from './components/SearchBarProducts'
import Prueba from './components/Prueba'

function SalesDashBoard() {
  return (
    <> {/* <ToolBarButtons/> */}
    <PrincipalBanner/>
    <SearchBarProducts/>
    <Prueba/>
   {/*  <ToolBarButtons/> */}
   {/*  <PrincipalTable productosTicket={rows}/> */}
    </>
  )
}

export default SalesDashBoard