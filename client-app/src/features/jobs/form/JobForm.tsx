import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Job } from "../../../app/models/job";
import { useStore } from "../../../app/stores/store";



export default observer(function JobForm(){

    const {jobStore} = useStore();
    const {closeForm, selectedJob, createJob, updateJob, loading} = jobStore;

    const initialState = selectedJob ?? {
        id: '',
        title: '',
        description: '',
        date: '',
        city: '',
        category: ''
    }

    const [job, setJob] = useState(initialState);

    function handleSubmit(){
        job.id ? updateJob(job) : createJob(job);
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
                <Form.Input type='date' placeholder='Date' value={job.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={job.city} name='city' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})