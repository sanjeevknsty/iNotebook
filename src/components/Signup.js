import React, { useState } from 'react'
// import Notecontext from '../context/notes/NoteContext'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  // const context = useContext(Notecontext)
  // const {signup} = context
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" })


  const handleSignUp = async (e) => {
    e.preventDefault()
    const { name, email, password } = credentials
    const response = await fetch(`http://localhost:8000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },

      body: JSON.stringify({ name, email, password }),


    });
    const json = await response.json()
    console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.jwtToken)
      navigate('/')
    }
    else {
      alert('Error occured,Invalid Details')
    }

  }
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })

  }
  return (
    <div className='container mt-3'>
      <form onSubmit={handleSignUp}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label" >Name</label>
          <input type="text" className="form-control" name="name" id="name" onChange={onChange} aria-describedby="text" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" >Email address</label>
          <input type="email" className="form-control" name="email" id="email" onChange={onChange} aria-describedby="emailHelp" required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name='password' className="form-control" onChange={onChange} id="password" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Confirm Password</label>
          <input type="Password" name='confirmPassword' className="form-control" onChange={onChange} id="confirmPassword" minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>      </div>
  )
}

export default Signup
