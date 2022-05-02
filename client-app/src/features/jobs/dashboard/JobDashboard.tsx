import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Job } from "../../../app/models/job";

interface Props{
    jobs: Job[];
}

export default function JobDashboard({jobs}: Props){
    return(
        <Grid>
            <Grid.Column width='10'>
               <List>
                  {jobs.map(job => (
                     <List.Item key={job.id}>
                        {job.title}
                     </List.Item>
                  ))}
               </List>
            </Grid.Column>
        </Grid>
    )
}