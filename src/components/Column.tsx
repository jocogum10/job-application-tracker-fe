import React from 'react'
import JobAppCard from './JobAppCard'

type columnType = {
  title: string;
  jobApplications: JobApplicationModel[];
  workspace_id: string | undefined
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, title: string) => void; 
  retrieveJobApplications: () => void;
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

function Column({title, jobApplications, onDragStart, onDragOver, onDrop, workspace_id, retrieveJobApplications}: columnType) {

  const jobCards = jobApplications?.filter( (jobApp) => {
      return jobApp.attributes.status === title.toLowerCase();
    }).map( (jobApp) => {
      return <JobAppCard key={jobApp.id} id={jobApp.id} workspace_id={workspace_id} jobApplication={jobApp} onDragStart={onDragStart} retrieveJobApplications={retrieveJobApplications} />
    });
  return (
    <div className='m-1 bg-indigo-500 h-full rounded p-3' onDragOver={onDragOver} onDrop={(e) => onDrop(e, title)}>
      {title}
      {jobCards}
    </div>
  )
}

export default Column