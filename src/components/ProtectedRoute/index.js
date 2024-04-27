import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
    const token = Cookies.get("jwtToken")
    if (token!==undefined){
        return <Route {...props}/>
    }
    return <Redirect to='/login'/>
}

export default ProtectedRoute
