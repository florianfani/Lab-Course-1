import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Job } from "../../../app/models/job";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';


export default observer(function JobForm(){
    const history = useHistory();
    const {jobStore} = useStore();
    const {createJob, updateJob, loading, loadJob, loadingInitial} = jobStore;
    const {id} = useParams<{id: string}>();


    const [job, setJob] = useState({
        id: '',
        title: '',
        description: '',
        date: '',
        city: '',
        category: ''
    });

    useEffect(() => {
        if(id) loadJob(id).then(job => setJob(job!))
    }, [id, loadJob]);




    function handleSubmit(){
        if(job.id.length ===0){
            let newJob = {
                ...job,
                id: uuid()
            };
            createJob(newJob).then(() => history.push(`/jobs/${newJob.id}`))
        }
        else {
            updateJob(job).then(() => history.push(`/jobs/${job.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setJob({...job, [name]: value})
    }

    if(loadingInitial) return <LoadingComponent content='Loading job...' />

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={job.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={job.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={job.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={job.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={job.city} name='city' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/jobs' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})