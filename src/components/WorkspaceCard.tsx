import axios from 'axios';
import React, { useState } from 'react';
import retrieveJwt from '../utils/retrieveJwt'
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:3000'

interface WorkspaceCardProps {
  name: string;
  description: string;
  workspace_id: number;
  retrieveWorkspaces: () => void
  children?: React.ReactNode
}

function WorkspaceCard(props: WorkspaceCardProps) {

  // hooks
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  // event handlers
  function handleDeleteWorkspace (workspace_id: number) {
    axios.delete(BASE_URL +`/api/v1/workspaces/${workspace_id}`, {
      headers: {
        'Authorization': retrieveJwt(),
      }
    }).then((response) => {
      setData(response.data.data);
      props.retrieveWorkspaces();
    }).catch(error => {
      setError(error);
    });
  }

  function handleLinkToDashboard(workspace_id: number) {
    navigate(`/dashboard/${workspace_id}`)
  }

  function handleEditWorkspace () {
    console.log('To be implemented...')
  }

  return (
    <div
      className="relative block rounded-xl border border-gray-100 px-8 py-4 shadow-xl bg-white m-5 hover:border-indigo-600 hover:drop-shadow-2xl"
    >

      <div className="text-gray-500 sm:pr-8">

        <h5 className="text-xl font-bold text-gray-900">{props.name}</h5>

        <p className="mt-2 hidden text-sm sm:block">
          {props.description}
        </p>
      </div>

      <div className='flex justify-end gap-x-7 mt-2'>
        <button
          className="group relative rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => handleLinkToDashboard(props.workspace_id)}
        >
          Go to Dashboard
        </button>
        <button
          className="group relative rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick={() => handleEditWorkspace()}
        >
          Edit
        </button>
        <button
          className="group relative rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={() => handleDeleteWorkspace(props.workspace_id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default WorkspaceCard

