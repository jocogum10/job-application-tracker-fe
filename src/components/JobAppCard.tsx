import React from 'react'

type JobAppType = {
  jobApplication: JobApplicationModel;
};

interface JobApplicationModel {
  attributes: {
    company: string
    description: string
    job_link: string
    notes: string
    status: string
    title: string
  }
}

function JobAppCard({jobApplication}:JobAppType) {
  return (
    <div className='relative block rounded-xl border border-gray-100 p-8 shadow-xl bg-white m-5 hover:border-indigo-600 hover:drop-shadow-2xl'>
      <h3>{jobApplication.attributes.title}</h3>
      <p>{jobApplication.attributes.description}</p>
    </div>
  )
}

export default JobAppCard