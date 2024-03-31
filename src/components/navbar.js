import React,{useEffect} from 'react'
import { Link,useLocation ,useNavigate} from 'react-router-dom'


export default function Navbar() {
  let location = useLocation();
  const navigate = useNavigate()

  const handleLogOut = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  
  useEffect(()=>{
    // const loc = location
    // console.log(location.pathname)
  },[location]);
  return (

    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === '/home'?'active' : ''} `} aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname=== '/about'?'active' : ''} `}to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('token')? <div><Link to="/login"><button type="button" className="btn btn-primary mx-2" >Login</button></Link>
      <Link to="/signup" ><button type="button" className="btn btn-primary mx-2">SignUp</button></Link> </div>
      :<button type="button" onClick={handleLogOut} className="btn btn-primary mx-2">Logout</button>
     }
    </div>
  </div>
</nav>
    </div>
  )
}
