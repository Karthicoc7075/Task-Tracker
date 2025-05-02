import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import Toast from './components/toaster/toaster';
import './App.css'
import Routes from './routes/route'

function App() {
  
  return (
    <div className='app'>
     <Toast />
     <Routes/>
    
    </div>
  )
}

export default App
