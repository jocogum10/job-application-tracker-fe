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


  useEffect( () => {
    const jwt = retrieveJwt();
    axios.all([
      axios.get(BASE_URL +`/api/v1/workspaces/${workspace_id}`, {
        headers: {
          'Authorization': jwt,
        }
      }), 
      axios.get(BASE_URL +`/api/v1/workspaces/${workspace_id}/job-applications`, {
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
  }, []);

  // jobApplications?.map( (jobs, index) => {
  //   console.log(jobs);
  // });

  function onDragStart (e:React.DragEvent<HTMLDivElement>, id: string) {
    e.dataTransfer.setData('id', id);
  }

  function onDragOver (e:React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function onDrop(e:React.DragEvent<HTMLDivElement>, title: string){
    const id = e.dataTransfer.getData('id');

    const updatedJobApps = jobApplications.filter( (jobApplication) => {
      const draggedCard = jobApplication.id;
      if(draggedCard.toString() === id) {
        jobApplication.attributes.status = title.toLowerCase();
      }
      return jobApplication;
    })
    setJobApplications(updatedJobApps);
    console.log(jobApplications);
  }
  
  return (
    <div>
      <Header />
      <section className="bg-white shadow flex justify-between content-center">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-indigo-600">Dashboard - {workspaceName} </h1>
        </div>
        <div className='py-6 px-4 sm:px-6 lg:px-8'>
        </div>
      </section>
      <main className='grid grid-cols-4 m-1'>
        <Column key={1} title={'Applied'} jobApplications={jobApplications} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} />
        <Column key={2} title={'Interviewed'} jobApplications={jobApplications} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop}/>
        <Column key={3} title={'Rejected'} jobApplications={jobApplications} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop}/>
        <Column key={4} title={'Offered'} jobApplications={jobApplications} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop}/>
      </main>
    </div>
  )
}

export default Dashboard