import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { UseGetUserId } from '../Hooks/UseGetUserId';
import swal from 'sweetalert';
export default function Create() {
   const userid = UseGetUserId()

  const navigate = useNavigate()

  const [house,sethouse] = useState({
    address:"",
    description:"",
    features:"",
    imageUrl:"",
    price:"",
    contact:"",
    userOwner:userid  


  })
  const handlechange = (event) => {
    
    const {name,value} = event.target
    sethouse({...house,[name]:value})
    console.log(house);

  }
  const onsubmit= async (event)=>{
     
    event.preventDefault()
    try {
      await axios.post("http://localhost:3001/home",house)
      swal({title:"Your property has been posted",
    icon:"success"})
      navigate("/")
      
    } catch (error) {
      console.log(error);
    }

  }
  return (
   <div className="post">
    <div className="imageholder">

    </div>
     <div className='createpost'>
      <h2 className='heading'>Sell or Rent your Property</h2>
      <form className='form ' action="" onSubmit={onsubmit}>
        <label htmlFor="address">House Address</label>
        <input placeholder='Ex:-Niladrivihar,Chandrasekharpur,BBSR' type="text" id='address' onChange={handlechange} name="address" />

        <label htmlFor="about">About</label>
        <input placeholder='Ex:-This plot has 3 bedrooms attached with a kitchen' type="text" id='about' name="description" onChange={handlechange} />



        <label htmlFor="overview">Overview</label>
        <input placeholder='Ex:-3' type="text" id='overview' name='features' onChange={handlechange} /> 

        <label htmlFor="img">Image</label>
        <input placeholder='Add link of the Image' type="text" id='img' name='imageUrl' onChange={handlechange} />

        <label htmlFor="price">Price</label>
        <input placeholder='Ex:-20k INR' type="text" id='price' name='price' onChange={handlechange} />

        <label htmlFor="contact">Contact Owner</label>
        <input placeholder='Enter your phone number' type="text" id='contact' name='contact' onChange={handlechange} />

        <button type='submit'>Create</button>
      </form>
    </div>
   </div>
  )
}
