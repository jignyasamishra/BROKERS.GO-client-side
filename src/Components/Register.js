import React, { useState } from 'react'
import axios from 'axios'
export default function Register() {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
 
    const onsubmit = async (event) => {
        event.preventDefault();
        try {
           const response =  await axios.post("http://localhost:3001/auth/register", {username, password})
       
            setusername("")
            setpassword("")
           
          if(response.data.user!==null){
            let a = document.getElementById("username_one")
            let b = document.createElement("span")
            b.setAttribute("id","wrong")
            b.innerText = ("Username already exists")
            b.style.color = "red"
            b.style.fontSize = "1rem"
            if(a.childElementCount==2)
            a.appendChild(b)
            
          }
          else{
            let a = document.getElementById("username_one")
            let b = document.createElement("span")
            b.setAttribute("id","right")
            b.innerText = ("Registration Successfull")
            b.style.color = "green"
            b.style.fontSize = "1rem"
        a.appendChild(b)
          

          }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <form action="" onSubmit={onsubmit}>
                <h2 className='login'>Sign Up</h2>
                <div id='username_one' className="form-group">
                    <label htmlFor="username"></label>
                    <input placeholder='Username' type="text" id='username' onChange={(event) => { setusername(event.target.value) }} value={username} />
                </div>
                <div className="form-group">
                    <label htmlFor="password"></label>
                    <input  placeholder='Password' type="password" id='password' onChange={(event) => { setpassword(event.target.value) }} value={password} />
                </div>
                <button className='submit' type='submit'>SignUp</button>
               
            </form>

        </div>
    )
}