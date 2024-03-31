import React, { useContext, useState } from 'react'
import Notecontext from '../context/notes/NoteContext'

const Login = () => {
  const context = useContext(Notecontext)
  const {login} = context
  const [credentials,setCredentials] = useState({email:"",password:""})

  const onChange = (event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value})
    
  } 
  const handleClick =async (e)=>{
    e.preventDefault()
    login(credentials.email,credentials.password)
    
  }
  return (
    <div className='mt-3'>
<form onSubmit={handleClick}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label" >Email address</label>
    <input type="email" className="form-control" name="email" id="email" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password"  className="form-label">Password</label>
    <input type="password" name='password' className="form-control" onChange={onChange} id="password"/>
  </div>
  <button  type="submit" className="btn btn-primary">Login</button>
</form>   
 </div>
  )
}

export default Login
