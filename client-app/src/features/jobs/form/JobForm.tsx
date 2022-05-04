import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Job } from "../../../app/models/job";

interface Props{
    job: Job | undefined;
    closeForm: () => void;
    createOrEdit: (job: Job) => void;
}

export default function JobForm({job: selectedJob, closeForm, createOrEdit}: Props){

    const initialState = selectedJob ?? {
        id: '',
        title: '',
        description: '',
        category: ''
    }

    const [job, setJob] = useState(initialState);

    function handleSubmit(){
        createOrEdit(job);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setJob({...job, [name]: value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={job.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={job.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={job.category} name='category' onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}