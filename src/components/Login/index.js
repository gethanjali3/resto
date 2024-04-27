import Cookies from 'js-cookie'
import {useState} from 'react'

const Login = () => {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [message, setmessage] = useState('')
  const [truefalse, settruefalse] = useState(false)

  const userChange = event => {
    setusername(event.target.value)
  }

  const passwordChange = event => {
    setpassword(event.target.value)
  }

  const submission = async () => {
    const userdetails = {username, password}
    const options = {
      method: 'PUT',
      body: userdetails,
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwtToken', jwtToken)
    } else {
      settruefalse(true)
      setmessage(data.error_msg)
    }
  }

  return (
    <form onSubmit={submission}>
      <input type="text" id="user" value={username} onChange={userChange} />
      <label htmlFor="user">Username</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={passwordChange}
      />
      <label htmlFor="password">Password</label>
      <button type="submit">Login</button>
      {truefalse && <p>{message}</p>}
    </form>
  )
}

export default Login
