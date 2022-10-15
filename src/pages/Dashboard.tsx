import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import retrieveJwt from '../utils/retrieveJwt'
import Column from '../components/Column'

const BASE_URL = 'http://localhost:3000'

interface JobApplicationModel {
  id: number
  attributes: {
    company: string
    description: string
    job_link: string
    notes: string
    status: string
    title: string
  }
}
interface JobApplicationListModel {
  jobApplications: JobApplicationModel[];
}

function Dashboard() {
  // hooks
  const { workspace_id } = useParams();

  const [jobApplications, setJobApplications] = useState<JobApplicationModel[]>([]);
  const [error, setError] = useState([]);
  const [workspaceName, setWorkspaceName] = useState([]);
  const [newJobAppModal, setNewJobAppModal] = useState(false);

  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobCompany, setJobCompany] = useState('');
  const [jobLink, setJobLink] = useState('');
  const [jobStatus, setJobStatus] = useState('Applied');
  const [jobNotes, setJobNotes] = useState('');


  useEffect(() => {
    retrieveJobApplications();
  }, []);

  function retrieveJobApplications () {
    const jwt = retrieveJwt();
    axios.all([
      axios.get(BASE_URL + `/api/v1/workspaces/${workspace_id}`, {
        headers: {
          'Authorization': jwt,
        }
      }),
      axios.get(BASE_URL + `/api/v1/workspaces/${workspace_id}/job-applications`, {
        headers: {
          'Authorization': jwt,
        }
      })
    ])
      .then(axios.spread((res1, res2) => {
        // output of req.
        setWorkspaceName(res1.data.data.attributes.name)
        setJobApplications(res2.data.data)
        // console.log('res1', res1.data.data, 'res2', res2.data.data)

      })).catch(error => {
        setError(error);
      });
  }

  function onDragStart(e: React.DragEvent<HTMLDivElement>, id: string) {
    e.dataTransfer.setData('id', id);
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>, title: string) {
    const id = e.dataTransfer.getData('id');

    const updatedJobApps = jobApplications.filter((jobApplication) => {
      const draggedCard = jobApplication.id;
      if (draggedCard.toString() === id) {
        jobApplication.attributes.status = title.toLowerCase();
        handleUpdateCardOnDrop(workspace_id, id, jobApplication);
      }
      // return jobApplication;
    })
    // setJobApplications(updatedJobApps);
  }

  function handleNewJobApplication(workspace_id: string='NA') {
    axios.post(BASE_URL + `/api/v1/workspaces/${workspace_id}/job-applications`, {
      job_application: {
        'title': jobTitle,
        'description': jobDescription,
        'company': jobCompany,
        'job_link': jobLink,
        'status': jobStatus.toLowerCase(),
        'notes': jobNotes,
      }
    }, {
      headers: {
        'Authorization': retrieveJwt(),
      }
    }).then((response) => {
      if(response.status === 201){
        setNewJobAppModal(false);
        setJobTitle('');
        setJobDescription('');
        setJobCompany('');
        setJobLink('');
        setJobStatus('Applied');
        setJobNotes('');
        retrieveJobApplications();
      }
    }).catch(error => {
      setError(error);
    });
  }

  function handleUpdateCardOnDrop (workspace_id: string='NA', id: string, jobApplication: JobApplicationModel) {
    axios.patch(BASE_URL + `/api/v1/workspaces/${workspace_id}/job-applications/${id}`,{
      job_application: {
        'title': jobApplication.attributes.title,
        'description': jobApplication.attributes.description,
        'company': jobApplication.attributes.company,
        'job_link': jobApplication.attributes.job_link,
        'status': jobApplication.attributes.status.toLowerCase(),
        'notes': jobApplication.attributes.notes,
      }
    },{
      headers: {
        'Authorization': retrieveJwt(),
      }
    }).then((response) => {
      console.log(response)
      if(response.status === 202){
        retrieveJobApplications();
      }
    }).catch(error => {
      setError(error);
    });
  }

  function handleDeleteCard(workspace_id: string='NA', id: string,){
    axios.delete(BASE_URL +`/api/v1/workspaces/${workspace_id}/job-applications/${id}`, {
      headers: {
        'Authorization': retrieveJwt(),
      }
    }).then((response) => {
      console.log(response)
    }).catch(error => {
      setError(error);
    });
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
                <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Create New Job Application</h3>
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
                      value={jobTitle}
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
                      value={jobDescription}
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
                      value={jobCompany}
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
                      value={jobLink}
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
                      // className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      value={jobStatus}
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
                      value={jobNotes}
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
              onClick={ () => handleNewJobApplication(workspace_id)}
            >
              Create
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => setNewJobAppModal(false)}
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
    <div>
      <Header />
      <section className="bg-white shadow flex justify-between content-center">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-indigo-600">Dashboard - {workspaceName} </h1>
        </div>
        <div className='py-6 px-4 sm:px-6 lg:px-8'>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => setNewJobAppModal(true)}
          >
            + New Job Application
          </button>
        </div>
      </section>
      <main className='grid grid-cols-4 m-1'>
        <Column key={1} title={'Applied'} jobApplications={jobApplications} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} />
        <Column key={2} title={'Interviewed'} jobApplications={jobApplications} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} />
        <Column key={3} title={'Rejected'} jobApplications={jobApplications} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} />
        <Column key={4} title={'Offered'} jobApplications={jobApplications} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} />
      </main>
      {newJobAppModal && modal}
    </div>
  )
}

export default Dashboard