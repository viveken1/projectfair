import React, { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { SERVER_URL } from '../services/serverUrl';



function ProjectCard({displayData}) {
    const [show,setShow] = useState(false);


    const handleClose = ()=> setShow(false);
    const handleShow = ()=>setShow(true);
  return (
    <>
      <Card onClick={handleShow} className='shadow btn'style={{ width: '18rem' }}>
      <Card.Img height={'200px'} variant="top" src={`${SERVER_URL}/uploads/${displayData?.projectimage}`} />
      <Card.Body>
        <Card.Title>{displayData.title}</Card.Title>
      </Card.Body>
    </Card>

    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-lg-6'>
              <img className='img-fluid' src={`${SERVER_URL}/uploads/${displayData?.projectimage}`} alt={displayData?.title} />
            </div>
            <div className='col-lg-6 mt-5'>
              <h3 style={{fontSize:"50px"}}>{displayData?.title}</h3>
              <h6 style={{fontSize:"20px"}}><span className='fw-bolder'>Languages Used</span> :{displayData?.language}</h6>
              <p style={{textAlign:'justify'}}> <span className='fw-bolder'>Overview : </span>{displayData?.overview}</p>
            </div>
          </div>
          <div className='float-start mt-2'>
            <a href={displayData?.github} target='blank' className='btn btn-info'  ><i class="fa-brands fa-square-github"></i></a>
            <a href={displayData?.website} target='blank' className='btn btn-info ms-2' ><i class="fa-solid fa-link"></i></a>

          </div>

        </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>
    
    </>
  )
}

export default ProjectCard