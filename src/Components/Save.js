import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { UseGetUserId } from '../Hooks/UseGetUserId';

export default function Save() {
  const userId = UseGetUserId()
  const [savedHouses, setsaved] = useState([])
  useEffect(() => {
  const fetchsavedHouses = async ()=>{
    try {
      const response = await axios.get(`http://localhost:3001/home/savedHouses/${userId}`)
      setsaved(response.data.savedHouses)
    } catch (error) {
      console.log(error);
    }
  }
  fetchsavedHouses()
  }, [])

  return (
    <div className='home'>
    <div className='heading'>
      <h2>SAVED HOUSES</h2>
    </div>
    {
      savedHouses.map((house) => (
        <ul className='housecontainer'>
        <li className='housedetails'
         
          key={house._id}
        >
          <div className='folder'>
            <div className='houseimg'>
              <img src={house.imageUrl} alt="" />
            </div>
            <div className='card'>

              <div className='address'>
                {house.address}
              </div>
              <div className='featurecontainer'>
                <div className='features'>
                  {house.features} <span>BHK</span>
                </div>
                <div className='price'>
                ₹{house.price}
                  <span id='cn'>/month</span>
                </div>
                <div className='contact'>
                {house.contact}

                  <span id='cn'>Contact Number</span>
                </div>
              </div>

             
            </div>
          </div>

        </li>

      </ul>
      ))
    }
  </div>
  )
}
