import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import WorkspaceCard from '../components/WorkspaceCard'
import retrieveJwt from '../utils/retrieveJwt'

// const BASE_URL = 'http://localhost:3000'
const BASE_URL = 'https://job-application-tracker-api.herokuapp.com/'

function Workspace() {

  // hooks
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceDescription, setWorkspaceDescription] = useState('');
  const [newWorkspaceModal, setNewWorkspaceModal] = useState(false);

  useEffect(() => {
    retrieveWorkspaces();
  }, []);

  // event handlers
  function retrieveWorkspaces(){
    axios.get(BASE_URL + '/api/v1/workspaces', {
      headers: {
        'Authorization': retrieveJwt(),
      }
    }).then((response) => {
      setData(response.data.data);
    }).catch(error => {
      setError(error);
    });
  }
  function handleCreateWorkspace() {
    axios.post(BASE_URL + '/api/v1/workspaces',{
      workspace: {
        'name': workspaceName,
        'description': workspaceDescription
      }
    },{
      headers: {
        'Authorization': retrieveJwt(),
      }
    }).then((response) => {
      console.log(response)
      setNewWorkspaceModal(false);
      setWorkspaceName('');
      setWorkspaceDescription('')
      retrieveWorkspaces();
    }).catch(error => {
      setError(error);
    });
  }


  // elements
  const cards = data.map((data) => {
    return <WorkspaceCard key={data["id"]} workspace_id={data["id"]} name={data["attributes"]["name"]} description={data["attributes"]["description"]} retrieveWorkspaces={retrieveWorkspaces} />
  });

  const modal = <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Create New Workspace</h3>
                <div className="mt-2">
                  <div className='my-2'>
                    <label htmlFor="workspaceName" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="workspaceName"
                      name="workspaceName"
                      type="text"
                      required
                      className="w-full appearance-none border rounded-lg border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Name"
                      value={workspaceName}
                      onChange={(event) => setWorkspaceName(event.target.value)}
                    />
                  </div>
                  <div className='my-2'>
                    <label htmlFor="workspaceDescription" className="sr-only">
                      Email address
                    </label>
                    <textarea
                      id="workspaceDescription"
                      name="workspaceDescription"
                      required
                      className="w-full appearance-none border rounded-lg border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Description"
                      value={workspaceDescription}
                      onChange={(event) => setWorkspaceDescription(event.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button 
              type="button" 
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" 
              onClick={handleCreateWorkspace}
            >
              Create
            </button>
            <button 
              type="button" 
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" 
              onClick={() => setNewWorkspaceModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  return (
    <div>
      <Header />

      <section className="bg-white shadow flex justify-between content-center">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-indigo-600">Workspaces</h1>
        </div>
        <div className='py-6 px-4 sm:px-6 lg:px-8'>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => setNewWorkspaceModal(true)}
          >
            + New Workspace
          </button>
        </div>
      </section>
      <main>
        {data && cards}
      </main>
      {newWorkspaceModal && modal}


    </div>
  )
}

export default Workspace