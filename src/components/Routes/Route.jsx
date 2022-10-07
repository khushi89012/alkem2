import { useState,useEffect } from 'react'
import Login from '../Login/Login.jsx'
import { Routes, Route } from 'react-router';
import { Landing } from '../Landing/Landing.jsx'
import { PrivateRoute } from '../privateRoute/privateRoute'
import {Token} from '../Redux/action'
import {useSelector,useDispatch } from  "react-redux";


export const Routedata = () => {

    const [isauth, setisAuth] = useState(false)
   const token = JSON.parse(localStorage.getItem("persist:root"))
   const newToken = JSON.parse(token.partData)

   useEffect(()=>{
    if(newToken){
        setisAuth(true)
    }
   },[])


    return (
        <div>

            <Routes>
                <Route path='/' element={<Login />}></Route>
             <Route path='/landing' element={<Landing />} ></Route>
             

               
            </Routes>



        </div>
    );
}
