import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Job } from "../../../app/models/job";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";


export default observer(function JobForm(){
    const history = useHistory();
    const {jobStore} = useStore();
    const {createJob, updateJob, loading, loadJob, loadingInitial} = jobStore;
    const {id} = useParams<{id: string}>();


    const [job, setJob] = useState<Job>({
        id: '',
        title: '',
        description: '',
        date: null,
        city: '',
        category: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The job title is required'),
        description: Yup.string().required('The job description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        city: Yup.string().required()
    })

    useEffect(() => {
        if(id) loadJob(id).then(job => setJob(job!))
    }, [id, loadJob]);




    function handleFormSubmit(job: Job){
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


    if(loadingInitial) return <LoadingComponent content='Loading job...' />

    return(
        <Segment clearing>
            <Header content='Job Details' sub color='teal' />
            <Formik
            validationSchema={validationSchema}
             enableReinitialize
             initialValues={job} 
             onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                        <MyDateInput 
                            placeholderText='Date' 
                            name='date' 
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'

                        />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput placeholder='City' name='city' />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right' 
                            positive type='submit' content='Submit' />
                        <Button as={Link} to='/jobs' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
            
        </Segment>
    )
})