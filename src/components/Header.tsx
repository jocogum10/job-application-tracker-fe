import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import retrieveUser from '../utils/retrieveUser';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import saveJwt from '../utils/saveJwt';
import saveUser from '../utils/saveUser';

// const BASE_URL = 'http://localhost:3000'
const BASE_URL = 'https://job-application-tracker-api.herokuapp.com/'

type userType = {
  id: number
  email?: string
  created_at: string
  updated_at: string
}

function Header() {

  const navigate = useNavigate();
  const [error, setError] = useState([]);
  const [user, setUser] = useState<userType>();
  useEffect(() => {
    setUser(retrieveUser());
  }, []);

  // event handlers
  function handleOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    axios.delete(
      BASE_URL + '/users/sign_out'
    ).then((response) => {
      console.log(response);
      saveUser(null)
      saveJwt(null)
      setUser(retrieveUser())
      console.log('redirecting...')
      setTimeout(() => {
        navigate('/')
      }, 1000);
    }).catch((error) => {
      setError(error);
    });
  }

  const notLoggedIn = <div className='sm:flex sm:gap-4'>
    <NavLink
      className="block rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
      to="/login">
      Login
    </NavLink >
    <NavLink
      className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-indigo-600 transition hover:text-indigo-600/75 sm:block"
      to="/signup">
      Sign Up
    </NavLink >
  </div>

  const loggedIn = <div className='sm:flex sm:gap-4'>
    <div className="block rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-indigo-600">{user ? user.email : ""}</div>
    <button
      className="hidden rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 sm:block"
      onClick={handleOnClick}>
      Log Out
    </button >
  </div>


  return (

    <header className="bg-white drop-shadow-lg">
      <div
        className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
      >



        <NavLink to="/" className='text-indigo-600' end>
          <span className="sr-only">Home</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512" 
            className="h-8"
          >
            <path fill="#127274" d="M214,305.8c-0.7-2-1.5-4-2.4-5.9c-1.9-4.2-4-8.4-6.3-12.4c-2.1-3.6-3.8-5.7-7-8.3c-4.2-3.4-9.8-8.5-15.7-8.1c-0.3,0.7-0.9,1.3-1.7,1.8c-29.4,18.5-59,38.5-83.4,63.5c-7.5,7.7-14.7,16.5-20.2,26.2c9.3-2,19.7-0.7,28.6,1.4c5.8,1.4,11.7,3,16.9,5.8c3.4,1.8,5.5,5,7.5,8.2c2.5,4.2,15.6,27.4,17.3,41c9-7.5,16.8-16.6,23.6-25.9c17.8-24.5,29.9-52.9,39-81.7c0.7-2.1,2.1-3,3.7-3.1c0.1-0.4,0.3-0.8,0.5-1.1C214.2,306.6,214.1,306.3,214,305.8z" />
            <path fill="#74CCCF" d="M431.2,184.2c-1.4-23.9-13-47.9-26.1-67.5c-13.7-20.5-31.4-39.8-53.4-51.5c-44.2-23.5-101.4-9.4-136.8,23.9c-18.9,17.8-32.4,41-31.2,67.6c1.2,25.8,13.1,49.2,28.4,69.5c0.6,0.8,0.9,1.6,1,2.4c8.3,6,16.2,12,25.5,16.7c9.9,5,20.2,9.2,30.7,12.8c21.8,7.7,45.6,15.4,69.1,14.6C382.8,271.2,434.1,232.5,431.2,184.2z" />
            <path fill="#14B6B9" d="M452.9,160.4c-6.5-23.4-17.8-45.5-32.2-65C392.5,57,349.5,23.8,299.4,28.5c-47.8,4.5-96.6,33-123.6,72.9c-14.7,21.7-20,48.1-15.5,73.9c4.6,25.8,17.7,49.3,34.8,68.9c1,1.2,1.3,2.4,1.1,3.5c20.8,15.7,45.6,26.2,70.6,33c13.1,3.6,26.3,6.9,39.6,9.5c13.6,2.6,27.7,4.9,41.6,3.7c40.6-3.3,80.2-29.1,98.5-65.8C457.1,206.7,459.4,183.5,452.9,160.4z M365.3,278.3c-28.1,8.5-56.8,2.8-84.2-5.8c-13.8-4.3-27.6-9.1-40.7-15.2c-6.8-3.2-13.6-6.7-19.9-10.9c-5.5-3.6-10.5-7.9-15.9-11.7c-1.7-1.2-2.1-2.8-1.8-4.3c-17.7-23.8-31.1-52.7-29-82.9c2.2-31.5,21.9-58.1,46.9-76.2c38.9-28.1,94.6-38.9,137.8-13.8c21.4,12.4,39.2,30.6,53.1,51c13.4,19.8,24.7,42.6,28.6,66.5C448,222.4,408.4,265.3,365.3,278.3z" />
            <path fill="#127274" d="M137.8 421.2c0-.1 0-.3-.1-.4-.3-1.4-.6-2.7-1-4.1-1.2-3.9-2.7-7.7-4.2-11.5-3.2-7.7-6.5-15.6-11.1-22.6-2-3.1-2.4-3.9-5.5-5.2-4.4-1.9-9-3.2-13.7-4.1-8.6-1.7-20.9-3.9-28.9 1-.7.4-1.4.7-2 .8-3.8 10.1-5.3 20.9-3.4 32 1.7 9.7 6.3 19.1 14.6 24.8 9.2 6.2 20.7 7.1 31.3 4.7 8.6-2 16.6-5.6 23.9-10.4C137 424.6 137 422.6 137.8 421.2zM471.5 185.5c-1.3-13.1-5.2-25-11.2-35.9 7.3 23.4 8.9 48.1 0 71.7-16.2 43.3-59.2 75.9-104.7 81.9-29.7 3.9-60.6-4.4-89-12.2-26.6-7.3-52.8-18-75.2-34.4-3.3.9-7.4-1.3-6.3-5.5.2-.8.5-1.6.8-2.3-7.6-8.8-14.4-18.3-19.9-28.5-4.7-8.8-8.7-18-11.6-27.5 0 5 0 10 .3 15 1.1 20.3 5.2 41.3 19 56.9.5-1 1.3-1.8 2.7-2.3 10.2-3.5 19.2 1.8 26.9 8.1 5.3 4.3 8.2 7.9 11.5 13.8 2.2 3.9 11.9 19.9 9.2 27.2 25.7 11.4 52.5 16.5 80.5 18.4 29.3 2 59.3 1.9 85.5-13.2 23.8-13.7 45.1-34.1 61.4-56.1C467.7 238.3 474.2 212.8 471.5 185.5z" />
            <path d="M440.2,175c-3.9-23.8-15.1-46.7-28.6-66.5c-13.8-20.4-31.7-38.5-53.1-51c-43.2-25.1-98.9-14.3-137.8,13.8c-25,18.1-44.7,44.7-46.9,76.2c-2.1,30.3,11.3,59.2,29,82.9c-0.3,1.5,0.1,3.1,1.8,4.3c5.4,3.8,10.3,8,15.9,11.7c6.3,4.1,13.1,7.6,19.9,10.9c13.1,6.2,26.9,10.9,40.7,15.2c27.4,8.5,56,14.2,84.2,5.8C408.4,265.3,448,222.4,440.2,175z M338.3,272.7c-23.4,0.8-47.2-6.9-69.1-14.6c-10.5-3.7-20.7-7.9-30.7-12.8c-9.3-4.7-17.2-10.7-25.5-16.7c-0.1-0.8-0.4-1.6-1-2.4c-15.3-20.3-27.2-43.7-28.4-69.5c-1.2-26.7,12.3-49.8,31.2-67.6c35.4-33.2,92.6-47.4,136.8-23.9c22,11.7,39.7,31,53.4,51.5c13.1,19.6,24.7,43.7,26.1,67.5C434.1,232.5,382.8,271.2,338.3,272.7z" />
            <path d="M474.5,155.5c-6.3-15.9-17-29.4-29.2-41.2c-0.3-0.3-0.6-0.5-0.9-0.7c-5-8.8-10.5-17.1-16.2-25C400.1,50.5,357.8,17.8,308.6,18c-48.1,0.2-97.2,26.9-128.8,62.1c-15.1,16.9-25.9,37-29.6,59.2c-2.2,0.5-4.1,2.2-4.2,5.1c-0.1,42-9.8,91.5,19.8,126.3c-23,14.8-45.3,30.8-65.5,49.4c-20,18.3-37.6,39.3-42.1,66.8c-3.4,20.8,2.8,44.7,22.4,55.4c21.1,11.5,46.3,3.3,64.9-9.2c17.3-11.7,30.9-28.7,41.8-46.3c13.1-21,22.9-43.7,30.7-67.2c27.1,12.3,55.2,17.9,84.7,20c28.7,2.1,58,2.4,84.5-10.3c24.9-11.9,45.5-31.4,63.4-52c17.5-20.1,29.6-43.4,31.2-70.4C482.9,189.4,481,171.7,474.5,155.5z M175.8,101.4c27-39.9,75.8-68.4,123.6-72.9c50.1-4.7,93.1,28.5,121.4,66.9c14.4,19.6,25.6,41.6,32.2,65c6.4,23.1,4.2,46.3-6.5,67.7c-18.2,36.7-57.9,62.5-98.5,65.8c-13.8,1.1-28-1.1-41.6-3.7c-13.3-2.6-26.5-5.9-39.6-9.5c-24.9-6.8-49.8-17.3-70.6-33c0.2-1.1-0.1-2.3-1.1-3.5c-17.1-19.6-30.2-43-34.8-68.9C155.8,149.6,161.1,123.1,175.8,101.4z M137.8,426.1c-7.3,4.7-15.3,8.4-23.9,10.4c-10.6,2.4-22.1,1.5-31.3-4.7c-8.4-5.7-12.9-15-14.6-24.8c-1.9-11.1-0.4-21.9,3.4-32c0.7-0.1,1.4-0.3,2-0.8c8-4.9,20.3-2.7,28.9-1c4.7,0.9,9.3,2.3,13.7,4.1c3.1,1.3,3.5,2.1,5.5,5.2c4.5,7,7.9,14.9,11.1,22.6c1.6,3.8,3,7.6,4.2,11.5c0.4,1.3,0.8,2.7,1,4.1c0,0.1,0,0.3,0.1,0.4C137,422.6,137,424.6,137.8,426.1z M213.9,308.2c-1.6,0.1-3.1,1-3.7,3.1c-9.1,28.8-21.3,57.1-39,81.7c-6.7,9.3-14.6,18.4-23.6,25.9c-1.7-13.6-14.8-36.8-17.3-41c-1.9-3.2-4.1-6.4-7.5-8.2c-5.2-2.9-11.1-4.5-16.9-5.8c-8.8-2.1-19.3-3.4-28.6-1.4c5.5-9.6,12.7-18.5,20.2-26.2c24.4-24.9,54-45,83.4-63.5c0.8-0.5,1.4-1.1,1.7-1.8c5.8-0.4,11.4,4.7,15.7,8.1c3.2,2.6,4.9,4.7,7,8.3c2.3,4,4.4,8.2,6.3,12.4c0.9,1.9,1.7,3.9,2.4,5.9c0.2,0.5,0.3,0.8,0.4,1.2C214.1,307.4,214,307.8,213.9,308.2z M451.4,260.4c-16.3,22.1-37.6,42.4-61.4,56.1c-26.2,15.1-56.1,15.2-85.5,13.2c-28-1.9-54.7-7.1-80.5-18.4c2.7-7.2-7-23.2-9.2-27.2c-3.3-5.9-6.2-9.5-11.5-13.8c-7.8-6.3-16.8-11.6-26.9-8.1c-1.4,0.5-2.2,1.3-2.7,2.3c-13.9-15.6-18-36.6-19-56.9c-0.3-5-0.3-10-0.3-15c2.9,9.5,6.9,18.7,11.6,27.5c5.5,10.2,12.3,19.7,19.9,28.5c-0.3,0.7-0.6,1.5-0.8,2.3c-1.1,4.2,3,6.4,6.3,5.5c22.4,16.5,48.6,27.1,75.2,34.4c28.4,7.8,59.4,16.1,89,12.2c45.6-6,88.6-38.6,104.7-81.9c8.8-23.7,7.3-48.3,0-71.7c6,10.9,9.9,22.9,11.2,35.9C474.2,212.8,467.7,238.3,451.4,260.4z" />
          </svg>
        </NavLink >

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav className="hidden md:block" aria-labelledby="header-navigation">
            <h2 className="sr-only" id="header-navigation">Header navigation</h2>

            <ul className="flex items-center gap-6 text-sm">
              <li>
                <NavLink to="/workspace" className="text-gray-500 transition hover:text-gray-500/75">
                  Workspace
                </NavLink >
              </li>

              {/* <li>
                <NavLink to="/dashboard" className="text-gray-500 transition hover:text-gray-500/75">
                  Dashboard
                </NavLink >
              </li> */}

              <li>
                <NavLink to="/profile" className="text-gray-500 transition hover:text-gray-500/75">
                  Profile
                </NavLink >
              </li>

            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (loggedIn) : (notLoggedIn)}


            <button
              className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

  )
}

export default Header




