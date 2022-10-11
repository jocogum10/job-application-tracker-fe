import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import WorkspaceCard from '../components/WorkspaceCard'
import retrieveJwt from '../utils/retrieveJwt'

const BASE_URL = 'http://localhost:3000'

function Workspace() {

  const [data, setData] = useState([]);
  const [error, setError] = useState([])

  useEffect(() => {
    retrieveJwt();
    axios.get(BASE_URL + '/api/v1/workspaces', {
      headers: {
        'Authorization': retrieveJwt(),
      }
    }).then((response) => {
      setData(response.data.data);
    }).catch(error => {
      setError(error);
    });
  }, []);

  // console.log(data);

  const cards = data.map((data) => {
    return <WorkspaceCard key={data["id"]} name={data["attributes"]["name"]} description={data["attributes"]["description"]} />
  });

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
          >
            + New Workspace
          </button>
        </div>
      </section>
      <main>
        {data && cards}
      </main>



    </div>
  )
}

export default Workspace