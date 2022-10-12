import React from 'react'
import Column from './Column'

function Board() {
  const title1 = 'To Do'
  const title2 = 'in progress'
  const title3 = 'Complete'
  return (
    <div className='grid grid-cols-3 m-1'>
      <Column title={title1}/>
      <Column title={title2}/>
      <Column title={title3}/>
    </div>
  )
}

export default Board