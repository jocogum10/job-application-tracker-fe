import React, { useEffect, useState } from 'react'
import axios from 'axios';
import retrieveJwt from '../utils/retrieveJwt'

// const BASE_URL = 'http://localhost:3000'
const BASE_URL = 'https://job-application-tracker-api.herokuapp.com'

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

function JobAppCard({ jobApplication, onDragStart, id, workspace_id, retrieveJobApplications }: (JobAppType & draggableType & JobAppIdType & workspaceIdType)) {

  // hooks
  const [error, setError] = useState([]);
  const [detailsModal, setDetailsModal] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobCompany, setJobCompany] = useState('');
  const [jobLink, setJobLink] = useState('');
  const [jobStatus, setJobStatus] = useState('');
  const [jobNotes, setJobNotes] = useState('');

  // event handlers
  function handleDeleteCard(workspace_id: string = 'NA', id: string,) {
    axios.delete(BASE_URL + `/api/v1/workspaces/${workspace_id}/job-applications/${id}`, {
      headers: {
        'Authorization': retrieveJwt(),
      }
    }).then((response) => {
      if (response.status === 204) {
        retrieveJobApplications();
      }
    }).catch(error => {
      setError(error);
    });
  }

  function handleUpdateCardOnDetails() {
    console.log('to be implemented...')
  }

  // --------------
  const modal = <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Details of the Job Application</h3>
                {/* ------------------ */}
                <div className="mt-2">
                  <div className='my-2'>
                    <label htmlFor="jobTitle" className="sr-only">
                      Title
                    </label>
                    <input
                      id="jobTitle"
                      name="jobTitle"
                      type="text"
                      required
                      className="w-full appearance-none border rounded-lg border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Job Title"
                      value={jobApplication.attributes.title}
                    onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </div>
                  <div className='my-2'>
                    <label htmlFor="jobDescription" className="sr-only">
                      Description
                    </label>
                    <textarea
                      id="jobDescription"
                      name="jobDescription"
                      required
                      className="w-full appearance-none border rounded-lg border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Description"
                      value={jobApplication.attributes.description}
                    onChange={(e) => setJobDescription(e.target.value)}
                    />
                    <label htmlFor="jobCompany" className="sr-only">
                      Company
                    </label>
                    <input
                      id="jobCompany"
                      name="jobCompany"
                      type="text"
                      required
                      className="w-full appearance-none border rounded-lg border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Company Name"
                      value={jobApplication.attributes.company}
                    onChange={(e) => setJobCompany(e.target.value)}
                    />
                  </div>
                  <div className='my-2'>
                    <label htmlFor="jobLink" className="sr-only">
                      Job Posting Link
                    </label>
                    <input
                      id="jobLink"
                      name="jobLink"
                      type="text"
                      required
                      className="w-full appearance-none border rounded-lg border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Job Posting Link"
                      value={jobApplication.attributes.job_link}
                    onChange={(e) => setJobLink(e.target.value)}
                    />
                  </div>
                  <div className='my-2 flex justify-between content-center'>
                    <label htmlFor="jobStatus" className='my-auto mr-2 pl-4 text-gray-500'>
                      Status
                    </label>
                    <select
                      id="jobStatus"
                      name="jobStatus"
                      autoComplete="jobStatus"
                      className="w-full text-center appearance-none border rounded-lg border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      value={jobApplication.attributes.status}
                    onChange={(e) => setJobStatus(e.target.value)}
                    >
                      <option value={'Applied'}>Applied</option>
                      <option value={'Interviewed'}>Interviewed</option>
                      <option value={'Rejected'}>Rejected</option>
                      <option value={'Offered'}>Offered</option>
                    </select>
                  </div>
                  <div className='my-2'>
                    <label htmlFor="jobNotes" className="sr-only">
                      Notes
                    </label>
                    <textarea
                      id="jobNotes"
                      name="jobNotes"
                      required
                      className="w-full appearance-none border rounded-lg border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Notes"
                      value={jobApplication.attributes.notes}
                    onChange={(e) => setJobNotes(e.target.value)}
                    />
                  </div>
                </div>
                {/* ------------------ */}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={ () => handleUpdateCardOnDetails()}
            >
              Update
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => setDetailsModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  // --------------

  return (
    <>
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
            <button
              className="group relative rounded-md border border-transparent bg-indigo-600 py-1 px-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => setDetailsModal(true)}
            >
              Details
            </button>
            <button
              className="group relative rounded-md border border-transparent bg-red-600 py-1 px-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              onClick={() => handleDeleteCard(workspace_id, id.toString())}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {detailsModal && modal}
    </>

  )
}

export default JobAppCard