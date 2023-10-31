import React from 'react'
import { Route , Routes } from 'react-router-dom'
import Home from './Home'
import Problems from './Problems'
import RequestQuestion from './RequestQuestion'
import NavBar from './NavBar'
import NotFound from '../NotFound'
import { useState } from 'react'
import SignUp from '../SignUp'
import Login from '../Login'
import AccountRecovery from './AccountRecovery'
import Ide from '../ideComponents/Ide'
import Dashboard from '../dashboardComponents/Dashboard'
import EditProfile from '../dashboardComponents/EditProfile'


function User() {

  const [isLoggedin, setIsLoggedin] = useState(false);

  return (
    <div>

        <NavBar isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />
        
        <Routes>

            <Route path='/'element={<Home />} />

            <Route path = '/problems' element={<Problems />} />

            <Route path={`/dashboard/:userHandle`} element={<Dashboard setIsLoggedin={setIsLoggedin}/>} />

            <Route path='dashboard/:userHandle/edit' element={<EditProfile />} />

            <Route path='/request-question' element={<RequestQuestion />} />

            <Route path='/login' element={<Login setIsLoggedin={setIsLoggedin} />} />

            <Route path='/sign-up' element={<SignUp/>} />

            <Route path='/account-recovery' element={<AccountRecovery />} />

            <Route path='/ide/:id' element={<Ide isLoggedin={isLoggedin} />}  />

            <Route path='*' element={<NotFound />} />

        </Routes>

    </div>
  )
}

export default User
