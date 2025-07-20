import React, { useState } from 'react'
import axios from 'axios';

function InputForm({setIsOpen}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp,setIsSignUp] = useState(false);
    const [error,setError] = useState("");

    const handleOnSubmit = async(e) => {
        e.preventDefault();
        let endpoint = (isSignUp)? "signUp" : "login";
        await axios.post(`http://localhost:5001/${endpoint}`, {email, password})
        .then((res)=> {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("user", JSON.stringify(res.data.user))
            setIsOpen(false);
        })
        .catch(data=> setError(data?.response?.data?.error || "Something went wrong!"));
    }
  return (
    <>
        <form className='form' onSubmit={handleOnSubmit}>
            <div className='form-control'>
                <label>Email</label>
                <input type='email' className='input' onChange={(e)=>setEmail(e.target.value)} required placeholder='Enter your email' />
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input type='password' className='input' onChange={(e)=>setPassword(e.target.value)} required placeholder='Enter your password' />
            </div>
            <button type='submit' >{isSignUp ? "Sign Up" : "Login"}</button>
            <br></br>
            {error && <p className='error'>{error}</p>}
            <p onClick={()=>setIsSignUp((prev)=> !prev)}>{(isSignUp)? "Already have an account? Login here" : "Don't have an account? Sign Up here"}</p>
        </form>
    </>
  )
}

export default InputForm