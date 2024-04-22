import React, { useEffect, useState } from 'react'
import View from '../Components/View'
import Profile from '../Components/Profile'
import Header from '../Components/Header'

function Dashboard() {

  const [dispalyName,setDisplayName] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("existinguser")){
      const {username} = JSON.parse(sessionStorage.getItem("existinguser"))
      setDisplayName(username)
    }else{
      setDisplayName("")
    }
  },[])
  return (
    <>
    <Header insideDashBoard={true}/>
    <div style={{marginTop:"100px"}} className='container-fluid'>
    <h1>Welcome <span className='text-warning'>{dispalyName}</span></h1>
    <div className='row mt-3'>
    <div className='col-lg-8'>
      <View/>
    </div>
    <div className='col-lg-4'>
      <Profile/>
    </div>
    </div>
    </div>
    </>
  )
}

export default Dashboard