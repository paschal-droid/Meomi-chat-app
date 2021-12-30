import React, {useState} from 'react'
import axios from "axios"
import Cookies from "universal-cookie"
import * as BiIcons from "react-icons/bi"

import signupImg from "../assets/tile_background.png"

const initialState = {
    fullName: '',
    userName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    avatarURL: '',
}

const cookies = new Cookies()

const Auth = () => {

    const [isSignup, setIsSignup] = useState(true)
    const [form, setForm] = useState(initialState)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e)=> {
        e.preventDefault()
        const { userName, password, avatarURL, phoneNumber} = form
        const url = "http://localhost:5000/auth"

        const {data: {token, userId, hashedPassword, fullName}} = await axios.post(`${url}/${isSignup ? "signup": "login"}`, {
            userName, password, fullName: form.fullName, phoneNumber, avatarURL
        });

        cookies.set("token", token)
        cookies.set("username", userName)
        cookies.set("fullName", fullName)
        cookies.set("userId", userId)

        if(isSignup) {
            cookies.set("phone No.", phoneNumber)
            cookies.set("profile URl", avatarURL)
            cookies.set("hashedPassword", hashedPassword)
        }

        window.location.reload()
    }


    const switchMode = () => {
        setIsSignup((previsSignup) => !previsSignup)
    }

    return (
        <div className='auth__form-container'>
            <div className='auth__form-container_fields'>
                <div className='auth__form-container_fields-content'>
                    <p>{isSignup ? "Sign Up" : "Sign In"}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='fullName'>Full Name</label>
                                <div style={{position: "relative"}}><input 
                                    name='fullName'
                                    type='text'
                                    placeholder="Full Name"
                                    onChange={handleChange}

                                />
                                <span><BiIcons.BiUser style={{marginLeft: "-30px", marginTop: "10px", textAlign:"center", position: "absolute"}}/></span>
                                </div>
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_input'>
                            
                                <label htmlFor='userName'>Username</label>
                                <div style={{position: "relative"}}><input 
                                    name='userName'
                                    type='text'
                                    placeholder="Username"
                                    onChange={handleChange}
                                    required

                                />                            
                            <span><BiIcons.BiUserX style={{marginLeft: "-30px", marginTop: "10px", position: "absolute"}}/></span>
                            </div>
                        </div>
                        
                            {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='phoneNumber'>Phone Number</label>
                                <div style={{position: "relative"}}>
                                    <input 
                                        name='phoneNumber'
                                        type='text'
                                        placeholder="Phone Number"
                                        onChange={handleChange}
                                        required

                                    />
                                    <span><BiIcons.BiBookBookmark style={{marginLeft: "-30px", marginTop: "10px", position: "absolute"}} /></span>
                                </div>
                            </div>
                        )}
                        
                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='avatarURL'>Profile URL</label>
                                <div style={{position: "relative"}}>
                                    <input 
                                        name='avatarURL'
                                        type='text'
                                        placeholder="Profile URL"
                                        onChange={handleChange}
                                        required

                                    />
                                    <span><BiIcons.BiImageAdd style={{marginLeft: "-30px", marginTop: "10px", position: "absolute"}} /></span>
                                </div>
                            </div>
                        )}

                        <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='password'>Password</label>
                                <div style={{position: "relative"}}>
                                    <input 
                                        name='password'
                                        type='password'
                                        placeholder="password here"
                                        onChange={handleChange}
                                        required

                                    />
                                    <span><BiIcons.BiLockAlt style={{marginLeft: "-30px", marginTop: "10px", position: "absolute"}} /></span>
                                </div>
                            </div>

                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='confirmPassword'>Confirm Password</label>
                                <div style={{position: "relative"}}>
                                    <input 
                                        name='confirmPassword'
                                        type='password'
                                        placeholder="Re-enter password"
                                        onChange={handleChange}
                                        required

                                    />
                                    <span><BiIcons.BiLockAlt style={{marginLeft: "-30px", marginTop: "10px", position: "absolute"}} /></span>
                                </div>
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Sign up now": "Login"}</button>
                        </div>
                    </form>
                    <div className='auth__form-container_fields-account'>
                        <p>
                            {isSignup ? "Already have an Account?": "Haven't registered yet?"}
                            <span onClick={switchMode}>
                                {isSignup ? 'sign In' : 'Sign up'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className='auth__form-container_image'>
                <img src={signupImg} alt='signup-img' />
            </div>
        </div>
    )
}

export default Auth
