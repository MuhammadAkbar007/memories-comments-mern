import { useState, useEffect } from 'react'
import { signin, signup } from '../../actions/authActions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'
import { AiFillUnlock } from 'react-icons/ai'
import { BiShow } from 'react-icons/bi'
import { BiHide } from 'react-icons/bi'
import Icon from './icon'

const Auth = () => {
  
  const googleClientId = '97967031855-ll34js38mvf6uunt2dd3i8s8khc7a7jh.apps.googleusercontent.com'
  const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(initialState)

  useEffect(() => {
    gapi.load('client: auth2', () => {
      gapi.auth2.init({ clientId: googleClientId })
    })
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    if(isSignUp) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }
  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const switchMode = () => {
    setIsSignUp(p => !p)
    setShowPassword(false)
  }

  const googleSuccess = async res => {
    const result = await res?.profileObj
    const token = await res?.tokenId
    try {
      dispatch({ type: 'AUTH', data: { result, token } })
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  const googleFailure = err => {
    console.log(err)
  }

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <div className='bg-white p-5 text-center rounded shadow text-primary'>
          <div>
            <AiFillUnlock className='lock-icon' />
          </div>
          <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
          
          <form onSubmit={handleSubmit} className='mt-4 position-relative'>
            <input type="email" name='email' className='form-control' placeholder='Email Address' onChange={(e) => handleChange(e)} />
            {showPassword ? <BiShow className='position-absolute show-icon' onClick={() => setShowPassword(p => !p)} />
                          : <BiHide className='position-absolute show-icon' onClick={() => setShowPassword(p => !p)} />}
            <input type={showPassword ? 'text' : 'password'} name='password' className='form-control my-3' placeholder='Password'
                    onChange={(e) => handleChange(e)} />
            {isSignUp && <input name='confirmPassword' placeholder='Repeat Password' type={showPassword ? 'text' : 'password'}
                                className='form-control' onChange={(e) => handleChange(e)} />}
            {isSignUp && <div className='row mt-3'>
              <div className="col-md-5 col-sm-12">
                <input type="text" name='firstName' className='form-control' placeholder='First Name' onChange={(e) => handleChange(e)} />
              </div>
              <div className="col-md-5 offset-md-2 col-sm-12">
                <input type="text" name='lastName' className='form-control' placeholder='Last Name' onChange={(e) => handleChange(e)} />
              </div>
            </div>
            }
            <div className="row px-2 my-3">
              <button className='btn btn-primary' type='submit'>{isSignUp ? 'Sign Up' : 'Sign In'}</button>
            </div>
            <div>
              <GoogleLogin
                clientId={googleClientId}
                buttonText="Login"
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                  <button className='btn btn-warning w-100' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <Icon />
                    <b>&nbsp; Google Sign In</b>
                  </button>
                )}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-outline-warning text-primary border-white" type='button' onClick={switchMode}>
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account ? Sign Up"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Auth