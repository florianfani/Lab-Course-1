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
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import JobForm from '../../features/jobs/form/JobForm';
import JobDetails from '../../features/jobs/details/JobDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';








function App(): JSX.Element {
  const location = useLocation();

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar />
    <Route exact path='/' component={HomePage} />
    <Route 
      path={'/(.+)'}
      render={() =>(
        <>
        <NavBar />
        <Container style={{marginTop: '7em'}}>
          <Switch>
            <Route exact path='/jobs' component={JobDashboard} />
            <Route path='/jobs/:id' component={JobDetails} />
            <Route key={location.key} path={['/createJob', '/manage/:id']} component={JobForm} />
            <Route path='/errors' component={TestErrors} />
            <Route path='/server-error' component={ServerError} />
            <Route component={NotFound} />
          </Switch>

        </Container>
        </>
      )}
    
    />
     


    </>
  );
}

export default observer(App);

