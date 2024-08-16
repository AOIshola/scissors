import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './pages/About'
import Pricing from './pages/Pricing'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MyUrls from './pages/MyUrls'
import PrivateRoutes from './components/PrivateRoutes'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='about' element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/my-urls" element={<MyUrls />} />
        </Route>
      </Routes>
      <Footer />
      {/* <div>
        <input type="text" name="name" className='border border-black' onChange={(e) => changeName(e.target.value)} />
        <h1 style={{width: '400px', height: '100px'}}>{name}</h1>
      </div> */}
    </>
  )
}

export default App
