import React, { createContext, useContext, useEffect, useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from "axios"
import { toast } from 'react-toastify'

const LoginPopup = ({setShowLogin}) => {
    const [ currState, setCurrState ] = useState("Login")
    const [ data, setData ] = useState({
        name:"",
        email:"",
        password:""
    })
    const {url, setToken} = useContext(StoreContext)

    const onChangeHandler = (event) =>{
        const name = event.target.name;  
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))  
    }

    const onLogin = async(e) =>{
        e.preventDefault();
        let newUrl = url;
        if(currState==="Login"){
            newUrl += "/api/user/login"
        }else{
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data)
        console.log(response)
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token)
            setShowLogin(false)
            toast.success(response.data.msg)
        }else{
            toast.error("Login Failed")
        }
    }

  return (
    <div className='login-popup'>
        <form action="" onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Login" ? <></> : <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your name' required /> }
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Your email' required />
                <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='password' required />
            </div>
            <button type='submit'>{currState==="Sign Up" ? "Create Account" : "Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, i agree to the term of use & privacy policy.</p>
            </div>
            {currState==="Login" ? <p onClick={()=>setCurrState("Sign Up")}>Create a new account? <span>Click here</span></p> : <p onClick={()=>setCurrState("Login")}>Already have an account? <span>Login here</span></p>}
        </form>
    </div>
  )
}

export default LoginPopup