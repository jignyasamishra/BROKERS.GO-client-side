import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [cookie, setcookies] = useCookies(["accessToken"])
    const navigate = useNavigate()
    const onsubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post("http://localhost:3001/auth/login", { username, password })
            setcookies("accessToken", response.data.token)
            window.localStorage.setItem("userId", response.data.userId)
            navigate("/")
            if(!response.data.token){
                navigate("/auth")
              }
           

            if(response.data.token==undefined){
                // alert("not right")
                let a=document.getElementById("usernameone");
                let b=document.createElement("span");
                b.setAttribute("id","wrong")
                b.innerText=("Please Fill in proper Credentials");
                b.style.color="red"
                b.style.fontSize="1.5rem"
              if(a.childElementCount==2){
                a.appendChild(b)}
                console.log(a.childElementCount);
              }




        } catch (error) {
            console.error(error);
        }


    }
    return (
        <div>
            <form action="" onSubmit={onsubmit}>
                <h2 className='login'>Login</h2>
                <div className="form-group" id='usernameone'>
                    <label htmlFor="username"></label>
                    <input placeholder='Username' type="text" id='username' onChange={(event) => { setusername(event.target.value) }} value={username} />
                </div>
                <div className="form-group">
                    <label htmlFor="password"></label>
                    <input placeholder='Password' type="password" id='password' onChange={(event) => { setpassword(event.target.value) }} value={password} />
                </div>
                <button className='submit' type='submit'>Login</button>
            </form>

        </div>
    )
}
