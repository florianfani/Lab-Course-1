import { Formik, Form, Field, FieldProps } from 'formik';
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import {Segment, Header, Comment, Button, Loader} from 'semantic-ui-react'
import MyTextArea from '../../../app/common/form/MyTextArea';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup'
import { formatDistanceToNow } from 'date-fns';

interface Props {
    jobId: string;
}

export default observer(function JobDetailedChat({jobId}: Props) {
    const {commentStore} = useStore();

    useEffect(() => {
        if(jobId){
            commentStore.createHubConnection(jobId);
        }
        return () => {
            commentStore.clearComments();
        }
    }, [commentStore, jobId]);

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{border: 'none'}}
            >
                <Header>Chat about this job/therapist</Header>
            </Segment>
            <Segment attached clearing>
            <Formik
                        onSubmit={(values, {resetForm}) => commentStore.addComment(values).then(() => resetForm())}
                        initialValues={{body: ''}}
                        validationSchema={Yup.object({
                            body: Yup.string().required()
                        })}
                    >
                        {({isSubmitting, isValid, handleSubmit}) => (
                            
                            <Form className='ui form'>
                              <Field name='body'>
                                {(props: FieldProps) => (
                                    <div style={{position: 'relative'}}>
                                        <Loader active={isSubmitting} />
                                        <textarea
                                            placeholder='Enter your comment (Enter to submit, SHIFT + enter for new line)'
                                            rows={2}
                                            {...props.field}
                                            onKeyPress={e => {
                                                if (e.key === 'Enter' && e.shiftKey) {
                                                    return;
                                                }
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    isValid && handleSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                              </Field>
                            </Form>
                        )}

                    </Formik>
                <Comment.Group>
                    {commentStore.comments.map(comment => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.image || '/assets/user.png'}/>
                            <Comment.Content>
                                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>{comment.displayName}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{formatDistanceToNow (comment.createdAt)} ago</div>
                                </Comment.Metadata>
                                <Comment.Text style={{whiteSpace: 'pre-wrap'}}>{comment.body}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}

                    

                </Comment.Group>
            </Segment>
        </>

    )
})