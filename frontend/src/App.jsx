
import React from "react"
import { BrowserRouter, Router, Route,  Navigate, Routes } from "react-router-dom"

import Login from "./pages/login"
import notFound from "./pages/notFound"
import Register from "./pages/register"
import Home from "./pages/home"
import ProtectedRoute from "./components/protectedRoute"

function Logout(){
    localStorage.clear()
    return <Navigate to="/login"></Navigate>
}

function RegisterAndLogout(){
    localStorage.clear()
    return <Register/>

}

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path = "/" 
          element = {
            
            <ProtectedRoute>
              <Home>

              </Home>
            </ProtectedRoute>
          }>
          </Route>
        
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/*" element={<notFound />}></Route>
          <Route path="/logout" element={<Logout />}></Route>

        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
