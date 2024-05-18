import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import Loading from "./Loading";
import React from 'react'
import Flash from '../components/Flash'


function Form({ route, method }) {
    const [flashMessage, setFlashMessage] = useState("")
    const [flashColor, setFlashColor] = useState("")

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const name = method === 'login' ? 'Login' : 'Register'

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const res = await api.post(route, { username, password })
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate('/')
            } else {
                navigate('/login')
            }
        } catch (error) {
            if (method === 'login'){
            setFlashMessage('Username or password is incorrect!')
            setFlashColor('purple')
            }else{
                setFlashMessage('This username already exists. Please try another username.')
                setFlashColor('purple')
            }
        } 

    }

    return (
        <form onSubmit={handleSubmit} className="border-2 w-96 sm:w-2/3 md:w-3/5 lg:w-2/5 px-10 py-8 flex flex-col justify-start items-center gap-4 rounded-xl shadow-md mt-20">
            <h1 className="text-2xl mb-2">{name}</h1>
            {flashMessage && <Flash message={flashMessage} color={flashColor} />}
            <input
                className='inputform mt-2'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className='inputform'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {loading && <Loading />}
            <button
                className='btn '
                type="submit">{name}
            </button>
        </form>
    )
}

export default Form