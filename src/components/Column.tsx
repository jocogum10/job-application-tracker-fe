import React from 'react'
import JobAppCard from './JobAppCard'

type columnType = {
  title: string;
  jobApplications: JobApplicationModel[];
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
};

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

function Column({title, jobApplications, onDragStart, onDragOver}: columnType) {

  const jobCards = jobApplications?.filter( (jobApp) => {
      return jobApp.attributes.status === title.toLowerCase();
    }).map( (jobApp) => {
      return <JobAppCard key={jobApp.id} id={jobApp.id} jobApplication={jobApp} onDragStart={onDragStart}/>
    });
  return (
    <div className='m-1 bg-indigo-300 h-full rounded p-3' onDragOver={onDragOver}>
      {title}
      {jobCards}
    </div>
  )
}

export default Column