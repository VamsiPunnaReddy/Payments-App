import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuth(true)
    }
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const HandleSignout = () => {
    localStorage.removeItem('token')
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 shadow-md bg-white z-50">
        <div className="py-4 px-4 sm:px-8 lg:px-12">
          <div className='flex justify-between'>
            <div className='flex items-center'>
              <Link to='/' className="text-2xl font-bold py-1"> Payments App </Link>
            </div>
            <div className="flex md:hidden items-center">
              {menuOpen ? (
                <XMarkIcon className="block h-8 w-8 text-blue-500" aria-hidden="true" onClick={toggleMenu} />
              ) : (
                <Bars3Icon className="block h-8 w-8 text-blue-500" aria-hidden="true" onClick={toggleMenu} />
              )}
            </div>
            <div className={` md:relative md:flex md:flex-row md:justify-end md:gap-7 md:items-center md:pb-0 md:pr-0  text-black text-lg font-semibold   ${menuOpen ? 'flex flex-col bg-white shadow-md items-end gap-4 absolute top-[100%] left-0 w-full pb-4 pr-4 sm:pr-8' : 'hidden'}`}>

              {isAuth ? (
                <>
                  <Link to='/signin' onClick={HandleSignout} className='hover:text-blue-600 transition-colors'>Signout</Link>
                  <Link to='/profile' className='hover:text-blue-600 transition-colors'>profile</Link>
                </>
              ) : (
                <>
                  <Link to='/signin' className='hover:text-blue-600 transition-colors'>Signin</Link>
                  <Link to='/signup' className='hover:text-blue-600 transition-colors'>Signup</Link>
                </>
              )}










            </div>
          </div>
        </div>
      </nav >
      <div className='pt-[4.55rem]'></div>
      <Outlet />
    </>
  )
}