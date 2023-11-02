import './App.css'
import { Route , Routes } from 'react-router-dom'
import User from './components/user/User'
import Admin from './components/admin/Admin'
import PushDirect from './PushDirect'

function App() {
  return (
    <div>

        <Routes>
            <Route path='/admin' element={<Admin/>} />
            <Route path='push-direct' element={<PushDirect/>} />
            <Route path='*' element={<User />} />
        </Routes>


    </div>
  )
}

export default App
