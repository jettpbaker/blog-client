import App from '../App'
import Profile from '../Profile'
import Layout from '../components/layout/Layout'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import { Routes, Route } from 'react-router'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<App />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
