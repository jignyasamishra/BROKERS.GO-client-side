
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { UseGetUserId } from '../Hooks/UseGetUserId';
import { useNavigate } from 'react-router-dom';

import { useCookies } from 'react-cookie';
import { AiFillStar} from 'react-icons/ai';


export default function Home() {
  const navigate = useNavigate()
  const userId = UseGetUserId()
  const [houses, sethouse] = useState([])
  const [savedHouses, setsaved] = useState([])
  const [search, setsearch] = useState("")
  const [cookies, setcookies] = useCookies(["accessToken"])


  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get("http://localhost:3001/home")
        sethouse(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    const fetchsavedHouses = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/home/savedHouses/ids/${userId}`)
        setsaved(response.data.savedHouses)
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchHouses()
    fetchsavedHouses()
  }, [])

  const savedHome = async (houseId) => {
    try {
      const response = await axios.put("http://localhost:3001/home/show", { houseId, userId })
      console.log(response);
      setsaved(response.data.savedHouses);
      console.log(response._id);

    } catch (error) {
      console.log(error);
    }
  }
  // const unsave = async (houseId) => {
  //   try {
  //     const response = await axios.post(`http://localhost:3001/home/delete/${userId}`, { houseId })
  //     setsaved(response.data.savedHouses)
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const details = async (houseId) => {
    try {
      window.localStorage.setItem("houseId", houseId)
      navigate("/show-modals")
    } catch (error) {

    }
  }
  const isalreadysaved = (id) => savedHouses.includes(id)

  const showcontact = async () => {
    navigate("/auth")

  }



  return (
    <div className='home'>

      <div className='heading'>
        <h2>Get Yourself A Home</h2>
      </div>

      <input id='searchbar' placeholder='Search Locality' onChange={(event) => {
        setsearch(event.target.value)
        console.log(search);
      }} value={search} type="text" />



      {
        houses.filter((house) => {
          // return search.toLowerCase()===""?house:search.toLowerCase().includes(house.address.toLowerCase())
          if (search !== "") {
            if (house.address.toLowerCase().startsWith(search)) {
              return house.address.toLowerCase().startsWith(search)
            }

          }
          else {
            return house
          }
        }).map((house) => (
          <ul className='housecontainer'>
            <li className='housedetails'
              onClick={() => {
                details(house._id)
              }}
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

                  <div className="favourite">
                    <a style={{fontSize:"2.5rem"}} className='save' disabled={isalreadysaved(house._id)} onClick={() => { savedHome(house._id) }}>
                      {isalreadysaved(house._id)?<AiFillStar style={{color:"#FFD53D"}}/>:<AiFillStar style={{color:"grey"}}/>}</a>
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
