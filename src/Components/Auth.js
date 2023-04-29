import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'


export default function Auth() {
  const [auth, showauth] = useState(true)
  const change = () => {
    if (auth) {
      showauth(false)
    }
    else {
      showauth(true)
    }
  }

  return (
    <div className='auth'>
      <div className="left">
        {auth ? <div className='welcome'>Welcome!
          <h6 id='leftdesc'>Don't have an account?</h6>
        </div> : <div className='welcome'>Already an user?
          <h6 id='leftdesc'>Please Login</h6>
          </div>}
        <button className='change' onClick={change}>
          {auth?"Signup":"SignIn"}
        </button>
      </div>
      <div className="right">
        {auth ? <Login /> : <Register />}

      </div>

    </div>
  )
}
