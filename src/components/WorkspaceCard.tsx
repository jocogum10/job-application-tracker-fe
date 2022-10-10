import React from 'react'

interface WorkspaceCardProps {
  name: string;
  description: string;
  children?: React.ReactNode; // 👈️ for demo purposes
}

function WorkspaceCard(props: WorkspaceCardProps) {

  return (
    <a 
      className="relative block rounded-xl border border-gray-100 p-8 shadow-xl bg-white m-5 hover:border-indigo-600 hover:drop-shadow-2xl" 
      href=""
    >

        <div className="text-gray-500 sm:pr-8">

          <h5 className="text-xl font-bold text-gray-900 ">{props.name}</h5>

          <p className="mt-2 hidden text-sm sm:block">
            {props.description}
          </p>
        </div>
      </a>
  )
}

export default WorkspaceCard