import React, { useState } from 'react'
import axios from 'axios';
import retrieveJwt from '../utils/retrieveJwt'

const BASE_URL = 'http://localhost:3000'

type JobAppType = {
  jobApplication: JobApplicationModel;
  retrieveJobApplications: () => void;
};
type draggableType = {
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
}
type JobAppIdType = {
  id: number
}

type workspaceIdType = {
  workspace_id: string | undefined
}

interface JobApplicationModel {
  attributes: {
    company: string
    description: string
    job_link: string
    notes: string
    status: string
    title: string
  }
}

function JobAppCard({ jobApplication, onDragStart, id, workspace_id, retrieveJobApplications}: (JobAppType & draggableType & JobAppIdType & workspaceIdType)) {

  // hooks
  const [error, setError] = useState([]);

  // event handlers
  function handleDeleteCard(workspace_id: string='NA', id: string,){
    axios.delete(BASE_URL +`/api/v1/workspaces/${workspace_id}/job-applications/${id}`, {
      headers: {
        'Authorization': retrieveJwt(),
      }
    }).then((response) => {
      if(response.status === 204) {
        retrieveJobApplications();
      }
    }).catch(error => {
      setError(error);
    });
  }

  // let idToString = id.toString()
  return (
    <div className='relative block rounded-xl border overflow-auto border-gray-100 p-3 shadow-xl bg-white m-5 hover:border-indigo-600 hover:bg-indigo-100 hover:drop-shadow-2xl'
      draggable
      onDragStart={(e) => (onDragStart(e, id.toString()))}
    >
      <div className="text-gray-500 w-full">
        <h5 className="text-sm font-bold text-gray-900">{jobApplication.attributes.title}</h5>
        <p className="my-2 hidden text-sm sm:block">
          {jobApplication.attributes.description}
        </p>
        <div className='flex justify-end gap-x-7'>
          <button className="group relative rounded-md border border-transparent bg-indigo-600 py-1 px-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Details
          </button>
          <button 
          className="group relative rounded-md border border-transparent bg-red-600 py-1 px-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={ () => handleDeleteCard(workspace_id, id.toString())}
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  )
}

export default JobAppCard