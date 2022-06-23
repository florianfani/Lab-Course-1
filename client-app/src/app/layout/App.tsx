import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container } from 'semantic-ui-react';
import { Job } from '../models/job';
import NavBar from './NavBar';
import JobDashboard from '../../features/jobs/dashboard/JobDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';






function App(): JSX.Element {
  const {jobStore} = useStore();



  useEffect(() =>{
    jobStore.loadJobs();
  }, [jobStore])

  



  if (jobStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <Fragment>
     <NavBar />
      
    <Container style={{marginTop: '7em'}}>
      <JobDashboard />
    </Container>


          
        
      
    </Fragment>
  );
}

export default observer(App);

