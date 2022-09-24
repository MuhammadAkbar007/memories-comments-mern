import memories from '../../images/memories.png'

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    
    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        setUser(null)
        navigate('/')
    }
    
    useEffect(() => {
        const token = user?.token

        if (token) {
            const decodedToken = jwt_decode(token)
            
            if (decodedToken.exp * 1000 < new Date().getTime()) logout()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    
    return (
        <div className="my-2 shadow bg-white rounded text-info d-md-flex space-between pt-1 px-3">
            <div className='d-flex'>
                <Link to={'/posts'} className='text-decoration-none'><h1><b>Memories</b></h1></Link>
                <img src={memories} alt="memories" className='img-responsive mx-auto img-memories' />
            </div>
            {
                user ? (
                    <div className='d-flex align-items-center justify-content-between'>
                        <img src={user?.result.imageUrl} alt={`${user?.result.name.charAt(0)}${user?.result.email.charAt(0).toUpperCase()}`}
                            className={user?.result?.googleId ? "rounded-circle img-fluid" : 'rounded-circle img-fluid bg-warning p-3'} style={{ height: '50px' }} />
                        <h4 className='text-primary mx-5'><i>{user?.result.name}</i></h4>
                        <button className='btn btn-danger btn-sm' onClick={logout}>LOG OUT</button>
                    </div>
                ) : (
                    <button className='btn btn-primary text-white my-2 shadow'>
                        <Link to={'/auth'} className='text-decoration-none text-white'>SIGN IN</Link>
                    </button>
                )
            }
        </div>
    )
}

export default Navbar