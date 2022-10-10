import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import WorkspaceCard from '../components/WorkspaceCard'
import retrieveJwt from '../utils/retrieveJwt'

const BASE_URL = 'http://localhost:3000'

function Workspace() {

  const [data, setData] = useState([]);
  const [error, setError] = useState([])

  useEffect( ()=> {
    retrieveJwt();
    axios.get(BASE_URL+ '/api/v1/workspaces',{
      headers: {
        'Authorization': retrieveJwt(),
      }
    }).then( (response)=> {
      setData(response.data.data);
      // console.log(response)
    }).catch( error => {
      setError(error);
    });
  }, []);

  console.log(data[0]);

  // const cards = data.map( ({data, idx}) => (
  //   <WorkspaceCard name={data.attributes} description={data.attributes}/>
  // ))

  
  // data.map( (d) => {
  //   console.log(d)
  //   // return <WorkspaceCard name={d.attributes.name} description={d.attributes.description}/>
  // });
  
  return (
    <div>
      <Header />
      {/* {cards} */}
    </div>
  )
}

export default Workspace