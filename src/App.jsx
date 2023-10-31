import './App.css'
import { Route , Routes } from 'react-router-dom'
import User from './components/user/User'
import Admin from './components/admin/Admin'

function App() {
  return (
    <div>

        <Routes>
            <Route path='/admin' element={<Admin/>} />
            <Route path='*' element={<User />} />
        </Routes>


    </div>
  )
}

export default App
