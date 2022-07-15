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
import LoginForm from '../../features/users/LoginForm';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';








function App(): JSX.Element {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    }
    else{
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if(!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar />
    <ModalContainer />
    <Route exact path='/' component={HomePage} />
    <Route 
      path={'/(.+)'}
      render={() =>(
        <>
        <NavBar />
        <Container style={{marginTop: '7em'}}>
          <Switch>
            <PrivateRoute exact path='/jobs' component={JobDashboard} />
            <PrivateRoute path='/jobs/:id' component={JobDetails} />
            <PrivateRoute key={location.key} path={['/createJob', '/manage/:id']} component={JobForm} />
            <PrivateRoute path='/profiles/:username' component={ProfilePage} />
            <PrivateRoute path='/errors' component={TestErrors} />
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

