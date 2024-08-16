import { Link, useNavigate } from 'react-router-dom'
// import ThemeBtn from './ThemeBtn'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import ButtonWithSpinner from './ButtonWithSpinner'

function Header() {
    const [isFixed, setIsFixed] = useState(true)
    const { user, logoutUser } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY
            if (currentScroll > 300) {
                setIsFixed(false)
            } else {
                setIsFixed(true)
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleLogout = (): void => {
        // e.preventDefault();
        // console.log('logging out')
        setIsLoading(true);
    
        setTimeout(() => {
            logoutUser();
            navigate('/login');
        }, 2000);
    };    

    return (
        <motion.header
            initial={{ opacity: 0, x: '1000px' }}
            animate={{ opacity: 1, x: '0px' }}
            className={`${isFixed ? 'sticky' : ''} top-0 mb-4 bg-white z-10 border-b-2 border-blue-500 px-2 w-full flex flex-row justify-between items-center h-16`}>
            <div className='float-left font-extrabold text-2xl'>
                <Link to={'/'}>SciXXors</Link>
            </div>
            <div className='text-lg'>
                <Link to={'/'} className='m-2 hover:border-b-2 hover:border-blue-400'>What we Offer</Link>
                <Link to={'pricing'} className='m-2 hover:border-b-2 hover:border-blue-400'>Pricing</Link>
                <Link to={'about'} className='m-2 hover:border-b-2 hover:border-blue-400'>About us</Link>
            </div>
            {
                user ? 
                <div className='flex flex-row justify-around items-center gap-4'>
                    <Link to={'my-urls'} className='hover:border-b-2 hover:border-blue-400'>My Urls</Link>
                    <ButtonWithSpinner onClick={handleLogout} loading={isLoading}>LogOut</ButtonWithSpinner>
                    {/* <button type="submit" onClick={handleLogout}>Logout</button> */}
                    {/* <Link to="/login" className="text-blue-400 hover:underline">Logout</Link> */}
                </div>
                :
                <div className=''>
                    <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
                    <Link to="/register" onClick={() => {handleLogout}} className="ml-4 text-blue-400 hover:underline">Register</Link>
                    {/* <ThemeBtn /> */}
                </div>

            }
        </motion.header>
    )
}

export default Header