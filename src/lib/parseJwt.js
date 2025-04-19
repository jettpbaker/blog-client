function parseJwt() {
  const token = localStorage.getItem('jwt')
  if (!token) return null
  try {
    let [, payload] = token.split('.')
    let b64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    b64 += '='.repeat((4 - (b64.length % 4)) % 4)

    const decodedToken = JSON.parse(atob(b64))
    return decodedToken
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return null
  }
}

export default parseJwt
