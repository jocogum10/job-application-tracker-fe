import React from 'react'
import JobAppCard from './JobAppCard'

type columnType = {
  title: string;
  jobApplications: JobApplicationModel[];
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

function Column({title, jobApplications}: columnType) {

  const jobCards = jobApplications?.filter( (jobApp) => {
      return jobApp.attributes.status === title.toLowerCase();
    }).map( (jobApp) => {
      return <JobAppCard key={jobApp.id} jobApplication={jobApp} />
    });
  return (
    <div className='m-1 bg-indigo-300 h-full rounded p-3'>
      {title}
      {jobCards}
    </div>
  )
}

export default Column