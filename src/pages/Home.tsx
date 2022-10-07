import React from 'react'
import Header from '../components/Header'
import icon from '../icons/icon.svg'

function Home() {
  return (
    <div>
      <Header />
      <div>
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-around lg:py-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Job hunting?</span>
            <span className="block text-indigo-600">Start tracking your job applications today.</span>
          </h2>
          <img src={icon} alt="tracking icon" className='object-scale-down h-96 w-auto'/>
        </div>
        
      </div>
      
    </div>
  )
}

export default Home