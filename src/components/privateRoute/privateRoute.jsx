import {useNavigate} from 'react-router';


export const PrivateRoute = ({ children, isauth })=>{
const Navigate = useNavigate()
    console.log(isauth);
    return isauth ? children : <Navigate to='/' />
}