import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {RxRulerSquare} from 'react-icons/rx'
import {BiDirections} from 'react-icons/bi'
import {MdPermContactCalendar}  from 'react-icons/md'
import {RiContactsFill} from 'react-icons/ri'

export default function Modals() {
  const [data, setdata] = useState("")
  const [name, setname] = useState("")
  useEffect(() => {
    const showfull = async () => {
      try {
        const houseId = window.localStorage.getItem("houseId")
        const response = await axios.get(`http://localhost:3001/home/${houseId}`)

        setdata(response.data);
        const userId = response.data.userOwner
        const user = await axios.get(`http://localhost:3001/auth/${userId}`)
        setname(user.data.username)

      } catch (error) {
        console.log(error)
      }
    }

    showfull()



  }, [])

  return (
    <div className='modals'>
      <div className="pricefeaturemod">
        <div id='one'>₹{data.price}<span>Per Month</span></div>
        
        <div id='two'>{data.features}BHK</div>
      </div>
      <div className="folder">
      <div  className='houseimg'>
        <img  src={data.imageUrl} alt="" />
      

      </div>
     <div className="card big ">
     <div className='inside'>
      <BiDirections/>
      {data.address}
      </div>
      <div className='inside'>
        <RxRulerSquare/>
        {data.description}</div>


      <div className='inside'>
        <MdPermContactCalendar/>
        {data.contact}</div>

      <div className='inside'>
        <RiContactsFill/>
        Posted By {name}
      </div>
     </div>
      </div>

    </div>
  )
}
