import React from 'react'
import './model.css'
function model({children,setShowModel}) {
  return (
    <div className='model'  >
      <div className='model-wrapper'>
      <div className='model-card'>
           {children}
            </div>
          </div>
    </div>
  )
}

export default model