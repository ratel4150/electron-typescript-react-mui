import React from 'react'

import PrincipalBanner from './components/PrincipalBanner'
import SearchBarProducts from './components/SearchBarProducts'

function SalesDashBoard() {
  return (
    <> {/* <ToolBarButtons/> */}
    <PrincipalBanner/>
    <SearchBarProducts/>
   {/*  <ToolBarButtons/> */}
   {/*  <PrincipalTable productosTicket={rows}/> */}
    </>
  )
}

export default SalesDashBoard