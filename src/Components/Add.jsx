import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import {img} from '../assets/upload.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allAPI';
import { addResponseContext } from '../contexts/ContextAPI';


function Add() {

  const {addResponse,setAddResponse} = useContext(addResponseContext)

  const [preview,setPreview] = useState("")

  const [imageFileStatus,setImageFileStatus] = useState(false)

    const [projectDetails,setProjectDetails] = useState({
      title:"",language:"",overview:"",github:"",website:"",projectimage:""
    })
  

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectDetails({
      title:"",language:"",overview:"",github:"",website:"",projectimage:""
    })
  }
 
  const handleShow = () => setShow(true);
  console.log(projectDetails);


    
  useEffect(()=>{
    if(projectDetails.projectimage.type=="image/png" || projectDetails.projectimage.type=="image/jpg" || projectDetails.projectimage.type=="image/jpeg"){
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectimage))
    }else{
      setPreview("https://w7.pngwing.com/pngs/152/917/png-transparent-upload-photo-picture-image-user-interface-icon.png")
      setImageFileStatus(false)
      setProjectDetails({...projectDetails,projectimage:""})
    }
  },[projectDetails.projectimage])

  const handleUploadProject = async()=>{
      const {title,language,overview,github,website,projectimage} = projectDetails
      if(!title || !language || !overview ||  !github || !website || !projectimage){
          toast.warning("please fill the form completely")
      }else{
        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("language",language)
        reqBody.append("overview",overview)
        reqBody.append("github",github)
        reqBody.append("website",website)
        reqBody.append("projectimage",projectimage)

        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader ={
              "Content-Type" : "multipart/form-data",
              "Authorization" : `Bearer ${token}`
            }
              // api call
          try {
            const result = await addProjectAPI(reqBody,reqHeader)
            console.log(result);
            if(result.status==200){

          setAddResponse(result)           
           handleClose()
            }else{
              toast.warning(result.response.data)
            }
          } catch (err) {
            console.log(err);
          }   
        }
      }
  }

  return (
    <>
    <button onClick={handleShow} className='btn'>Add New<i class="fa-solid fa-circle-plus ms-1"></i></button>
    <Modal size='lg' centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className='row'>
        <div className='col-lg-4'>
          <label>
            <input type="file" style={{display:"none"}} onChange={e=>setProjectDetails({...projectDetails,projectimage:e.target.files[0]})} />
            <img height={'200px'} className='img-fluid' src={preview} alt="" />
          </label>
        { !imageFileStatus && <div className="text-danger fw-bolder my-2">* upload only following type files (png.jpg,jpeg) here!!!</div>}
          </div>

        <div className='col-lg-8 '>
          <div className='mb-2'>
          <input type="text" className='form-control' placeholder='Project Title' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} />
          </div>

          <div className='mb-2'>
          <input type="text" className='form-control' placeholder='Languages used in the Project'  value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} />
          </div>

          <div className='mb-2'>
          <input type="text" className='form-control' placeholder='Project GIT HUB link' value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} />
          </div>

          <div className='mb-2'>
          <input type="text" className='form-control' placeholder='Project Website Link' value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} />
          </div>
        </div>
        <div className='mb-2'>
          <input type="text" className='form-control' placeholder='Project Overview' value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} />
          </div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUploadProject} variant="success">upload</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>

    </>
  )
}

export default Add