import React, { Component, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';






function App(): JSX.Element {
  const [jobs, setJobs] = useState([])

  useEffect(() =>{
    axios.get('http://localhost:5000/api/jobs').then(response =>{
      setJobs(response.data);
    })
  }, [])


  return (
    <div>
     <Header as='h1' icon='users' content='Klinika'/>
      
    


          <List>
            {jobs.map((job: any) => (
              <List.Item key={job.id}>
                {job.title}
              </List.Item>
            ))}
          </List>
        
      
    </div>
  );
}

export default App;

