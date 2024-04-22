import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { getAllProjectsAPI } from '../services/allAPI'


function Projects() {

  const [serachKey,setSearchKey] = useState("")

  const [allProjects,setAllProjects] = useState([])

  console.log(allProjects);

  useEffect(()=>{
    getAllProjects()
  },[serachKey])

  const getAllProjects = async ()=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization" : `Bearer ${token}`
    }
    try{
      const result = await getAllProjectsAPI(serachKey,reqHeader)
      console.log(result);
      if(result.status==200){
        setAllProjects(result.data)
      }
    }catch(err){
      console.log(err);
}
}
  return (
    <>
    <Header/>
    <div style={{marginTop:"150px"}} className='container-fluid'>
      <div className='d-flex justify-content-between'>
        <h3>All Projects</h3>
        <input onChange={e=>setSearchKey(e.target.value)} className='form-control w-25' type="text" placeholder='search project by language used' />
      </div>
      <Row className='mt-3 p-5'>
     {
          allProjects?.length>0?
          allProjects?.map(project=>(
          <Col key={project} className='mb-3' sm={12} md={6} lg={4}>
            <ProjectCard displayData={project}/>
          </Col>
          ))
          :
          <div className='fw-bolder text-danger m-5 text-center'>Project Not Found !!!</div>
     }
      </Row>
     
    </div>
    
    
    </>
  )
}

export default Projects