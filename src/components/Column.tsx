import React from 'react'
import JobAppCard from './JobAppCard'

type columnType = {
  title: string;
};

function Column({title}: columnType) {
  return (
    <div className='m-1 bg-indigo-300 h-full rounded p-3'>
      {title}
      <JobAppCard />
      <JobAppCard />
    </div>
  )
}

export default Column