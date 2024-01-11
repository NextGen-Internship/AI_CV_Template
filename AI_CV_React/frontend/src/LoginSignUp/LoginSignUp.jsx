import React from 'react'
import './LoginSignup.css'




const LoginSignUp = ({children}) => {
  return (
    <div className='container'>
        <div className='header'>
            <div className='text'>Sign Up</div>
            <div className='underline'></div>
        </div>
        {children}
    </div>
  )
}

export default LoginSignUp