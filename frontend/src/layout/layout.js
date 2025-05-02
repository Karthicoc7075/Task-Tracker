import React from 'react'
import './layout.css'
import Sidebar from '../components/Sliderbar/Slidebar'
function Layout({children}) {
  return (
    <div className='layout' >
        <Sidebar />
        {children}
    </div>
  )
}

export default Layout