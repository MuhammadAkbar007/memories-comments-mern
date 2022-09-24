import './App.css'

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'

function App() {

  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <BrowserRouter>
      <div className="container mb-3">
          <Navbar />
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/posts' exact element={<Home />} />
            <Route path='/posts/search' exact element={<Home />} />
            <Route path='/posts/:id' exact element={<PostDetails />} />
            <Route path='/auth' exact element={!user ? <Auth /> : <Navigate to="/posts/" />} />
          </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App