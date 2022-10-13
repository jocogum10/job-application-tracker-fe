import axios from 'axios'
import React, { useEffect } from 'react'
import Column from './Column'


// type MyType = {
//   id: number;
//   name: string;
// }

// type MyGroupType = {
//   [key:string]: MyType;
// }

function Board() {
  const title1 = 'Applied'
  const title2 = 'Interviewed'
  const title3 = 'Rejected'
  const title4 = 'Offered'

  useEffect( () => {
    // axios.get()
    console.log('test')
  }, []);
  return (
    <div className='grid grid-cols-4 m-1'>
      <Column title={title1}/>
      <Column title={title2}/>
      <Column title={title3}/>
      <Column title={title4}/>
    </div>
  )
}

export default Board