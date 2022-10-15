import React from 'react'

type JobAppType = {
  jobApplication: JobApplicationModel;
};
type draggableType = {
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
}
type JobAppIdType = {
  id: number
}

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

function JobAppCard({ jobApplication, onDragStart, id }: (JobAppType & draggableType & JobAppIdType)) {

  let idToString = id.toString()
  return (
    <div className='relative block rounded-xl border border-gray-100 p-3 shadow-xl bg-white m-5 hover:border-indigo-600 hover:bg-indigo-100 hover:drop-shadow-2xl'
      draggable
      onDragStart={(e) => (onDragStart(e, idToString))}
    >
      <div className="text-gray-500 w-full">
        <h5 className="text-sm font-bold text-gray-900">{jobApplication.attributes.title}</h5>
        <p className="my-2 hidden text-sm sm:block">
          {jobApplication.attributes.description}
        </p>
        <div className='flex justify-end gap-x-7'>
          <button className="group relative rounded-md border border-transparent bg-indigo-600 py-1 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Details
          </button>
        </div>

      </div>
    </div>
  )
}

export default JobAppCard