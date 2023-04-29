import React from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import logo from '../Photos/logo.png'

export default function Navbar() {
  const [cookies, setcookies] = useCookies(["accessToken"])
  const navigate = useNavigate()
  const logout = () => {
    setcookies("accessToken", "");
    window.localStorage.removeItem("userId");
    navigate("/auth")
  }
  return (
    <div>
      <div className="nav">
        <div className="logo">
          <img src={logo} alt="" />
        </div>

        <a href="/">Home</a>



        {!cookies.accessToken ? (<a href="/auth">SignIn</a>) : <>
          <a href="/create-recipe">Create</a>
          <a href="/saved-recipes">Favourites</a>
          <a onClick={logout}>Logout</a>
        </>}

      </div>


    </div>
  )
}
