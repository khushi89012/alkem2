import { useState,useEffect } from 'react'
import Login from '../Login/Login.jsx'
import { Routes, Route } from 'react-router';
import { Landing } from '../Landing/Landing.jsx'
import { PrivateRoute } from '../privateRoute/privateRoute'
import Cart from '../Landing/Cart'
import {useSelector} from 'react-redux'
import {Token} from '../Redux/action'

export const Routedata = () => {

    const [isauth, setisAuth] = useState(false)
    const newtoken = useSelector((state)=>state.partData.token)
console.log(newtoken)
 
    useEffect(()=>{
        if (newtoken) {
            setisAuth(true)
            console.log(isauth,"auth")
        }else{
            setisAuth(false)
        }
    },[isauth,newtoken])
    
    return (
        <div>

            <Routes>
                <Route path='/' element={<Login />}></Route>
                <Route path="/landing" element= {<PrivateRoute isauth={isauth}> <Landing/> </PrivateRoute>}></Route>
                <Route path='/cart' element = {<Cart/>}/>
            </Routes>
        </div>
    );
}
