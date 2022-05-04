import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { Job } from "../../../app/models/job";
import JobDetails from "../details/JobDetails";
import JobForm from "../form/JobForm";
import JobList from "./JobList";

interface Props{
    jobs: Job[];
    selectedJob: Job | undefined;
    selectJob: (id: string) => void;
    cancelSelectJob: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (job: Job) => void;
    deleteJob: (id: string) => void;
}

export default function JobDashboard({jobs, selectedJob, selectJob, cancelSelectJob, editMode, openForm, closeForm, createOrEdit, deleteJob}: Props){
    return(
        <Grid>
            <Grid.Column width='10'>
             <JobList jobs={jobs}
                 selectJob={selectJob}
                 deleteJob={deleteJob}
             />
            </Grid.Column>
            <GridColumn width='6'>
                {selectedJob && !editMode &&
                <JobDetails
                     job={selectedJob} 
                     cancelSelectJob={cancelSelectJob}
                     openForm={openForm}
                />}
                {editMode &&
                <JobForm closeForm={closeForm} job={selectedJob} createOrEdit={createOrEdit} />}
            </GridColumn>
        </Grid>
    )
}