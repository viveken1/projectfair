import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import { Button, Modal } from 'react-bootstrap';
import project from '../assets/project.png'
import { SERVER_URL } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectAPI } from '../services/allAPI';
import { editResponseContext } from '../contexts/ContextAPI';



function Edit({project}) {
  const {editResponse,setEditResponse} = useContext(editResponseContext)
  // console.log(project);

  const [projectData,setProjectData] = useState({
   id:project?._id,title:project?.title,language:project?.language,overview:project?.overview,github:project?.github,website:project?.website,projectimage:""
  })
const [preview,setPreview] = useState("")

  const [show, setShow] = useState(false);

  useEffect(()=>{
    if(projectData.projectimage){
      setPreview(URL.createObjectURL(projectData.projectimage))
    }else{
      setPreview("")
    }
  },[projectData.projectimage])

  const handleClose = () =>{
  setShow(false);
  setProjectData({id:project?._id,title:project?.title,language:project?.language,overview:project?.overview,github:project?.github,website:project?.website,projectimage:""})
  setPreview("")
}

  const handleShow = () =>{
   setShow(true);
   setProjectData({id:project?._id,title:project?.title,language:project?.language,overview:project?.overview,github:project?.github,website:project?.website,projectimage:""})
  }

  const handleUpdateProject = async() =>{
    const {title,language,overview,github,website,projectimage} = projectData
    if(!title || !language || !overview || !github || !website){
      toast.warning("please fill the form completely!!")
    }else{
      //proceed api call
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      preview?reqBody.append("projectimage",projectimage):reqBody.append("projectimage",project.projectimage)

      const token = sessionStorage.getItem("token")
      if(token){
          const reqHeader ={
            "Content-Type" : preview?"multipart/form-data":"application/json",
            "Authorization" : `Bearer ${token}`
          }
          //api call
          try {
            const result = await editProjectAPI(projectData.id,reqBody,reqHeader)
            console.log(result);
            if(result.status==200){
              handleClose()
              //passresponse view
              setEditResponse(result)
            }else{
              console.log(result.response);
            }
          } catch (err) {
            console.log(err);
          }
    }
  }
}
  return (
    <>
      <button onClick={handleShow} className='btn'><i class="fa-solid fa-edit ms-1"></i></button>
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
        <div className='col-lg-4 w-50 '>
          <label>
            <input onChange={e=>setProjectData({...projectData,projectimage:e.target.files[0]})} type="file" style={{display:"none"}} />
            <img height={'200px'} className='img-fluid' src={preview?preview:`${SERVER_URL}/uploads/${project?.projectimage}`} alt="project?.title" />
          </label>
        <div className='col-lg-8' style={{width:"600px",height:"25vh"}}>
          <div className='mb-2'>
          <input value={projectData.title} onChange={e=>setProjectData({...projectData,title:e.target.value})} type="text" className='form-control' placeholder='Project Title' />
          </div>

          <div className='mb-2'>
          <input value={projectData.language} onChange={e=>setProjectData({...projectData,language:e.target.value})} type="text" className='form-control' placeholder='Languages used in the Project' />
          </div>

          <div className='mb-2'>
          <input value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})} type="text" className='form-control' placeholder='Project GIT HUB link' />
          </div>

          <div className='mb-2'>
          <input value={projectData.website} onChange={e=>setProjectData({...projectData,website:e.target.value})} type="text" className='form-control' placeholder='Project Website Link' />
          </div>
          </div>
        </div>
        <div className='mb-2'>
          <input value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})} type="text" className='form-control' placeholder='Project Overview' />
          </div>
         </div>
       
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdateProject} variant="success">Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>

    </>
  )
}

export default Edit