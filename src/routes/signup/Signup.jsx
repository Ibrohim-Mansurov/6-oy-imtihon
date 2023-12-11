import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {FiEye , FiEyeOff} from 'react-icons/fi'
import { instance } from '../../api'
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'
  import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
  const navigate = useNavigate()
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const [Firstname , setFirstname] = useState("")
  const [Lastname , setLastname] = useState("")
  const [Email , setEmail] = useState("")
  const [Password , setPassword] = useState("")
  const [loading , setLoading] = useState(false)

  const handleCreateUser = async (e) => {
    e.preventDefault();
     setLoading(true)
    instance.post( `/api/auth/signup`, {
      "firstname": Firstname,
      "lastname" : Lastname,
      "email": Email,
      "password": Password
    })
    .then(response => { 
      if(response.status === 201){
        toast.success("You registered successfully")
        navigate("/auth/login")
      }
    })
    .catch(error => 
      {
        toast.error("You registered unsuccessfully")
        console.log(error);
      })
    .finally( 
      setLoading(false),
      setFirstname(""),
      setLastname(""),
      setEmail(""),
      setPassword("")
    )
   


  }

  return (
    <>
    {loading ? <h1>Loading</h1> : 
      <div className="sign__up" >
        <div className="logo__sign-up"><h2>Ibrohim</h2></div>
        <p className="sign__up-text">Sign up</p>
        <form className="sign__up-form" onSubmit={handleCreateUser}>
          <input type="text" placeholder='Firstname' required value={Firstname} onChange={(e) => setFirstname(e.target.value)} />
          <input type="text" placeholder="Lastname" required value={Lastname} onChange={(e) => setLastname(e.target.value)}/>
          <input type="email" placeholder="Email" required value={Email} onChange={(e) => setEmail(e.target.value)}/>
          <div className="password__wrapper">
            <input type={isVisiblePassword ? "text" : "password"} placeholder="Password" required value={Password} onChange={(e) => setPassword(e.target.value)} />
            {
              isVisiblePassword ? <FiEye onClick={() => setIsVisiblePassword(false)}/> : <FiEyeOff onClick={() => setIsVisiblePassword(true)}/>
            }
          </div>
          <p>Don't you have an account? <Link className="login__text" to="/auth/login">Login.</Link></p>
          <button type="submit" className="sign__up-btn">{loading ? "Loading..." : "Sign up"}</button>
        </form>
      </div>}
    </>
  )
}

export default Signup
