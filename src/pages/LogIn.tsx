import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import saveJwt from '../utils/saveJwt';
import saveUser from '../utils/saveUser';
import Header from '../components/Header';

// const BASE_URL = 'http://localhost:3000'
const BASE_URL = 'https://job-application-tracker-api.herokuapp.com/'

type userType = {
  message: string
  user: {
    id: number
    email: string
    created_at: string
    updated_at: string
  }
}

function LogIn() {
  // props

  // hooks
  const [user, setUser] = useState<userType>({
    message: "",
    user: {
      id: 0,
      email: "",
      created_at: "",
      updated_at: "",
    },
  });
  const [error, setError] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // event handlers
  function handleOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
    e.preventDefault();
    axios.post(BASE_URL + '/users/sign_in', {
      user: {
        email: email,
        password: password
      }
    }).then((response) => {
      
      console.log(response);
      setUser(response.data);
      saveUser(response.data.user)
      saveJwt(response.headers.authorization)
      setTimeout( () => {
        navigate('/')
      }, 1000);
    }).catch(error => {
      setError(error);
    });
  }

  // debug
  // console.log(user);

  return (
    <div>
      <Header />
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Log in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
            </p>
          </div>
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>

            <div>
            <div className='flex justify-center mb-2 text-green-500'>{user? (user.message) : ("no user...")}</div>
              <button
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={(e) => handleOnClick(e)}
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>


  )
}

export default LogIn