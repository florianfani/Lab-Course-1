import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Job } from "../../../app/models/job";


interface Props{
    jobs: Job[]
    selectJob: (id: string) => void;
    deleteJob: (id: string) => void;
    submitting: boolean;
}

export default function JobList({jobs, selectJob, deleteJob, submitting}: Props){
    const [target, setTarget] = useState('');

    function handleJobDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteJob(id);
    }

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
                                <Button
                                    name={job.id}
                                    loading={submitting && target === job.id}
                                    onClick={(e) => handleJobDelete(e, job.id)}
                                    floated='right' 
                                    content='Delete' 
                                    color='red' 
                                />
                                <Label basic content={job.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}