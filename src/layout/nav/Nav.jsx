import React from 'react'
import "./Nav.css"
import { Link, NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const  RESTRICTED_ROUTES_FOR_NAV = ['/admin','/auth/login', '/auth/signup' ,'/admin/create' ,'/admin/manage']

const Nav = () => {

  const {pathname} = useLocation()
  const token = localStorage.getItem("token")

  return RESTRICTED_ROUTES_FOR_NAV.includes(pathname) ? null : (
    <>
     <div className='nav'>
        <h1>Ibrohim</h1>
        <div className='login-signup'>
            <h4><Link className='home'  to="">Home</Link></h4>
           {!token ?
           <div className='route'>
            <h4><NavLink className='login' to="auth/login">Log In</NavLink></h4>
            <h4><NavLink className='signup' to="auth/signup">Sign Up</NavLink></h4>
           </div>
            :
            <h4><Link className='admin' to="/admin/create">Admin</Link></h4>
           }
        </div>
     </div>
    </>
  )
}

export default Nav