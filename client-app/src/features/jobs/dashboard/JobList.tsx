import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Job } from "../../../app/models/job";


interface Props{
    jobs: Job[]
    selectJob: (id: string) => void;
    deleteJob: (id: string) => void;
}

export default function JobList({jobs, selectJob, deleteJob}: Props){
    return(
        <Segment>
            <Item.Group divided>
                {jobs.map(job => (
                    <Item key={job.id}>
                        <Item.Content>
                            <Item.Header as='a'>{job.title}</Item.Header>
                            <Item.Meta>{job.category}</Item.Meta>
                            <Item.Description>
                                <div>{job.description}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectJob(job.id)} floated='right' content='View' color='blue' />
                                <Button onClick={() => deleteJob(job.id)} floated='right' content='Delete' color='red' />
                                <Label basic content={job.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}