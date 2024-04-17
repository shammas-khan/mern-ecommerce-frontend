import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

  const [state,setState]=useState("Login");
  const [formData,setFormData]=useState({
    username:"",
    email:"",
    password:""
  });

  const changeHandler=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login=async()=>{
    if (!formData.email || !formData.password) {
      alert("Please fill in all the fields");
      return;
    }
    let responseData=await fetch(`https://mern-ecommerce-2-t80r.onrender.com/login`,{
      method:"POST",
      headers:{
        Accept:'application/form-data',
        'Content-type':'application/json',
      },
      body:JSON.stringify(formData)
    })
    responseData=await responseData.json();

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }    else{
      alert(responseData.errors)
    }
  }

  const signup=async()=>{
    if (!formData.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
      alert("Please enter a valid email address");
      return;
    }
  
    if (!formData.email || !formData.password || !formData.username) {
      alert("Please fill in all the fields");
      return;
    }
    let responseData=await fetch(`https://mern-ecommerce-2-t80r.onrender.com/signup`,{
      method:"POST",
      headers:{
        Accept:'application/form-data',
        'Content-type':'application/json',
      },
      body:JSON.stringify(formData)
    })
    responseData=await responseData.json();

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==='Sign Up'?<input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name'/>:<></>}
          <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address'  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
          <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>

        {state==='Sign Up'?<p className='loginsignup-login'>Already have an account? <span  onClick={()=>{setState("Login")}}>Login here</span></p>
                          :<p className='loginsignup-login'>Create an account? <span onClick={()=>{setState("Sign Up")}}>Sign Up here</span></p>
        }

        <div className="loginsignup-agree">
          <input type="checkbox" name='' id=''/>
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
