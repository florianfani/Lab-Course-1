
import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { Job } from "../../../app/models/job";
import { useStore } from "../../../app/stores/store";
import JobDetails from "../details/JobDetails";
import JobForm from "../form/JobForm";
import JobList from "./JobList";



export default observer(function JobDashboard(){

    const {jobStore} = useStore();
    const {selectedJob, editMode} = jobStore;
    return(
        <Grid>
            <Grid.Column width='10'>
             <JobList />
            </Grid.Column>
            <GridColumn width='6'>
                {selectedJob && !editMode &&
                <JobDetails />}
                {editMode &&
                <JobForm />}
            </GridColumn>
        </Grid>
    )
})