import { useState,useEffect } from 'react'
import Login from '../Login/Login.jsx'
import { Routes, Route } from 'react-router';
import { Landing } from '../Landing/Landing.jsx'
import { PrivateRoute } from '../privateRoute/privateRoute'


export const Routedata = () => {

    const [isauth, setisAuth] = useState(false)

    let token = JSON.parse(localStorage.getItem("persist:root"))
    useEffect(()=>{
        if (token) {
            setisAuth(true)
            console.log(isauth,"auth")
        }
    },[])
    



    return (
        <div>

            <Routes>
                <Route path='/' element={<Login />}></Route>
                <Route path='/landing' element={<PrivateRoute isauth={isauth}> <Landing /> </PrivateRoute>} ></Route>
            </Routes>



        </div>
    );
}
