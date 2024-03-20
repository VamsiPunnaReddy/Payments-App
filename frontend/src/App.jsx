import { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Dashboad } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { RecoilRoot } from 'recoil'
import { NoPage } from './pages/NoPage';
import { SendMoney } from './components/SendMoney';




function App() {


  return (
    <>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path='/' element={<Navbar />} >
              <Route index element={<Dashboad />} />
              <Route path='/send' element={<SendMoney />} />
              <Route path='/profile' element={<Profile />} />

            </Route>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='*' element={<NoPage />} />
          </Routes>
        </Router>
      </RecoilRoot>

    </>
  )
};



export default App