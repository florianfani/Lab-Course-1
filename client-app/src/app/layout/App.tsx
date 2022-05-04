import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Job } from '../models/job';
import NavBar from './NavBar';
import JobDashboard from '../../features/jobs/dashboard/JobDashboard';
import {v4 as uuid} from 'uuid';





function App(): JSX.Element {
  const [jobs, setJobs] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() =>{
    axios.get<Job[]>('http://localhost:5000/api/jobs').then(response =>{
      setJobs(response.data);
    })
  }, [])

  function handleSelectJob(id: string){
    setSelectedJob(jobs.find(x => x.id === id))
  }

  function handleCancelSelectJob(){
    setSelectedJob(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectJob(id) : handleCancelSelectJob();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditJob(job: Job){
    job.id ? setJobs([...jobs.filter(x => x.id !== job.id), job]) : setJobs([...jobs, {...job, id: uuid()}]);
    setEditMode(false);
    setSelectedJob(job); 
  }

  function handleDeleteJob(id: string){
    setJobs([...jobs.filter(x => x.id !== id)]);
  }

  return (
    <Fragment>
     <NavBar openForm={handleFormOpen}/>
      
    <Container style={{marginTop: '7em'}}>
      <JobDashboard 
        jobs={jobs}
        selectedJob={selectedJob}
        selectJob={handleSelectJob}
        cancelSelectJob={handleCancelSelectJob}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditJob}
        deleteJob={handleDeleteJob}
      />
    </Container>


          
        
      
    </Fragment>
  );
}

export default App;

