import App from '../App'
import Layout from '../components/layout/Layout'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import NewPost from '../pages/NewPost/NewPost'
import { Routes, Route } from 'react-router'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="post" element={<NewPost />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
