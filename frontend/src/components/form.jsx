import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/form.css"
import Load from "./load";

function Form({route, method}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const name = method === "login" ? "login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            console.log(api)
            console.log("route: " , route)
            console.log(username, password)
            const res = await api.post(route, { username, password })
          
            
            console.log(res)

            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    return <form onSubmit={handleSubmit} className="form-container">
        <h1> { name } </h1>

        <input className="form-input" 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value = {username} 
        placeholder="username"/>
        
        <input className="form-input" 
        type="text" 
        onChange={(e) => setPassword(e.target.value)} 
        value = {password} 
        placeholder="password"/>


        {loading && <Load/>}
        <button className="form-button" type="submit">
            {name}
        </button>

    </form>

}

export default Form