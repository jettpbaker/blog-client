const isLoggedIn = () => {
  const token = localStorage.getItem('jwt')

  return !!token
}

export default isLoggedIn
