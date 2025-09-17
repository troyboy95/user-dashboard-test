import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { UserProvider } from './UserContext'
import UserDetails from './pages/UserDetails'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
