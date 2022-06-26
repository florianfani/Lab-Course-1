import { observer } from "mobx-react-lite";
import React, { Fragment, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Item, Label, Segment } from "semantic-ui-react";
import { Job } from "../../../app/models/job";
import { useStore } from "../../../app/stores/store";
import JobListItem from "./JobListItem";



export default observer(function JobList(){
    const {jobStore} = useStore();
    const {groupedJobs} = jobStore;


    return(
        <>
            {groupedJobs.map(([group, jobs]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                            {jobs.map(job => (
                                <JobListItem key={job.id} job={job} />
                            ))}
                </Fragment>
            ))}
        </>

    )
})