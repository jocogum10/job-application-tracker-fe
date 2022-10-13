import React, { useEffect, useState } from 'react'
import Board from '../components/Board'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import retrieveJwt from '../utils/retrieveJwt'

const BASE_URL = 'http://localhost:3000'

function Dashboard() {
  // hooks
  const { workspace_id } = useParams();

  const [jobApplications, setJobApplications] = useState([]);
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
      console.log('res1', res1.data.data, 'res2', res2.data.data)
      
    })).catch(error => {
      setError(error);
    });
  }, []);
  console.log(jobApplications)
  
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
      <main>
        <Board />
      </main>
    </div>
  )
}

export default Dashboard