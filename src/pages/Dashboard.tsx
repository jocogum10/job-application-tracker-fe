import React from 'react'
import Board from '../components/Board'
import Header from '../components/Header'

function Dashboard() {
  return (
    <div>
      <Header />
      <section className="bg-white shadow flex justify-between content-center">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-indigo-600">Dashboard</h1>
        </div>
        <div className='py-6 px-4 sm:px-6 lg:px-8'>
        </div>
      </section>
      <main>
        <Board />
      </main>
    </div>
  )
}

export default Dashboard