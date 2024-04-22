import React from 'react'
import { Link } from 'react-router-dom' 

function Footer() {
  return (
        <div style={{height:'300px',backgroundColor:"lightsteelblue"}} className='p-5 mt-5 w-100'>
         <div className="footer-content d-flex justify-content-between">
            <div style={{width:'400px'}} className="media">
                <h5 className='d-flex'><i style={{height:'25px'}} className='fa-regular fa-file-code me-3'></i>ProjectFair</h5>
                <p style={{textAlign:'justify'}}> Designed and built with all the love in the world by the bootstrap team with the help of our conributors.</p>
                <span> Code Licenced MIT,docs cc by 3.0 </span>
                <p>Currently v5.3.2</p>
            </div>
            <div className="link d-flex flex-column">
                    <h5 className='d-flex'>Link</h5>
                    <Link to={'/'} style={{textDecoration:'none',color:'black'}} >Landing Page</Link>
                    <Link to={'/home'} style={{textDecoration:'none',color:'black'}} >Home Page</Link>
                    <Link to={'watch'} style={{textDecoration:'none',color:'black'}} >Watch History</Link>
            </div>
            <div className="guides d-flex flex-column">
                <h5>Guides</h5>
                <a href="https://react.dev/" target='_blank' style={{textDecoration:'none',color:'black'}}>React JS</a>
                <a href="https://reactrouter.com/en/main" target='_blank' style={{textDecoration:'none',color:'black'}}>React Routing</a>
                <a href="https://react-bootstrap.netlify.app/" target='_blank' style={{textDecoration:'none',color:'black'}}>React Bootstrap</a>

            </div>
            <div className="contact">
                <h5>Contact us</h5>
                <div className='d-flex'>
                    <input type="text" className="form control  me-1 rounded" placeholder='email id:-' />
                    <button className='btn btn-info'><i className="fa-solid fa-arrow-right"></i></button>
                </div>
                <div className='icons d-flex justify-content-between mt-3'>
                <a href="https://twitter.com/?lang=en" target='_blank' style={{textDecoration:'none',color:'red'}}><i class="fa-brands fa-x-twitter fa-1x"></i></a>
                <a href="https://www.instagram.com/" target='_blank' style={{textDecoration:'none',color:'red'}}><i class="fa-brands fa-instagram fa-1x"></i></a>
                <a href="https://www.facebook.com/" target='_blank' style={{textDecoration:'none',color:'red'}}> <i class="fa-brands fa-facebook fa-1x"></i></a>
                <a href="https://in.linkedin.com/" target='_blank' style={{textDecoration:'none',color:'red'}}><i class="fa-brands fa-linkedin fa-1x"></i> </a>
                <a href="https://github.com/" target='_blank' style={{textDecoration:'none',color:'red'}}><i class="fa-brands fa-github fa-1x"></i> </a>
                <a href="" target='_blank' style={{textDecoration:'none',color:'red'}}> <i class="fa-solid fa-phone fa-1x"></i></a>
                </div>
            </div>
        </div>
        <p className='text-centerr mt-5'>Copyright & copy; 2024 Media-player,Built with React</p>
        </div>
  )
}

export default Footer