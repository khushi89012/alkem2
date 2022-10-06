import {useNavigate ,Navigate} from 'react-router';


export const PrivateRoute = ({ children, isauth })=>{

    console.log(isauth);
    return isauth ? children : <Navigate to='/' />
}