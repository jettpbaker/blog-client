import Home from '../pages/Home/Home'
import Layout from '../components/layout/Layout'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import NewPost from '../pages/NewPost/NewPost'
import Post from '../pages/Post/Post'
import { Routes, Route } from 'react-router'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="post" element={<NewPost />} />
        <Route path="post/:id" element={<Post />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
