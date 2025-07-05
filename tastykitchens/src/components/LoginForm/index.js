import {Redirect} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'

import './index.css'

const LoginForm = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const getLogin = jwtToken => {
    // console.log(jwtToken)
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = props
    history.replace('/')
  }

  const onSubmitUserData = async event => {
    console.log(username, password)
    event.preventDefault()
    const userDetails = {
      username,
      password,
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)

    if (response.ok) {
      setShowSubmitError(false)
      setErrorMsg('')
      getLogin(data.jwt_token)
    } else {
      setShowSubmitError(true)
      setErrorMsg(data.error_msg)
    }
  }

  const handleGuest = async e => {
    e.preventDefault()
    const apiUrl = 'https://apis.ccbp.in/login'
    const userdemoDetails = {
      username: process.env.REACT_APP_USER_NAME,
      password: process.env.REACT_APP_USER_PASSWORD,
    }
    // console.log(userdemoDetails)
    const options = {
      method: 'POST',
      body: JSON.stringify(userdemoDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)

    if (response.ok) {
      setShowSubmitError(false)
      setErrorMsg('')
      getLogin(data.jwt_token)
    } else {
      setShowSubmitError(true)
      setErrorMsg(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  console.log(jwtToken)
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-page-container">
      <div className="login-card-container">
        <div className="login-card">
          <div className="login-page-logo-container">
            <img
              src="https://res.cloudinary.com/dak8sudez/image/upload/v1741532996/Frame_274_r9hgm0.jpg"
              alt="website logo"
              className="form-logo"
            />
            <h1 className="logo-heading">Tasty Kitchens</h1>
          </div>
          <h1 className="login-heading">Login</h1>
          <form className="login-form-container" onSubmit={onSubmitUserData}>
            <div className="input-container">
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <input
                className="input"
                type="text"
                id="username"
                onChange={onChangeUsername}
                value={username}
                placeholder="Enter Username"
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                className="input"
                type="password"
                id="password"
                onChange={onChangePassword}
                value={password}
                placeholder="Enter Userpassword"
              />
              {showSubmitError && <p className="err-msg">*{errorMsg}</p>}
            </div>
            <div className="login-button-container">
              <button className="login-button" type="submit">
                Login
              </button>
              <button
                className="guest-login-button"
                type="button"
                onClick={handleGuest}
              >
                Guest
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="login-image-container">
        <img
          src="https://res.cloudinary.com/dak8sudez/image/upload/v1741533740/Rectangle_1456_1_m6swv9.png"
          alt="website login"
          className="login-image"
        />
      </div>
    </div>
  )
}

export default LoginForm
