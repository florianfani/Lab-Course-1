import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';




function App() {
  const [jobs, setJobs] = useState([])

  useEffect(() =>{
    axios.get('http://localhost:5000/api/jobs').then(response =>{
      setJobs(response.data);
    })
  }, [])


  return (
    <div className="App">
     
      <header className="App-header">
        
          <ul>
            {jobs.map((job: any) => (
              <li key={job.id}>
                {job.title}
              </li>
            ))}
          </ul>
        
      </header>
    </div>
  );
}

export default App;
