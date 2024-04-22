import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../contexts/TokenAuth'


function Header({insideDashBoard}) {

  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)

    const navigate = useNavigate()

    const logout = ()=>{
      sessionStorage.clear()
      setIsAuthorised(false)
      navigate('/')
    }

  return (
    <>
    <Navbar style={{backgroundColor:"cornsilk"}} className="card shadow w-100">
        <Container>
          <Navbar.Brand>
            <Link to={'/'} style={{textDecoration:'none'}}>
            <i className="fa-brands fa-docker fa-bounce me-3 "></i>Project-Fair
            </Link>
          </Navbar.Brand>
          {
            insideDashBoard &&
            <div className="ms-auto">
            <button onClick={logout} className='btn btn-link'>Logout</button>
          </div>
          }
        </Container>
</Navbar>
    
    </>
  )
}

export default Header