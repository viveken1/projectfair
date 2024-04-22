import React, { useEffect, useState } from 'react'
import images from '../assets/admin1.png'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import ProjectCard from '../Components/ProjectCard'
import { Card } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectsAPI } from '../services/allAPI'


function Home() {

  const [homeProjects,setHomeProjects] = useState([])
const navigate = useNavigate()
  const [loginStatus,setLoginStatus] = useState(false)

  console.log(homeProjects);

  useEffect(()=>{
    getHomeProjects()
    if(sessionStorage.getItem("token")){
      setLoginStatus(true)
    }else{
      setLoginStatus(false)
    }
  },[])

  const handleProjects = ()=>{
    if(loginStatus){
      navigate('/projects')
    }else{
      toast.warning("please Login to Acess our All Projects")
    }
  }

  const getHomeProjects = async()=>{
    try {
      const result = await getHomeProjectsAPI()
      console.log(result);
      if(result.status==200){
        setHomeProjects(result.data)
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
    {/* landing */}
    <div style={{height:"100vh",backgroundColor:"lightseagreen"}} className='w-100 d-flex justify-content-center align-items-center rounded shadow'>
        <div className='container'>
            <div className='row align-items-center'>
                <div className='col-lg-6'>
                    <h1 style={{fontSize:"80px"}}>ProjectFair</h1>
                    <p style={{textAlign:"justify"}} >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad reprehenderit asperiores possimus voluptate debitis sapiente magni optio, quod iure ducimus voluptatibus labore pariatur! Modi in amet dolorem doloremque culpa at!</p>
                   {loginStatus?
                   <Link to = {'./dashboard'}  ><button className='btn btn-danger'>Manage your Projects <span><i class="fa-solid fa-angles-right"></i></span></button></Link>:
                   <Link to = {'./login'}  ><button className='btn btn-danger'>Start to Explore</button></Link>}
                </div>
                <div className='col-lg-6'>
                    <img src={images} style={{width:"600px"}} alt="" />
                </div>
                
            </div>
        </div>
    </div>
    {/* projects  */}
    <div className='mt-5 mb-5'>
        <h1 style={{fontSize:"70px"}} className='text-center mb-5'> Explore Our Projects </h1>
        <marquee>
            <div className='d-flex'>
            {
              homeProjects?.length>0 &&
              homeProjects?.map(project=>(
                <div key={project} className="me-5">
                  <ProjectCard displayData={project}/>
                </div>
              ))
              }
            </div>
        </marquee>
        <button style={{textDecoration:"none",marginLeft:"620px",color:"blueviolet"}} onClick={handleProjects} className='btn btn-link mt-3 '>Click here to View More Projects</button>
        </div>
        {/* testimony */}
        <div className='d-flex  align-items-center mb-5 flex-column'>
            <h1>Our Testimonials</h1>
        <div className='d-flex justify-content-evenly align-items-center mt-3 w-100'>
        <Card style={{ width: '18rem' }}>
     
      <Card.Body>
        <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
            <img width={'60px'} height={'60px'} className='rounded-circle img-fliud ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlUNJVa-PFTh5268yZYAj5ueMVSudYb1qvuQfsQCahQ4i3HgYT_aAEDaCgvRJRRr8y2bI&usqp=CAU" alt="" />
            <span>Vivek</span>
        </Card.Title>
        <Card.Text>
            <div className='d-flex justify-content-center'>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star  text-warning"></i>
            <i class="fa-regular fa-star  text-warning"></i>

            </div>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur velit, eligendi, quaerat possimus illum mollitia praesentium esse iste ex laudantium repellat nesciunt!</p>
        </Card.Text>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      
      <Card.Body>
        <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
        <img  width={'60px'} height={'60px'} className='rounded-circle img-fliud' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8lqhNBRN7emteIrtWkHLAmsOgmTgb7WDOIyttFv3exIja4FvxkCfKQHSfQsyO-XKZnYw&usqp=CAU" alt="" />
            <span>Harikrishnan</span>
           
        </Card.Title>
        <Card.Text>
            <div className='d-flex justify-content-center'>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star  text-warning "></i>
            <i class="fa-regular fa-star "></i>

            </div>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur velit, eligendi, quaerat possimus illum mollitia praesentium esse iste ex laudantium repellat nesciunt!</p>
        </Card.Text>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      
     
      <Card.Body>
        <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
        <img width={'60px'} height={'60px'} className='rounded-circle img-fliud'src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5trwv_3CRmS2nNaYeHWLvURq_EJ-jXqUIt-vIYFWe8L51gQz_0kYsOtel0k_3PCUS6eU&usqp=CAU" alt="" />
            <span>Sidharth</span>
        </Card.Title>
        <Card.Text>
            <div className='d-flex justify-content-center'>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star text-warning"></i>
            <i class="fa-solid fa-star "></i>
            <i class="fa-regular fa-star"></i>

            </div>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur velit, eligendi, quaerat possimus illum mollitia praesentium esse iste ex laudantium repellat nesciunt!</p>
        </Card.Text>
      </Card.Body>
    </Card>
        </div>
        </div>
        <ToastContainer position='top-center' theme='colored' autoClose={3000}/>

    </>
  )
}

export default Home