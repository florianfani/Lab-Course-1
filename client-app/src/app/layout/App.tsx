import React, { Component, Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, Icon, List } from 'semantic-ui-react';
import { Job } from '../models/job';
import NavBar from './NavBar';
import JobDashboard from '../../features/jobs/dashboard/JobDashboard';






function App(): JSX.Element {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() =>{
    axios.get<Job[]>('http://localhost:5000/api/jobs').then(response =>{
      setJobs(response.data);
    })
  }, [])


  return (
    <Fragment>
     <NavBar/>
      
    <Container style={{marginTop: '7em'}}>
      <JobDashboard jobs={jobs}/>
    </Container>


          
        
      
    </Fragment>
  );
}

export default App;

