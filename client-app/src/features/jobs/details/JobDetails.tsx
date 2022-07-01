import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Grid, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import JobDetailedChat from "./JobDetailedChat";
import JobDetailedHeader from "./JobDetailedHeader";
import JobDetailedInfo from "./JobDetailedInfo";
import JobDetailedSidebar from "./JobDetailedSidebar";



export default observer(function JobDetails(){
    const {jobStore} = useStore();
    const {selectedJob: job, loadJob, loadingInitial} = jobStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
      if(id) loadJob(id);
    }, [id, loadJob]);

    if(loadingInitial || !job) return <LoadingComponent />;

    return(
        <Grid>
            <Grid.Column width={10}>
               <JobDetailedHeader job={job} />
               <JobDetailedInfo job={job} />
               <JobDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
               <JobDetailedSidebar job={job} />
            </Grid.Column>
        </Grid>
    )
})