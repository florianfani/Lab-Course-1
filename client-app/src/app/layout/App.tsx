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
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import JobForm from '../../features/jobs/form/JobForm';
import JobDetails from '../../features/jobs/details/JobDetails';








function App(): JSX.Element {
  const location = useLocation();

  return (
    <Fragment>
    <Route exact path='/' component={HomePage} />
    <Route 
      path={'/(.+)'}
      render={() =>(
        <>
        <NavBar />
        <Container style={{marginTop: '7em'}}>
          <Route exact path='/jobs' component={JobDashboard} />
          <Route path='/jobs/:id' component={JobDetails} />
          <Route key={location.key} path={['/createJob', '/manage/:id']} component={JobForm} />
        </Container>
        </>
      )}
    
    />
     


    </Fragment>
  );
}

export default observer(App);

