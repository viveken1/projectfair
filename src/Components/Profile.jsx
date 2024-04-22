import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap';
import icons from '../assets/icons.png'
import { SERVER_URL } from '../services/serverUrl';
import { toast } from 'react-toastify';
import { updateUserAPI } from '../services/allAPI';



function Profile() {
  const [preview,setPreview] = useState("")
  const [existingImg,setExistingImg] = useState("")
  const [userDetails,setUserDetails] = useState({
    username:"",email:"",password:"",github:"",linkedin:"",profileimage:""
  })
  const [open, setOpen] = useState(false);

    useEffect(()=>{
      if(sessionStorage.getItem("existinguser")){
        const existingUserDetails = JSON.parse(sessionStorage.getItem("existinguser"))
        setUserDetails({
          ...userDetails,username:existingUserDetails.username,email:existingUserDetails.email,password:existingUserDetails.password,github:existingUserDetails.github,linkedin:existingUserDetails.linkedin
        })
        setExistingImg(existingUserDetails.profile)
      }
    },[open])

    useEffect(()=>{
      if(userDetails.profileimage){
        setPreview(URL.createObjectURL(userDetails.profileimage))
      }else{
        setPreview("")
      }
    },[userDetails.profileimage])

    const handleUserProfile = async()=>{
      const {username,email,password,github,linkedin,profileimage} = userDetails
      if(!github || !linkedin){
        toast.warning("Please Fill the Form Completely")
      }else{
        const reqBody = new FormData()
        reqBody.append("username",username)
        reqBody.append("email",email)
        reqBody.append("password",password)
        reqBody.append("github",github)
        reqBody.append("linkedin",linkedin)
        preview?reqBody.append("profileimage",profileimage):reqBody.append("profileimage",existingImg)
        const token = sessionStorage.getItem("token")
        if(token){
          const reqHeader ={
            "Content-Type" : preview?"multipart/form-data":"application/json",
            "Authorization" : `Bearer ${token}`
          }
          //api call
          try{
            const result = await updateUserAPI(reqBody,reqHeader)
            if(result.status==200){
              setOpen(!open)
              sessionStorage.setItem("existinguser",JSON.stringify(result.data))
            }else{
              console.log(result);
            }
          }catch(err){
            console.log(err);
          }
        }
      }
    }


  return (
    <>
    <div className='d-flex justify-content-between'>
      <h3 className='text-warning'>User Profile</h3>
      <button  onClick={() => setOpen(!open)} className='btn'><i style={{marginLeft:"-600px"}} className="fa-solid fa-arrow-down"></i></button>
    </div>
    <Collapse in={open}>
        <div className='row justify-content-center  align-items-centershadow rounded p-3' id='example-collapse-text' >
         <label className='text-center'>
          <input onChange={e=>setUserDetails({...userDetails,profileimage:e.target.files[0]})} type="file" style={{display:"none",marginBottom:"20px"}} />
{
            existingImg == ""?
            <img width={'200px'}height={'200px'} className='rounded circle' src={preview?preview:icons} alt="" />
            :
            <img width={'200px'}height={'200px'} className='rounded circle' src={preview?preview:`${SERVER_URL}/uploads/${existingImg}`} alt="" />
}

         </label>
         <div className='mb-2'>
        <input value={userDetails.github} onChange={e=>setUserDetails({...userDetails,github:e.target.value})} type="text" className='form-control' placeholder='GIT HUB url' />
         </div>
         <div className='mb-2'>
        <input  value={userDetails.linkedin} onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})} type="text" className='form-control' placeholder='LinkedIn url' />
         </div>
         <div className='d-grid'>
        <button onClick={handleUserProfile} className='btn btn-warning'>Update Profile</button>
         </div>
        </div>
      </Collapse>
    </>
  )
}

export default Profile