
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Job } from "../../../app/models/job";
import { useStore } from "../../../app/stores/store";
import JobDetails from "../details/JobDetails";
import JobForm from "../form/JobForm";
import JobList from "./JobList";



export default observer(function JobDashboard(){

    const {jobStore} = useStore();
    const {loadJobs, jobRegistry} = jobStore;




    useEffect(() =>{
      if(jobRegistry.size <= 1) loadJobs();
    }, [jobRegistry.size, loadJobs])
  
    
  
  
  
    if (jobStore.loadingInitial) return <LoadingComponent content='Loading app' />
    return(
        <Grid>
            <Grid.Column width='10'>
             <JobList />
            </Grid.Column>
            <GridColumn width='6'>
                <h2>Job Filters</h2>
            </GridColumn>
        </Grid>
    )
})